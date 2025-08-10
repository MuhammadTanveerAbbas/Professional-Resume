document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");

  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("show-menu"));
  }

  const navLinks = document.querySelectorAll(".nav__link");
  const navMenu = document.getElementById("nav-menu");

  navLinks.forEach((link) =>
    link.addEventListener("click", () => navMenu?.classList.remove("show-menu"))
  );

  const sections = document.querySelectorAll("section[id]");
  const navMenuLinks = document.querySelectorAll(".nav__menu a");

  const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      const navLink = document.querySelector(
        `.nav__menu a[href*="${sectionId}"]`
      );
      if (!navLink) return;

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active-link");
      } else {
        navLink.classList.remove("active-link");
      }
    });
  };
  window.addEventListener("scroll", scrollActive, { passive: true });

  const scrollTopBtn = document.getElementById("scroll-top");

  const toggleScrollTop = () => {
    if (window.scrollY >= 200) {
      scrollTopBtn?.classList.add("show-scroll");
    } else {
      scrollTopBtn?.classList.remove("show-scroll");
    }
  };
  window.addEventListener("scroll", toggleScrollTop, { passive: true });

  const themeButton = document.getElementById("theme-button");
  const darkThemeClass = "dark-theme";
  const iconThemeClass = "bx-sun";

  const savedTheme = localStorage.getItem("selected-theme");
  const savedIcon = localStorage.getItem("selected-icon");

  const currentTheme = () =>
    document.body.classList.contains(darkThemeClass) ? "dark" : "light";
  const currentIcon = () =>
    themeButton.classList.contains(iconThemeClass) ? "bx-moon" : "bx-sun";

  if (savedTheme) {
    document.body.classList[savedTheme === "dark" ? "add" : "remove"](
      darkThemeClass
    );
    themeButton.classList[savedIcon === "bx-moon" ? "add" : "remove"](
      iconThemeClass
    );
  }

  themeButton?.addEventListener("click", () => {
    document.body.classList.toggle(darkThemeClass);
    themeButton.classList.toggle(iconThemeClass);

    localStorage.setItem("selected-theme", currentTheme());
    localStorage.setItem("selected-icon", currentIcon());
  });

  document.getElementById("download-button").addEventListener("click", () => {
    const cvUrl = "/assets/CV.pdf";

    window.open(cvUrl, "_blank");

    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "CV.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

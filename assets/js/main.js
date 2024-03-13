window.onload = () => {
  const toggleButton = document.querySelector(".mobile-nav-toggle");
  const menu = document.querySelector(".header");
  var is_menu_open = 0;

  toggleButton.addEventListener("click", () => {
    if (is_menu_open) {
      menu.style.transform = "translateX(100%)";
      is_menu_open = 0;
      toggleButton.classList.replace("bi-x", "bi-list");
    } else {
      menu.style.transform = "translateX(0%)";
      is_menu_open = 1;
      toggleButton.classList.replace("bi-list", "bi-x");
    }
  });

  let backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });

  menu.addEventListener("click", () => {
    if (window.innerWidth < 1199) {
      menu.style.transform = "translateX(100%)";
      is_menu_open = 0;
      toggleButton.classList.replace("bi-x", "bi-list");
    }
  });

  gsap.registerPlugin(ScrollTrigger);
  gsap.to("#pageProgress", {
    value: 100,
    ease: "none",
    scrollTrigger: { scrub: 0.3 },
  });

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /*
    Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /*
    Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /*

      Typed animation for intro page
  
  */

  var typed = new Typed("#texttype", {
    strings: [
      "<i>Professor</i>",
      "<i>Body Builder</i>",
      "<i>Motivational speaker</i>",
      "<i>Defense reseacher</i>",
    ],
    loop: true,
    backDelay: 900,
    startDelay: 2000,
    typeSpeed: 100,
    fadeOut: true,
    fadeOutClass: "typed-fade-out",
    fadeOutDelay: 500,
  });

  /*
   Navbar links active state on scroll
*/

  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /*
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /*
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }
  AOS.init();
  new PureCounter();
};

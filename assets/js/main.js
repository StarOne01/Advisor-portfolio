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

  menu.addEventListener("click", () => {
    if (window.innerWidth < 1199) {
      menu.style.transform = "translateX(100%)";
      is_menu_open = 0;
      toggleButton.classList.replace("bi-x", "bi-list");
    }
  });

  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestanimationframe ||
    window.msRequestAnimationFrame ||
    function (f) {
      return setTimeout(f, 1000 / 60);
    }; // simulate calling code 60

  window.cancelAnimationFrame =
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (requestID) {
      clearTimeout(requestID);
    }; //fall back
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
   * Back to top button
   */

  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

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
  /*
  
   * Porfolio isotope and filter
  */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /*
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });
  /*
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /*
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /*
   * Initiate Pure Counter
   */
  new PureCounter();
};

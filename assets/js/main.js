/*

scroll progress bar code

*/

/*

Typed t



gsap.defaults({ease: "none"});
const tl = gsap.timeline({repeat:1, repeatDelay:1, yoyo:true,repeatRefresh:true});
let datatype = ["Engineer", "Body builder", "Professor","Enterpuenur"];
i=0;
tl.to("#texttype", {duration: 2, text: datatype[i],onComplete: tweenComplete});

function tweenComplete() {
  ++i;
  i = i%4;
  
tl.to("#texttype", {duration: 2, text: datatype[i],onComplete: tweenComplete});
}

*/
window.onload = () => {

    const toggleButton = document.querySelector(".mobile-nav-toggle");
    const menu = document.querySelector(".header");
    var is_menu_open = 0;




    toggleButton.addEventListener("click", () => {
	// Toggle the menu by changing the translateX value
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
	menu.style.transform = "translateX(100%)";
	is_menu_open = 0;
	toggleButton.classList.replace("bi-x", "bi-list");
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
        scrollTrigger: { scrub: 0.3 }
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
  let tl = gsap.timeline({
  // yes, we can add it to an entire timeline!
  scrollTrigger: {
    trigger: "#about",
    pin: true, // pin the trigger element while active
    start: "top top", // when the top of the trigger hits the top of the viewport
    end: "top bottom", // end after scrolling 500px beyond the start
    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    snap: {
      snapTo: "labels", // snap to the closest label in the timeline
      duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
      delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
      ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
    },
  },
});

ScrollTrigger.create({
  trigger: "#about",
  start: "top top",
  endTrigger: "#",
  end: "top bottom",
  onToggle: (self) => {
    var typed1 = new Typed('#aboutHeading',
    {
      strings:['About'],
    typeSpeed:1000,
  });
  },
  onUpdate: (self) => {
    console.log(
      "progress:",
      self.progress.toFixed(3),
      "direction:",
      self.direction,
      "velocity",
      self.getVelocity()
    );
  },
});
*/
    /*
    Easy event listener function
   */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    }; /*
 let is_menu_open = 0;
  on('click', '.mobile-nav-toggle', function(){
    if(!is_menu_open) {
      
    const menu = document.getElementById("menu");
    menu.style.display = "flex";
    
    is_menu_open = 1;
    }
    else {
    document.getElementById("menu").style.display = "none";
    is_menu_open = 0;
    }
  });
*/
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
            "<i>Defense reseacher</i>"
        ],
        loop: true,
        backDelay: 900,
        startDelay: 2000,
        typeSpeed: 100,
        fadeOut: true,
        fadeOutClass: "typed-fade-out",
        fadeOutDelay: 500
    });

    /*
ScrollTrigger.create({
  trigger: "#about",
  start: "top top",
  endTrigger: "#skill",
  end: "bottom 50%+=100px",
  onToggle: (self) => console.log("toggled, isActive:", self.isActive),
  onUpdate: (self) => {
    console.log(
      "progress:",
      self.progress.toFixed(3),
      "direction:",
      self.direction,
      "velocity",
      self.getVelocity()
    );
  },
});

const aboutype = () => {

}*/

    /*
   Navbar links active state on scroll
*/
   
   let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {         let position = window.scrollY
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }

    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /*
     * Scrolls to an element with header offset
     */
    const scrollto = el => {
        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos,
            behavior: "smooth"
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
   * Mobile nav toggle
   
   
    on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
  
    
  })*/

    /*
   * Scrool with ofset on links with a class name .scrollto
   
    on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()
     let body = select('body');
     if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)*/
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
                progress.forEach(el => {
                    el.style.width = el.getAttribute("aria-valuenow") + "%";
                });
            }
        });
    }
    /*
  
   * Porfolio isotope and filter
  */
    window.addEventListener("load", () => {
        let portfolioContainer = select(".portfolio-container");
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item"
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
                        filter: this.getAttribute("data-filter")
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
        selector: ".portfolio-lightbox"
    });
    /*
     * Portfolio details slider
     */
    new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
        }
    });

    /*
     * Testimonials slider
     */
    new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    /*
     * Initiate Pure Counter
     */
    new PureCounter();
};

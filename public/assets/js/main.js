"use strict";

/*--
    Preloader
-----------------------------------*/
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Fallback: hide preloader after delay if load event doesn't fire
setTimeout(function() {
    const preloader = document.getElementById('preloader');
    if (preloader && preloader.style.display !== 'none') {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
}, 2000);

/*--
    Header Sticky
-----------------------------------*/
window.addEventListener('scroll', function () {
    const header = document.getElementById("header");
    if (header) {
        if (window.pageYOffset > 50 || window.scrollY > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }
});

/*--
    Menu parent Element Icon
-----------------------------------*/
const subMenus = document.querySelectorAll('.sub-menu');
subMenus.forEach(function (subMenu) {
    // Check if menu-icon already exists
    const existingIcon = subMenu.parentElement.querySelector('.menu-icon');
    if (!existingIcon) {
        const menuExpand = document.createElement('span');
        menuExpand.classList.add('menu-icon');
        subMenu.parentElement.insertBefore(menuExpand, subMenu);
    }
    if (subMenu.classList.contains('mega-menu')) {
        subMenu.classList.remove('mega-menu');
        subMenu.querySelectorAll('ul').forEach(function (ul) {
            ul.classList.add('sub-menu');
            const existingNestedIcon = ul.parentElement.querySelector('.menu-icon');
            if (!existingNestedIcon) {
                const menuExpand = document.createElement('span');
                menuExpand.classList.add('menu-icon');
                menuExpand.innerHTML = '+';
                ul.parentElement.insertBefore(menuExpand, ul);
            }
        });
    }
});

/*--
    Mobile Menu 
-----------------------------------*/

/* Get Sibling */
const getSiblings = function (elem) {
    const siblings = [];
    let sibling = elem.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

/* Slide Up */
const slideUp = (target, time) => {
    const duration = time ? time : 500;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
};

/* Slide Down */
const slideDown = (target, time) => {
    const duration = time ? time : 500;
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    const height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
};

/* Slide Toggle */
const slideToggle = (target, time) => {
    const duration = time ? time : 500;
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
};

/*--
    Offcanvas/Collapseable Menu 
-----------------------------------*/
const offCanvasMenu = function (selector) {
    const offCanvasNav = document.querySelector(selector);
    if (!offCanvasNav) return;
    
    const subMenus = offCanvasNav.querySelectorAll('.sub-menu');
    subMenus.forEach(function (subMenu) {
        const menuExpand = document.createElement('span');
        menuExpand.classList.add('menu-expand');
        subMenu.parentElement.insertBefore(menuExpand, subMenu);
        if (subMenu.classList.contains('mega-menu')) {
            subMenu.classList.remove('mega-menu');
            subMenu.querySelectorAll('ul').forEach(function (ul) {
                ul.classList.add('sub-menu');
                const menuExpand = document.createElement('span');
                menuExpand.classList.add('menu-expand');
                menuExpand.innerHTML = '+';
                ul.parentElement.insertBefore(menuExpand, ul);
            });
        }
    });

    offCanvasNav.querySelectorAll('.menu-expand').forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.parentElement;
            if (parent.classList.contains('active')) {
                parent.classList.remove('active');
                parent.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                    subMenu.parentElement.classList.remove('active');
                    slideUp(subMenu);
                });
            } else {
                parent.classList.add('active');
                slideDown(this.nextElementSibling);
                getSiblings(parent).forEach(function (item) {
                    item.classList.remove('active');
                    item.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                        subMenu.parentElement.classList.remove('active');
                        slideUp(subMenu);
                    });
                });
            }
        });
    });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        offCanvasMenu('.offcanvas-menu');
    });
} else {
    offCanvasMenu('.offcanvas-menu');
}

/*--
    Counter Up (requires jQuery and jquery.counterup)
-----------------------------------*/
if (typeof jQuery !== 'undefined' && typeof jQuery.fn.counterUp !== 'undefined') {
    jQuery('.counter').counterUp({
        delay: 10,
        time: 1500,
    });
}

/*--
    Progress Bar (requires jQuery and appear.js)
-----------------------------------*/
if (typeof jQuery !== 'undefined' && typeof jQuery.fn.appear !== 'undefined') {
    if (jQuery('.progress-line').length) {
        jQuery('.progress-line').appear(function(){
            const el = jQuery(this);
            const percent = el.data('width');
            el.css('width', percent + '%');
        }, {accY: 0});
    }
}

/*--
    Magnific Popup for video (requires jQuery and magnific-popup)
-----------------------------------*/
if (typeof jQuery !== 'undefined' && typeof jQuery.fn.magnificPopup !== 'undefined') {
    jQuery('.popup-video').magnificPopup({
        type: 'iframe'
    });
}

/*--
    AOS Animation
-----------------------------------*/
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1200,
        once: true,
    });
}

/*--
    Testimonial Two Active (Swiper)
-----------------------------------*/
if (typeof Swiper !== 'undefined') {
    const testimonialSwiper = new Swiper(".testimonial-02-active", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".testimonial-02-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          576: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1400: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
    });
}

/*--
    Team Active (Swiper)
-----------------------------------*/
if (typeof Swiper !== 'undefined') {
    const teamSwiper = new Swiper(".team-active", {
        slidesPerView: 4,
        loop: true,
        pagination: {
            el: ".team-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
        },
    });
}

// Initialize all npm packages for client-side use
import jQuery from 'jquery';
import Swiper from 'swiper';
import AOS from 'aos';
import * as bootstrap from 'bootstrap';
import 'magnific-popup/dist/jquery.magnific-popup.js';
import 'waypoints/lib/noframework.waypoints.js';

// Make libraries available globally
(window as any).jQuery = (window as any).$ = jQuery;
(window as any).Swiper = Swiper;
(window as any).AOS = AOS;
(window as any).bootstrap = bootstrap;
// Waypoint is already global after import

// jQuery CounterUp Plugin
(jQuery.fn as any).counterUp = function(options: any) {
  const defaults = {
    time: 400,
    delay: 10,
    offset: 100,
    beginAt: 0,
    formatter: null,
    context: 'window',
    callback: function() {}
  };
  const settings = jQuery.extend({}, defaults, options);
  
  return this.each(function(this: any) {
    const $this = jQuery(this);
    const counter: any = {
      text: $this.text(),
      step: function() {
        $this.text(Math.ceil(counter.count));
        if (counter.count < counter.target) {
          counter.count += counter.increment;
          setTimeout(counter.step.bind(counter), counter.delay);
        } else {
          $this.text(counter.target);
          settings.callback.call(this as any);
        }
      },
      start: function() {
        if (counter.started) return;
        counter.started = true;
        counter.step();
      }
    };
    
    const waypoint = new (window as any).Waypoint({
      element: this,
      handler: function() {
        counter.count = settings.beginAt;
        counter.target = parseInt(counter.text.replace(/[^0-9]/g, ''));
        counter.increment = (counter.target - counter.count) / (settings.time / settings.delay);
        counter.delay = settings.delay;
        counter.start();
        this.destroy();
      },
      offset: settings.offset
    });
  });
};

// jQuery Appear Plugin
(jQuery.fn as any).appear = function(callback: any, options?: any) {
  const defaults = {
    data: undefined,
    one: true,
    accX: 0,
    accY: 0
  };
  const settings = jQuery.extend({}, defaults, options);
  
  return this.each(function(this: any) {
    const $this = jQuery(this);
    let appeared = false;
    
    const checkAppear = function() {
      if (!$this.is(':visible')) {
        appeared = false;
        return;
      }
      
      const windowTop = jQuery(window).scrollTop() || 0;
      const windowLeft = jQuery(window).scrollLeft() || 0;
      const windowBottom = windowTop + (jQuery(window).height() || 0);
      const windowRight = windowLeft + (jQuery(window).width() || 0);
      
      const elementOffset = $this.offset();
      if (!elementOffset) return;
      
      const elementTop = elementOffset.top;
      const elementLeft = elementOffset.left;
      const elementBottom = elementTop + ($this.height() || 0);
      const elementRight = elementLeft + ($this.width() || 0);
      
      if (windowTop <= elementBottom + settings.accY &&
          windowBottom >= elementTop - settings.accY &&
          windowLeft <= elementRight + settings.accX &&
          windowRight >= elementLeft - settings.accX) {
        if (!appeared) {
          appeared = true;
          if (settings.one) {
            jQuery(window).off('scroll resize', checkAppear);
          }
          callback.call(this as any, settings.data);
        }
      } else {
        appeared = false;
      }
    };
    
    jQuery(window).on('scroll resize', checkAppear);
    checkAppear();
  });
};

// Initialize AOS
AOS.init({
  duration: 1200,
  once: true,
});

// Back to Top functionality
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  display: none;
  z-index: 1000;
  font-size: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: opacity 0.3s;
`;
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

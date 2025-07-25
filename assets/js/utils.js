// ============================================================================
// MAIN APPLICATION UTILITIES
// ============================================================================

/**
 * Utility functions for the Tourffee website
 */
class TourffeeUtils {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupLazyLoading();
    this.setupAnimationOnScroll();
    this.setupAccessibility();
    this.setupPerformanceOptimizations();
  }

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Focus the target for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }

  /**
   * Setup lazy loading for images
   */
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('fade-in');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Setup animation on scroll
   */
  setupAnimationOnScroll() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.add('fade-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
      });
    }
  }

  /**
   * Setup accessibility improvements
   */
  setupAccessibility() {
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#main-content');
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    }

    // Improve focus management for modals/dropdowns
    this.setupFocusTrapping();

    // Add ARIA labels where needed
    this.enhanceARIA();
  }

  /**
   * Setup focus trapping for modal elements
   */
  setupFocusTrapping() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.querySelectorAll('[data-modal]').forEach(modal => {
      const focusableContent = modal.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent[0];
      const lastFocusableElement = focusableContent[focusableContent.length - 1];

      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
        
        if (e.key === 'Escape') {
          this.closeModal(modal);
        }
      });
    });
  }

  /**
   * Enhance ARIA attributes
   */
  enhanceARIA() {
    // Add ARIA labels to social links
    document.querySelectorAll('a[href*="instagram"]').forEach(link => {
      if (!link.getAttribute('aria-label')) {
        link.setAttribute('aria-label', 'Visite nosso Instagram');
      }
    });

    // Add ARIA labels to image buttons
    document.querySelectorAll('.image-btn').forEach(btn => {
      const img = btn.querySelector('img');
      const label = btn.querySelector('.image-btn__label, .nomeCafe, .cafeDomes');
      
      if (img && label && !btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', label.textContent.trim());
      }
    });

    // Add live region for dynamic content
    if (!document.querySelector('[aria-live]')) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.id = 'live-region';
      document.body.appendChild(liveRegion);
    }
  }

  /**
   * Setup performance optimizations
   */
  setupPerformanceOptimizations() {
    // Defer non-critical CSS
    this.deferNonCriticalCSS();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup service worker if available
    this.setupServiceWorker();
  }

  /**
   * Defer non-critical CSS loading
   */
  deferNonCriticalCSS() {
    const links = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
    links.forEach(link => {
      link.media = 'print';
      link.onload = function() {
        this.media = 'all';
      };
    });
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources() {
    // Preload hero images
    const heroImages = document.querySelectorAll('.hero img, .featured-cafe img');
    heroImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src || img.dataset.src;
      document.head.appendChild(link);
    });
  }

  /**
   * Setup service worker for offline support
   */
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  /**
   * Utility method to announce messages to screen readers
   */
  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  /**
   * Utility method to handle modal closing
   */
  closeModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    
    // Return focus to trigger element
    const trigger = document.querySelector(`[data-modal-trigger="${modal.id}"]`);
    if (trigger) {
      trigger.focus();
    }
  }

  /**
   * Debounce utility for performance
   */
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  /**
   * Throttle utility for performance
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize utilities when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TourffeeUtils();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TourffeeUtils;
}

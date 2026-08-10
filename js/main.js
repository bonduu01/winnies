/**
 * Winnie's Hair Braiding — Main JavaScript
 * Handles theme toggle, mobile menu, gallery filtering, scroll animations,
 * hero parallax, the pricing lightbox, and the scroll FAB.
 */

document.addEventListener('DOMContentLoaded', () => {
  // === Theme Toggle ===
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('winnies-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('winnies-theme', newTheme);
    });
  }

  // === Mobile Menu Toggle ===
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    const setMenuOpen = isOpen => {
      mobileNav.classList.toggle('open', isOpen);
      // Keep the hidden attribute in sync so an open nav is not semantically hidden
      if (isOpen) {
        mobileNav.removeAttribute('hidden');
      } else {
        mobileNav.setAttribute('hidden', '');
      }
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    };

    menuToggle.addEventListener('click', () => {
      setMenuOpen(!mobileNav.classList.contains('open'));
    });

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  // === Header Shadow on Scroll ===
  const header = document.querySelector('.site-header');

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // === Gallery Filtering ===
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active button (visual class + pressed state)
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      // A direct filter click clears any hero chip selection
      document.querySelectorAll('.hero-chip').forEach(chip => {
        chip.classList.remove('active');
        chip.setAttribute('aria-pressed', 'false');
      });

      // Filter cards
      galleryCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // === Scroll Animations (Fade In) ===
  const animatedElements = document.querySelectorAll(
    '.section-header, .gallery-card, .service-card, .about-text, .about-images, .contact-card, .location-card, .policy-figure, .pricing-figure'
  );

  const revealElements = () => {
    animatedElements.forEach((el, index) => {
      el.classList.add('fade-in');
      // Staggered reveal with a small delay for visual effect
      setTimeout(() => {
        el.classList.add('fade-in-visible');
      }, index * 60);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });

    // Fallback: ensure content is visible even if observer fails (e.g., headless browsers)
    setTimeout(() => {
      animatedElements.forEach(el => {
        if (!el.classList.contains('fade-in-visible')) {
          el.classList.add('fade-in-visible');
        }
      });
    }, 2500);
  } else {
    // Fallback for older browsers
    revealElements();
  }

  // === Interactive Hero Widget ===
  const hero = document.querySelector('.hero--interactive');

  if (hero) {
    // Trigger entrance animations once the hero is painted
    requestAnimationFrame(() => {
      hero.classList.add('hero--animated');
    });

    // Quick-style chips sync with the gallery filter
    const heroChips = hero.querySelectorAll('.hero-chip');

    heroChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        const galleryButton = document.querySelector(`.filter-btn[data-filter="${filter}"]`);

        heroChips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');

        if (galleryButton) {
          galleryButton.click();
          document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Subtle scroll parallax on the hero scene (transform-only, GPU-friendly).
    // Disabled for reduced-motion users and paused when the hero is off-screen.
    const heroScene = hero.querySelector('.hero-scene');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (heroScene && !reduceMotion.matches) {
      let heroVisible = true;
      let ticking = false;

      if ('IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver(entries => {
          heroVisible = entries[0].isIntersecting;
        });
        heroObserver.observe(hero);
      }

      const updateParallax = () => {
        ticking = false;
        if (heroVisible) {
          heroScene.style.transform = `translate3d(0, ${window.scrollY * 0.2}px, 0)`;
        }
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateParallax);
        }
      }, { passive: true });
    }
  }

  // === Pricing Lightbox ===
  const pricingTrigger = document.querySelector('.pricing-zoom-trigger');
  const lightbox = document.getElementById('pricing-lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxImage = document.getElementById('lightbox-image');

  if (pricingTrigger && lightbox && typeof lightbox.showModal === 'function') {
    const lightboxStage = lightbox.querySelector('.lightbox-stage');

    pricingTrigger.addEventListener('click', () => {
      lightbox.showModal();
      if (lightboxClose) {
        lightboxClose.focus();
      }
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => lightbox.close());
    }

    // Click on the backdrop (the dialog element itself) closes the viewer
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) {
        lightbox.close();
      }
    });

    // Reset zoom and return focus whenever the dialog closes (button, Esc, backdrop)
    lightbox.addEventListener('close', () => {
      lightbox.classList.remove('is-zoomed');
      pricingTrigger.focus();
    });

    // Click the image to zoom in/out; zooming centers on the click point
    if (lightboxImage && lightboxStage) {
      lightboxImage.addEventListener('click', event => {
        const zooming = !lightbox.classList.contains('is-zoomed');
        lightbox.classList.toggle('is-zoomed', zooming);

        if (zooming) {
          const rect = lightboxImage.getBoundingClientRect();
          const ratioX = (event.clientX - rect.left) / rect.width;
          const ratioY = (event.clientY - rect.top) / rect.height;

          requestAnimationFrame(() => {
            lightboxStage.scrollLeft = ratioX * lightboxStage.scrollWidth - lightboxStage.clientWidth / 2;
            lightboxStage.scrollTop = ratioY * lightboxStage.scrollHeight - lightboxStage.clientHeight / 2;
          });
        }
      });
    }
  }

  // === Scroll Floating Action Button ===
  const scrollFab = document.getElementById('scroll-fab');

  if (scrollFab) {
    scrollFab.removeAttribute('hidden');

    const updateScrollFab = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const threshold = 100;
      const nearBottom = maxScroll > 0 && scrollTop >= maxScroll - threshold;

      if (scrollTop > threshold) {
        scrollFab.classList.add('is-visible', 'is-scrolled');
        scrollFab.setAttribute('aria-label', 'Scroll to top');
      } else {
        scrollFab.classList.add('is-visible');
        scrollFab.classList.remove('is-scrolled');
        scrollFab.setAttribute('aria-label', nearBottom ? 'Scroll to top' : 'Scroll to bottom');
      }
    };

    scrollFab.addEventListener('click', () => {
      if (scrollFab.classList.contains('is-scrolled')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }
    });

    window.addEventListener('scroll', updateScrollFab, { passive: true });
    updateScrollFab();
  }
});

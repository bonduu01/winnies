/**
 * Winnie's Hair Braiding — Main JavaScript
 * Handles mobile menu, gallery filtering, header shadow, and scroll animations.
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
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
      });
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

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

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
    '.section-header, .gallery-card, .service-card, .about-text, .about-images, .contact-card, .location-card'
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

        heroChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        if (galleryButton) {
          galleryButton.click();
          document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
});

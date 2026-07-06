/**
 * Winnie's Hair Braiding — Main JavaScript
 * Handles mobile menu, gallery filtering, header shadow, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // === Mobile Menu Toggle ===
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

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

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(el => el.classList.add('fade-in-visible'));
  }
});

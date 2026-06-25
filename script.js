// Scroll-based fade-in animations
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
})();

// Sticky bottom CTA visibility (mobile only)
(function () {
  const stickyCta = document.getElementById('stickyCta');
  if (!stickyCta) return;

  const heroSection = document.querySelector('.hero');
  const ctaFinal = document.querySelector('.cta-final');

  function checkStickyVisibility() {
    if (window.innerWidth >= 768) return;

    const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 0;
    const ctaFinalTop = ctaFinal ? ctaFinal.getBoundingClientRect().top : window.innerHeight;

    if (heroBottom < 0 && ctaFinalTop > window.innerHeight) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(checkStickyVisibility);
  }, { passive: true });

  window.addEventListener('resize', checkStickyVisibility);
  checkStickyVisibility();
})();

// FAQ accordion
(function () {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach((activeItem) => {
        activeItem.classList.remove('active');
        activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

// Smooth scroll for anchor links
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || !href) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

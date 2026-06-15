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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
})();

// Sticky bottom CTA visibility (mobile only)
(function () {
  const stickyCta = document.getElementById('stickyCta');
  if (!stickyCta) return;

  let lastScroll = 0;
  const heroSection = document.querySelector('.hero');

  function checkStickyVisibility() {
    const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 0;
    const ctaFinal = document.querySelector('.cta-final');
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

  checkStickyVisibility();
})();

// FAQ accordion
(function () {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.faq-item.active').forEach((activeItem) => {
        activeItem.classList.remove('active');
        activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
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
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// CTA button ripple effect
(function () {
  document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        width: 0;
        height: 0;
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
})();

// Number counter animation for stats
(function () {
  const stats = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const target = parseInt(match[0], 10);
        const suffix = text.replace(match[0], '');
        const duration = 1200;
        const start = performance.now();

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          el.textContent = current + suffix;

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((s) => observer.observe(s));
})();

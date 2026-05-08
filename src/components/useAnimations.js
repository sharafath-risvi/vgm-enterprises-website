import { useEffect } from 'react';

/**
 * Scroll-reveal hook using IntersectionObserver.
 * Call once at the top of any page component.
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
}

/**
 * Parallax scroll hook – applies translateY to elements with data-parallax attribute.
 */
export function useParallax() {
  useEffect(() => {
    const onScroll = () => {
      const items = document.querySelectorAll('[data-parallax]');
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

/**
 * 3D tilt effect on mouse move for elements with class "tilt-card"
 */
export function useTiltCards() {
  useEffect(() => {
    const cards = document.querySelectorAll('.tilt-card');
    const handlers = [];

    cards.forEach((card) => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = ((y - cy) / cy) * -8;
        const ry = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      };
      const onLeave = () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}

/**
 * Counter animation hook for stat numbers
 */
export function useCounters() {
  useEffect(() => {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const end = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const step = 16;
          const increment = end / (duration / step);
          let current = 0;
          const isFloat = String(end).includes('.');
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              current = end;
              clearInterval(timer);
            }
            el.textContent = isFloat ? current.toFixed(1) + suffix : Math.floor(current) + suffix;
          }, step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
}

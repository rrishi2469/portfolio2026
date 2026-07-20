/* ==========================================================================
   RISHI PATEL — PORTFOLIO
   Vanilla JS only: nav state, scroll reveals, case-study accordions.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Glass nav: solidify on scroll ---------------- */
  const navWrap = document.querySelector('.nav-wrap');
  const onScroll = () => {
    navWrap.classList.toggle('scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- Active link highlighting ---------------- */
  const navAnchors = document.querySelectorAll('[data-nav]');
  const sections = Array.from(navAnchors)
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navAnchors.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------------- Reveal-on-scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------- Case-study accordions ---------------- */
  document.querySelectorAll('[data-toggle]').forEach((btn) => {
    const wrapper = document.getElementById(btn.getAttribute('aria-controls'));
    const label = btn.querySelector('.case-toggle-label');

    btn.addEventListener('click', () => {
      const willOpen = !wrapper.classList.contains('open');

      wrapper.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
      label.textContent = willOpen ? 'Close Case Study' : 'View Case Study';

      if (willOpen) {
        // Let the grid-rows transition run, then bring the card into view.
        setTimeout(() => {
          btn.closest('.project-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
    });
  });

});

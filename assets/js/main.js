/**
 * Author: Prateek Gupta
 * Updated: Nov 2025
 * Purpose: main site JS — mobile nav, sliders, lightbox, contact form handler
 */

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /* -------------------------
     Helpers
  ------------------------- */
  const qs = (sel) => document.querySelector(sel);
  const qsa = (sel) => Array.from(document.querySelectorAll(sel));

  /* -------------------------
     Preloader
  ------------------------- */
  const preloader = qs('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('loaded'), 1000);
      setTimeout(() => preloader.remove(), 2000);
    });
  }

  /* -------------------------
     Mobile nav toggle (customized for .main-nav)
  ------------------------- */
  const mobileNavShow = qs('.mobile-nav-show');
  const mobileNavHide = qs('.mobile-nav-hide');
  const mainNav = qs('.main-nav');

  const toggleMobileNav = () => {
    if (!mainNav) return;
    mainNav.classList.toggle('active'); // CSS-controlled sidebar
    mobileNavShow?.classList.toggle('d-none');
    mobileNavHide?.classList.toggle('d-none');

    // prevent background scroll when open
    document.documentElement.style.overflow =
      mainNav.classList.contains('active') ? 'hidden' : '';
  };

  qsa('.mobile-nav-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileNav();
    });
  });

  // Close nav on same-page link click
  qsa('#main-nav a').forEach(link => {
    if (!link.hash) return;
    const section = document.querySelector(link.hash);
    if (!section) return;
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) toggleMobileNav();
    });
  });

  // Dropdown handling inside mobile nav
  qsa('.main-nav .dropdown > a').forEach(el => {
    el.addEventListener('click', function (event) {
      if (mainNav.classList.contains('active')) {
        event.preventDefault();
        this.classList.toggle('active');
        const sibling = this.nextElementSibling;
        if (sibling) sibling.classList.toggle('dropdown-active');
        const indicator = this.querySelector('.dropdown-indicator');
        if (indicator) {
          indicator.classList.toggle('bi-chevron-up');
          indicator.classList.toggle('bi-chevron-down');
        }
      }
    });
  });

  /* -------------------------
     Scroll top button
  ------------------------- */
  const scrollTop = qs('.scroll-top');
  if (scrollTop) {
    const toggleScrollTop = () => {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------
     Glightbox init
  ------------------------- */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  /* -------------------------
     Swiper inits (slides-1 and slides-3)
  ------------------------- */
  if (typeof Swiper !== 'undefined') {
    try {
      new Swiper('.slides-1', {
        speed: 600,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        slidesPerView: 'auto',
        pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
      });
    } catch (e) { /* ignore */ }

    try {
      new Swiper('.slides-3', {
        speed: 600,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        slidesPerView: 'auto',
        pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 320: { slidesPerView: 1, spaceBetween: 40 }, 1200: { slidesPerView: 3 } }
      });
    } catch (e) { /* ignore */ }
  }

  /* -------------------------
     AOS init
  ------------------------- */
  const aos_init = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
    }
  };
  window.addEventListener('load', aos_init);

  /* -------------------------
     Contact form: Formspree AJAX submit + fallback
  ------------------------- */
  const contactForm = qs('.php-email-form') || qs('#contact-form');

  if (contactForm) {
    const formAction = contactForm.getAttribute('action') || '';
    const isFormspree = formAction.includes('formspree.io') || formAction.includes('formsubmit.co');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loading = contactForm.querySelector('.loading');
      const errorEl = contactForm.querySelector('.error-message');
      const sentEl = contactForm.querySelector('.sent-message');
      if (loading) loading.style.display = 'block';
      if (errorEl) { errorEl.style.display = 'none'; errorEl.innerHTML = ''; }
      if (sentEl) sentEl.style.display = 'none';
      const formData = new FormData(contactForm);
      const endpoint = isFormspree ? formAction : 'https://formspree.io/f/YOUR_FORMSPREE_ID';
      fetch(endpoint, { method: 'POST', body: formData, headers: (!isFormspree) ? { 'Accept': 'application/json' } : {} })
      .then(async (response) => {
        if (loading) loading.style.display = 'none';
        if (response.ok) {
          if (sentEl) { sentEl.style.display = 'block'; }
          contactForm.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          let msg = 'Form submission failed. Please try again later.';
          if (data && data.error) msg = data.error;
          if (errorEl) { errorEl.style.display = 'block'; errorEl.innerHTML = msg; }
        }
      })
      .catch((err) => {
        if (loading) loading.style.display = 'none';
        if (errorEl) { errorEl.style.display = 'block'; errorEl.innerHTML = 'Could not send message right now.'; }
      });
    });
  }

});

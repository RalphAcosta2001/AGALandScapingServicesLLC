// In-page links (navbar Services / Contact Us, service cards): scroll to
// the section on the home page.
document.addEventListener('DOMContentLoaded', function () {
  const offcanvasEl = document.getElementById('offcanvasMenu');
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);

  function scrollToSection(target) {
    // Measure the untransformed layout position: the scroll-reveal animation
    // shifts sections that are off screen, which would throw off a plain
    // anchor jump. Leave room for the fixed navbar via scroll-margin-top.
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    let top = 0;
    for (let el = target; el; el = el.offsetParent) top += el.offsetTop;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: top - margin, behavior: smooth ? 'smooth' : 'auto' });
  }

  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      history.replaceState(null, '', link.getAttribute('href'));
      // The mobile menu locks page scrolling while open, so close it first
      if (offcanvasEl.classList.contains('show')) {
        offcanvasEl.addEventListener('hidden.bs.offcanvas', () => scrollToSection(target), { once: true });
        offcanvas.hide();
      } else {
        scrollToSection(target);
      }
    });
  });
});

// Scroll reveal: every section (except the top banner) animates in each
// time it scrolls into view, whether scrolling down or back up, and resets
// once it is fully off screen so the effect plays again next time.
// Runs before the first paint (this script is at the end of <body>), so
// sections already on screen at load simply start visible, with no flicker.
(function () {
  if (!('IntersectionObserver' in window)) return;
  const sections = document.querySelectorAll('section:not(.hero-section)');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (!entry.isIntersecting) {
        // Fully off screen: reset, and remember which side it left from so
        // it enters from that same side (from above when scrolling up)
        el.classList.remove('is-visible');
        el.classList.toggle('from-above', entry.boundingClientRect.top < 0);
        return;
      }
      // Hidden carousel slides only download once shown; fetch them as soon
      // as the carousel starts entering so slide changes never show a blank
      el.querySelectorAll('.carousel-item img[loading="lazy"]').forEach(img => {
        img.loading = 'eager';
      });
      if (entry.intersectionRatio >= 0.1) el.classList.add('is-visible');
    });
  }, { threshold: [0, 0.1] });

  sections.forEach(el => {
    el.classList.add('reveal');
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) el.classList.add('is-visible');
    observer.observe(el);
  });

  // Stagger order for the service cards' entrance
  document.querySelectorAll('.service-tile').forEach((tile, i) => {
    tile.style.setProperty('--i', i);
  });
})();


// Parallax on the home page's mountain photo. The photo starts in place, so
// its top is fully visible at the top of the page. Once the photo reaches
// the bottom of the fixed navbar, it drifts down at a fraction of the scroll
// speed, so it appears to move slower than the page. The strip this opens
// at the photo's top edge always stays hidden behind the navbar.
(function () {
  const hero = document.querySelector('.hero-section');
  const bg = hero && hero.querySelector('.hero-bg');
  if (!bg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const SPEED = 0.6; // 0 = scrolls with the page, 1 = stays fixed in place
  const navbar = document.querySelector('.navbar-custom');
  let ticking = false;

  function update() {
    ticking = false;
    const box = hero.getBoundingClientRect();
    if (box.bottom < 0) return; // off screen, nothing to move
    const navBottom = navbar ? navbar.getBoundingClientRect().bottom : 0;
    const scrolledPast = Math.max(0, navBottom - box.top);
    bg.style.transform = `translate3d(0, ${scrolledPast * SPEED}px, 0)`;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();


// Clicking the logo or business name in the navbar scrolls back to the top
// of the current page (without adding "#" to the address bar).
document.querySelectorAll('.navbar-brand').forEach(brand => {
  brand.addEventListener('click', e => {
    e.preventDefault();
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  });
});

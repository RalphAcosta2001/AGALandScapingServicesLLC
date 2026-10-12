document.addEventListener('DOMContentLoaded', function () {
    const offcanvasEl = document.getElementById('offcanvasMenu');
    const offcanvas = new bootstrap.Offcanvas(offcanvasEl);
    
    offcanvasEl.querySelectorAll('a.nav-link, a.dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        offcanvas.hide();
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

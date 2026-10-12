document.addEventListener('DOMContentLoaded', function () {
    const offcanvasEl = document.getElementById('offcanvasMenu');
    const offcanvas = new bootstrap.Offcanvas(offcanvasEl);
    
    offcanvasEl.querySelectorAll('a.nav-link, a.dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        offcanvas.hide();
      });
    });
  });

// Lazy-load page sections: anything below the screen starts hidden and
// fades in as it scrolls into view. Runs before the first paint (this
// script is at the end of <body>), so on-screen content never flickers.
(function () {
  const sections = [...document.querySelectorAll('section:not(.hero-section)')]
    .filter(el => el.getBoundingClientRect().top > window.innerHeight);
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      // Hidden carousel slides only download once shown; fetch them now so
      // the first slide change doesn't show a blank frame
      entry.target.querySelectorAll('.carousel-item img[loading="lazy"]').forEach(img => {
        img.loading = 'eager';
      });
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px 200px 0px' });

  sections.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();

document.addEventListener('DOMContentLoaded', function () {
    const offcanvasEl = document.getElementById('offcanvasMenu');
    const offcanvas = new bootstrap.Offcanvas(offcanvasEl);
    
    offcanvasEl.querySelectorAll('a.nav-link, a.dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        offcanvas.hide();
      });
    });
  });
// Full-screen photo viewer for the carousels.
// Adds a "Full screen" button to every carousel; clicking it (or a photo)
// opens the current photo filling the screen, with arrows to step through
// the rest of that carousel's photos.
// Load after Bootstrap and before i18n.js so the new labels get translated.
(function () {
  const carousels = document.querySelectorAll('.carousel');
  if (!carousels.length) return;

  const modalEl = document.createElement('div');
  modalEl.className = 'modal fade photo-viewer';
  modalEl.tabIndex = -1;
  modalEl.setAttribute('aria-label', 'Photo viewer');
  modalEl.innerHTML = `
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <img class="viewer-img" alt="">
        <button type="button" class="viewer-close btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        <button type="button" class="viewer-nav viewer-prev" aria-label="Previous">&#8249;</button>
        <button type="button" class="viewer-nav viewer-next" aria-label="Next">&#8250;</button>
        <div class="viewer-count"></div>
      </div>
    </div>`;
  document.body.appendChild(modalEl);

  const modal = new bootstrap.Modal(modalEl);
  const img = modalEl.querySelector('.viewer-img');
  const count = modalEl.querySelector('.viewer-count');
  const navButtons = modalEl.querySelectorAll('.viewer-nav');
  let photos = [];
  let index = 0;
  let source = null;

  function show(i) {
    index = (i + photos.length) % photos.length;
    img.src = photos[index].currentSrc || photos[index].src;
    img.alt = photos[index].alt;
    count.textContent = `${index + 1} / ${photos.length}`;
  }

  function open(carousel) {
    source = carousel;
    const items = [...carousel.querySelectorAll('.carousel-item')];
    photos = items.map(item => item.querySelector('img'));
    navButtons.forEach(b => { b.hidden = photos.length < 2; });
    count.hidden = photos.length < 2;
    show(Math.max(0, items.findIndex(item => item.classList.contains('active'))));
    modal.show();
  }

  modalEl.querySelector('.viewer-prev').addEventListener('click', () => show(index - 1));
  modalEl.querySelector('.viewer-next').addEventListener('click', () => show(index + 1));
  modalEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  // When closed, leave the carousel on the photo the visitor was looking at
  modalEl.addEventListener('hidden.bs.modal', () => {
    if (source) bootstrap.Carousel.getOrCreateInstance(source).to(index);
  });

  carousels.forEach(carousel => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'expand-btn';
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4"/>
      </svg>
      <span>Full screen</span>`;
    btn.addEventListener('click', () => open(carousel));
    carousel.querySelector('.carousel-inner').appendChild(btn);

    carousel.querySelectorAll('.carousel-item img').forEach(photo => {
      photo.addEventListener('click', () => open(carousel));
    });
  });
})();

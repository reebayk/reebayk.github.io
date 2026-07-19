document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('nav.links');
  if(toggle && links){
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // ---------- photo pile lightbox ----------
  const pile = document.getElementById('photoPile');
  if (pile) {
    const items = Array.from(pile.querySelectorAll('.pile-item img'));
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    let current = 0;

    function openLightbox(index) {
      current = index;
      lbImg.src = items[current].src;
      lbImg.alt = items[current].alt || '';
      lightbox.classList.add('open');
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
    }

    function showNext() {
      current = (current + 1) % items.length;
      lbImg.src = items[current].src;
    }

    function showPrev() {
      current = (current - 1 + items.length) % items.length;
      lbImg.src = items[current].src;
    }

    items.forEach((img, i) => {
      img.closest('.pile-item').addEventListener('click', () => openLightbox(i));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbNext.addEventListener('click', showNext);
    lbPrev.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'ArrowRight') showNext();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'Escape') closeLightbox();
    });
  }
});

/* DoRechi: desktop photo grid like Reima (8 Oct 2026). Desktop only; mobile keeps the carousel. CSS moved to the CSS editor 23 Oct 2026. */
(function () {
  if (!document.querySelector('.gallery__photos-container') || !document.querySelector('.gallery__thumbnails')) return;
  document.documentElement.classList.add('dr-grid'); /* grid CSS: Settings > Utilities > CSS editor (Desktop) */

  function stick() {
    var col = document.querySelector('.product__column--left');
    if (!col) return;
    col.style.top = Math.min(20, window.innerHeight - col.offsetHeight - 20) + 'px';
  }
  stick();
  window.addEventListener('resize', stick);
  window.addEventListener('load', stick);
  setTimeout(stick, 1500);
  setTimeout(stick, 4000);
  setTimeout(function () { window.dispatchEvent(new Event('scroll')); }, 800);
  setTimeout(function () { window.dispatchEvent(new Event('scroll')); }, 2500);
})();

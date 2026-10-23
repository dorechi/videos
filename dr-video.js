/* DoRechi: product video gallery v7 code (moved from Horoshop Scripts 23 Oct 2026). The VIDEOS list and OPEN_ON_VIDEO stay in the Horoshop Scripts field as window.DR_VIDEO. */
(function () {
  var DRV = window.DR_VIDEO || {};
  var OPEN_ON_VIDEO = !!DRV.OPEN_ON_VIDEO;
  var VIDEOS = DRV.VIDEOS || {};


  function pageVideo() {
    var el = document.querySelector('.product-header__code') ||
      [].filter.call(document.querySelectorAll('.product-meta__item'), function (e) { return /Артикул|Article|SKU/i.test(e.textContent); })[0];
    var m = el && el.textContent.match(/:\s*([^\s]+)/);
    if (!m) return null;
    var art = m[1].trim();
    var full = el.textContent.split(':').slice(1).join(':').replace(/\s+/g, ' ').trim();
    return VIDEOS[full] || VIDEOS[art] || VIDEOS[art.split('/')[0]] || null;
  }

  function isVisible(el) {
    var r = el.getBoundingClientRect();
    if (!r.width || !r.height || r.bottom <= 0 || r.top >= window.innerHeight) return false;
    if (Math.min(r.right, window.innerWidth) - Math.max(r.left, 0) < r.width / 2) return false;
    for (var p = el, i = 0; p && i < 6; p = p.parentElement, i++) {
      if (parseFloat(getComputedStyle(p).opacity) < 0.5) return false;
    }
    return true;
  }

  function ensureSrc(el) {
    if (el.getAttribute('src')) return;
    if (el.dataset.poster) el.poster = el.dataset.poster;
    el.preload = 'auto';
    el.src = el.dataset.src;
  }
  function tryPlay(el) {
    ensureSrc(el);
    var p = el.play();
    if (p && p.catch) p.catch(function () { if (isVisible(el)) el.controls = true; });
  }
  function playVisible() {
    document.querySelectorAll('.dr-video').forEach(function (el) {
      if (el.paused && isVisible(el)) tryPlay(el);
    });
  }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { if (isVisible(e.target)) tryPlay(e.target); } else e.target.pause();
    });
  }) : null;

  function makeVideo(v) {
    var el = document.createElement('video');
    el.className = 'dr-video';
    el.muted = true; el.defaultMuted = true; el.loop = true; el.playsInline = true; el.autoplay = true;
    el.setAttribute('muted', ''); el.setAttribute('playsinline', ''); el.setAttribute('loop', ''); el.setAttribute('autoplay', '');
    el.preload = 'none';
    el.dataset.src = v.mp4;
    if (v.poster) { el.dataset.poster = v.poster; el.poster = v.poster; } // poster shows at once, the video file still loads only when visible
    el.addEventListener('click', function () { if (el.paused) tryPlay(el); });
    if (io) io.observe(el);
    return el;
  }

  function kick() { playVisible(); setTimeout(playVisible, 450); setTimeout(playVisible, 900); }
  document.addEventListener('click', kick);
  document.addEventListener('touchend', kick, { passive: true });
  window.addEventListener('scroll', function () { clearTimeout(window.__drT); window.__drT = setTimeout(playVisible, 200); }, { passive: true });

  var V = null, opened = false;

  function swapFrames(root) {
    root.querySelectorAll('iframe').forEach(function (f) {
      if (!/youtube|youtu\.be/.test(f.getAttribute('src') || f.getAttribute('data-src') || '')) return;
      var mob = f.closest('.gallery__item--video');
      if (mob && mob.querySelector('.dr-video')) { f.style.display = 'none'; return; }
      var li = f.closest('li.gallery__item');
      if (li) li.classList.add('dr-has-video');
      f.replaceWith(makeVideo(V));
    });
  }

  function fixThumbs() {
    document.querySelectorAll('a.gallery__thumb-link.is-video:not(.dr-thumb)').forEach(function (a) {
      var img = a.querySelector('img');
      if (img && V.thumb) { img.src = V.thumb; img.removeAttribute('srcset'); }
      a.classList.add('dr-thumb');
      if (OPEN_ON_VIDEO && !opened) { opened = true; setTimeout(function () { a.click(); }, 300); }
    });
  }

  function fixMobile() {
    var items = document.querySelectorAll('.gallery__item--video:not(.dr-has-video)');
    items.forEach(function (it) {
      it.classList.add('dr-has-video');
      it.insertBefore(makeVideo(V), it.firstChild);
      it.querySelectorAll('iframe').forEach(function (f) { f.style.display = 'none'; });
    });
    return items.length > 0;
  }

  function addSlide() {
    var mainEl = document.querySelector('.gallery__photos-container');
    var thEl = document.querySelector('.gallery__thumbnails-container');
    var main = mainEl && mainEl.swiper, ths = thEl && thEl.swiper;
    var mob = document.querySelector('.gallery__carousel');
    if (!main && mob && mob.swiper) {
      mob.swiper.addSlide(1, '<div class="gallery__item gallery__item--video"></div>');
      fixMobile();
      return true;
    }
    if (!main || !ths) return false;
    var pos = Math.min(1, main.slides.length);
    main.addSlide(pos, '<li class="gallery__item is-video dr-has-video"><div class="gallery__video"></div></li>');
    main.slides[pos].querySelector('.gallery__video').appendChild(makeVideo(V));
    ths.addSlide(pos, '<li class="gallery__thumb"><a class="gallery__thumb-link is-video dr-thumb dr-own" href="javascript:void(0)">' +
      ((V.thumb || V.poster)
        ? '<img class="gallery__thumb-img" width="78" height="78" alt="Відео" src="' + (V.thumb || V.poster) + '">'
        : '<video class="gallery__thumb-img" width="78" height="78" style="object-fit:cover" muted autoplay loop playsinline src="' + V.mp4 + '"></video>') +
      '</a></li>');
    document.querySelectorAll('.gallery__thumb-link').forEach(function (a, i) { a.setAttribute('data-index', i); });
    document.querySelector('.gallery__thumb-link.dr-own').addEventListener('click', function (e) {
      e.preventDefault(); main.slideTo(pos);
    });
    main.on('slideChange', function () {
      document.querySelectorAll('li.gallery__thumb').forEach(function (l, i) {
        l.classList.toggle('is-active', i === main.activeIndex);
      });
    });
    if (OPEN_ON_VIDEO) main.slideTo(pos, 0);
    return true;
  }

  function run(tries) {
    V = pageVideo();
    if (!V) return;
    var hadVideo = !!document.querySelector('li.gallery__item.is-video, .gallery__item--video, .product-video__item iframe');
    fixMobile();
    swapFrames(document);
    if (hadVideo) fixThumbs();
    else if (!addSlide()) { if ((tries || 0) < 40) { setTimeout(function () { run((tries || 0) + 1); }, 250); } return; }
    document.querySelectorAll('[class*="swiper-container"]').forEach(function (c) {
      if (c.swiper) c.swiper.on('transitionEnd', playVisible);
    });
    setTimeout(playVisible, 500);
    if (window.__drVidObs) return; window.__drVidObs = true;
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1) return;
          if (n.tagName === 'IFRAME') swapFrames(n.parentNode); else if (n.querySelector('iframe')) swapFrames(n);
        });
      });
      if (hadVideo) fixThumbs();
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', function () { run(); });

  var drGal = null, drT = 0;
  function galEl() { return document.querySelector('.gallery__photos-container') || document.querySelector('.gallery__carousel'); }
  function watchGal() {
    drGal = galEl();
    new MutationObserver(function () {
      var g = galEl();
      if (!g || g === drGal) return;
      drGal = g;
      clearTimeout(drT);
      drT = setTimeout(function () { if (!g.querySelector('.dr-video')) run(); }, 300);
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState !== 'loading') watchGal();
  else document.addEventListener('DOMContentLoaded', watchGal);
})();

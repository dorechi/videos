/* DoRechi: DR sew-time sticker v2 - product page: sticker only for the modification articles in window.DR_SEW.articles (follows ajax size switching); catalog cards: sticker for the products in window.DR_SEW.cards (slug without the _size suffix). Desktop + mobile, UA + EN */
(function () {
  var C = window.DR_SEW || {};
  var norm = function (s) { return String(s || '').replace(/\s+/g, ' ').trim().toUpperCase(); };
  var L = (C.articles || []).map(norm);
  var K = (C.cards || []).map(function (s) { return String(s).trim().toLowerCase(); });
  if (!L.length && !K.length) return;
  var EN = /^\/en(\/|$)/.test(location.pathname);
  var TXT = EN ? (C.en || 'Made in 5-7 business days') : (C.ua || 'Пошиття 5-7 робочих днів');
  var BG = C.bg || '#8C6A4F';

  function art() {
    var e = document.querySelector('.product-header__code');
    var t = e ? e.textContent : '';
    if (!t) {
      var m = document.querySelectorAll('.product-meta__item');
      for (var i = 0; i < m.length; i++) {
        var n = m[i].querySelector('.product-meta__name');
        if (n && /Артикул|Article|SKU|Code/i.test(n.textContent)) { t = m[i].textContent; break; }
      }
    }
    return norm(t.replace(/^[^:]*:/, ''));
  }

  function el(tag, cls, style) {
    var x = document.createElement(tag);
    x.className = cls;
    if (style) x.setAttribute('style', style);
    return x;
  }

  function build(mob, kind) {
    var p = mob ? 'product-sticker__' : 'productSticker-';
    var item = el('div', (mob ? 'product-sticker__item product-sticker__item--dr-sew' : 'productSticker-item __dr-sew') + ' dr-sew ' + kind, 'color: ' + BG);
    var cont = el('div', p + 'container');
    var txt = el('div', p + 'content', 'color: #fff');
    txt.textContent = TXT;
    cont.appendChild(txt);
    item.appendChild(cont);
    return item;
  }

  function put(view, mob, kind) {
    var box = view.querySelector(mob ? '.product-sticker' : '.productSticker');
    if (!box) {
      box = el('div', mob ? 'product-sticker product-sticker--tip j-product-stickers' : 'productSticker __tip');
      view.appendChild(box);
    }
    var sep = mob ? box.querySelector('.product-sticker__separator') : null;
    var it = build(mob, kind);
    if (sep) box.insertBefore(it, sep); else box.appendChild(it);
  }

  function page() {
    if (!L.length) return;
    var a = art();
    if (!a) return;
    var on = L.indexOf(a) > -1;
    var ex = document.querySelectorAll('.dr-sew-p');
    if (!on) {
      for (var i = 0; i < ex.length; i++) ex[i].parentNode.removeChild(ex[i]);
      return;
    }
    if (ex.length) return;
    var host = document.querySelector('.gallery__photos');
    if (host) { put(host, false, 'dr-sew-p'); return; }
    host = document.querySelector('.gallery__container');
    if (host) put(host, true, 'dr-sew-p');
  }

  function key(a) {
    var h = (a.getAttribute('href') || '').split('?')[0].split('#')[0].replace(/\/+$/, '');
    return h.slice(h.lastIndexOf('/') + 1).toLowerCase().replace(/_\d+$/, '');
  }

  function cards() {
    if (!K.length) return;
    var cs = document.querySelectorAll('.catalogCard, .catalog-card');
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i];
      var a = c.querySelector('.catalogCard-title a, .catalog-card__title a');
      if (!a) continue;
      var on = K.indexOf(key(a)) > -1;
      var ex = c.querySelector('.dr-sew-c');
      if (!on) { if (ex) ex.parentNode.removeChild(ex); continue; }
      var mob = c.classList.contains('catalog-card');
      if (!ex) {
        var view = c.querySelector(mob ? '.catalog-card__view' : '.catalogCard-view');
        if (view) put(view, mob, 'dr-sew-c');
      }
      if (mob) lift(c);
    }
  }

  // mobile cards are narrow: let the text wrap and move the warmth pill (dr-card-temp) above the sticker
  function lift(c) {
    var s = c.querySelector('.dr-sew-c');
    if (!s) return;
    var t = s.querySelector('.product-sticker__content');
    if (t) { t.style.whiteSpace = 'normal'; t.style.lineHeight = '1.25'; }
    var ct = c.querySelector('.dr-ct');
    if (!ct) return;
    ct.style.bottom = '';
    var pr = ct.getBoundingClientRect(), sr = s.getBoundingClientRect();
    if (!sr.height) return;
    var cur = parseFloat(getComputedStyle(ct).bottom) || 0;
    var nb = cur + (pr.bottom - (sr.top - 4));
    if (nb > cur) ct.style.bottom = Math.round(nb) + 'px';
  }

  function apply() { page(); cards(); }

  var tm;
  function later() { clearTimeout(tm); tm = setTimeout(apply, 150); }
  function start() {
    apply();
    new MutationObserver(later).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

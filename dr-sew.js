/* DoRechi: DR sew-time sticker v1 - shows a sticker on the product page only for the modification articles in window.DR_SEW.articles (desktop + mobile, UA + EN, follows ajax size switching) */
(function () {
  var C = window.DR_SEW || {};
  var norm = function (s) { return String(s || '').replace(/\s+/g, ' ').trim().toUpperCase(); };
  var L = (C.articles || []).map(norm);
  if (!L.length) return;
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

  function build(mob) {
    var p = mob ? 'product-sticker__' : 'productSticker-';
    var item = el('div', (mob ? 'product-sticker__item product-sticker__item--dr-sew' : 'productSticker-item __dr-sew') + ' dr-sew', 'color: ' + BG);
    var cont = el('div', p + 'container');
    var txt = el('div', p + 'content', 'color: #fff');
    txt.textContent = TXT;
    cont.appendChild(txt);
    item.appendChild(cont);
    return item;
  }

  function apply() {
    var a = art();
    if (!a) return;
    var on = L.indexOf(a) > -1;
    var ex = document.querySelectorAll('.dr-sew');
    if (!on) {
      for (var i = 0; i < ex.length; i++) ex[i].parentNode.removeChild(ex[i]);
      return;
    }
    if (ex.length) return;
    var host = document.querySelector('.gallery__photos'), mob = false, box;
    if (host) {
      box = host.querySelector('.productSticker');
      if (!box) { box = el('div', 'productSticker __tip'); host.appendChild(box); }
    } else {
      host = document.querySelector('.gallery__container');
      if (!host) return;
      mob = true;
      box = host.querySelector('.product-sticker');
      if (!box) { box = el('div', 'product-sticker product-sticker--tip j-product-stickers'); host.appendChild(box); }
    }
    var sep = mob ? box.querySelector('.product-sticker__separator') : null;
    var it = build(mob);
    if (sep) box.insertBefore(it, sep); else box.appendChild(it);
  }

  var tm;
  function later() { clearTimeout(tm); tm = setTimeout(apply, 150); }
  function start() {
    apply();
    new MutationObserver(later).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

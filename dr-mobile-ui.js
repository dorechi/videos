/* DoRechi: DR mobile UI v2 (16 Oct 2026) (Reima-style): announcement bar, trust strip, category cards, sticky buy bar, accordions. Mobile theme only. */
(function(){
  if(window.__drMob)return;window.__drMob=1;
  var D=document;
  function run(){
    if(!D.querySelector('header.header .header__left'))return; /* mobile theme only */
    var EN=/^\/en(\/|$)/.test(location.pathname), P=EN?'/en':'';
    var T=EN?{a:['Free delivery in Ukraine from 2500 UAH','Sewn in Mykolaiv since 2011'],buy:'Add to cart',chk:['Free delivery in Ukraine from 2500 UAH','Exchange and returns'],size:'Size'}
           :{a:['Приймаємо до оплати «Пакунок маляти», «єЯсла» та «7000 до року»','Безкоштовна доставка від 2500 грн','Шиємо в Миколаєві з 2011 року'],buy:'Купити',chk:['Безкоштовна доставка по Україні від 2500 грн','Доставка Новою Поштою та Укрпоштою','Обмін та повернення'],size:'Розмір'};
    /* EN mobile: theme shows a dark text logo when the EN logo is empty - use the white logo */
    var lt=D.querySelector('header.header .header__logo-txt');
    if(lt&&!D.querySelector('header.header .header__logo img')){lt.parentNode.innerHTML='<a class="header__logo-link" href="'+(P||'')+'/"><img alt="DoRechi" class="header__logo-img" width="120" height="44" src="/content/images/2/120x44l90nn0/42743213633461.webp" srcset="/content/images/2/120x44l90nn0/42743213633461.webp 1x, /content/images/2/240x88l90nn0/42743213633461.webp 2x"></a>'}
    var path=location.pathname.replace(/^\/en/,'')||'/';
    var isCheckout=/checkout|cart|order/i.test(path);
    var page=D.querySelector('.page');
    if(page&&!isCheckout&&!D.querySelector('.dr-ann')){
      var bar=D.createElement('div');bar.className='dr-ann';
      bar.innerHTML='<a href="'+P+'/delivery-and-return/">'+T.a.map(function(t,i){return '<span'+(i?' class="off"':'')+'>'+t+'</span>'}).join('')+'</a>';
      var main=page.querySelector('main')||page.firstElementChild;
      page.insertBefore(bar,main);
      var sp=bar.querySelectorAll('span'),k=0;
      setInterval(function(){sp[k].classList.add('off');k=(k+1)%sp.length;sp[k].classList.remove('off')},4500);
    }
    var ben=D.querySelector('main section.benefits');
    if(ben){ben.classList.add('dr-trust');[].forEach.call(ben.querySelectorAll('.benefits__item-title'),function(t){t.innerHTML=t.innerHTML.replace(/ (°C|грн|UAH)/g,'&nbsp;$1').replace(/ -(\d)/g,'&nbsp;-$1')})}
    var pc=D.querySelector('.popular-categories');
    if(pc&&!pc.querySelector('.dr-cards')){
      var links=[].slice.call(pc.querySelectorAll('a.catalog-card__link'));
      if(links.length){
        var wrap=D.createElement('div');wrap.className='dr-cards';
        links.forEach(function(a){
          var img=a.querySelector('img'),src=img&&(img.getAttribute('data-src')||img.getAttribute('src'))||'';
          var nm=(a.getAttribute('aria-label')||a.textContent).trim();
          var c=D.createElement('a');c.className='dr-card';c.href=a.getAttribute('href');
          var big=src.replace(/\/\d+x\d+(l\d+nn\d+)\//,'/600x600$1/'),big2=src.replace(/\/\d+x\d+(l\d+nn\d+)\//,'/800x800$1/');
          c.innerHTML='<img loading="lazy" alt="" src="'+big+'" srcset="'+big+' 600w, '+big2+' 800w" sizes="66vw"><b></b>';
          c.querySelector('b').textContent=nm;
          wrap.appendChild(c);
        });
        (pc.querySelector('.popular-categories__wrap')||pc).appendChild(wrap);
        pc.classList.add('dr-has-cards');
      }
    }
    var cm=D.querySelector('main .catalog-menu.j-catalog-menu');
    if(cm&&!D.querySelector('.dr-sub')){
      var items=[].slice.call(cm.querySelectorAll('a.catalog-menu__link'));
      var withImg=items.filter(function(a){return a.querySelector('img')});
      if(items.length>1&&withImg.length===items.length){
        var sub=D.createElement('div');sub.className='dr-sub';
        items.forEach(function(a){
          var img=a.querySelector('img'),src=(img.getAttribute('src')||'').replace(/\/\d+x\d+(l\d+nn\d+)\//,'/240x240$1/');
          var c=D.createElement('a');c.href=a.getAttribute('href')||location.pathname;
          c.innerHTML='<img loading="lazy" alt="" src="'+src+'"><span></span>';
          c.querySelector('span').textContent=(a.querySelector('.catalog-menu__text')||a).textContent.trim();
          sub.appendChild(c);
        });
        cm.parentNode.insertBefore(sub,cm);cm.classList.add('dr-hidden');
      }
    }
    var ob=D.querySelector('.product__block--orderBox');
    if(ob){
      var addChecks=function(){
        var o=D.querySelector('.product__block--orderBox');
        if(!o||o.querySelector('.dr-checks')||!o.querySelector('.j-buy-button-add'))return;
        var ul=D.createElement('ul');ul.className='dr-checks';
        T.chk.forEach(function(t,i){var li=D.createElement('li');
          if(i===T.chk.length-1){li.innerHTML='<a href="'+P+'/return/"></a>';li.firstChild.textContent=t}else li.textContent=t;ul.appendChild(li)});
        (o.querySelector('.product-card__order-box')||o).appendChild(ul);
      };
      addChecks();
      var bb=D.createElement('div');bb.className='dr-buybar';
      bb.innerHTML='<div class="dr-bb-i"><div class="dr-bb-p"></div><div class="dr-bb-s"></div></div><button type="button"></button>';
      D.body.appendChild(bb);
      var btnOrig=function(){return D.querySelector('.product__block--orderBox .j-buy-button-add')};
      var fill=function(){
        var b=btnOrig();
        var pr=D.querySelector('.product__block--orderBox .product-card__price');
        bb.querySelector('.dr-bb-p').textContent=pr?pr.childNodes[0].textContent.trim():'';
        var act=D.querySelector('.product__block--modifications .modification__button--active, .product__block--modifications [class*="--active"]');
        var nm=(D.querySelector('h1')||{}).textContent||'';
        bb.querySelector('.dr-bb-s').textContent=act?T.size+': '+act.textContent.trim():nm.trim();
        var bc=b&&b.querySelector('.btn-content');
        bb.querySelector('button').textContent=(bc&&bc.textContent.trim().replace(/!$/,''))||T.buy;
        return b;
      };
      bb.querySelector('button').addEventListener('click',function(){var b=btnOrig();if(b)b.click()});
      var upd=function(){
        var b=fill();
        if(!b){bb.classList.remove('on');D.body.classList.remove('dr-bb-pad');return}
        var r=b.getBoundingClientRect();
        var show=r.bottom<0;
        bb.classList.toggle('on',show);D.body.classList.toggle('dr-bb-pad',show);
      };
      window.addEventListener('scroll',upd,{passive:true});
      var grid=D.querySelector('.product__grid')||D.querySelector('main');
      if(window.MutationObserver)new MutationObserver(function(){addChecks();upd()}).observe(grid,{childList:true,subtree:true});
      upd();
      var pd=D.querySelector('.product__block--description .product-description');
      var tx=pd&&pd.querySelector('.text');
      if(tx&&tx.querySelector('h2')&&!D.querySelector('.dr-desc')){
        /* move the text OUT of the theme text-expander (its resize observer re-clones content on every height change and crashed phones) */
        var nd=D.createElement('div');nd.className='text dr-desc';nd.setAttribute('itemprop','description');var cur=null;
        [].slice.call(tx.childNodes).forEach(function(n){
          if(n.nodeType===1&&n.tagName==='H2'){
            cur=D.createElement('details');cur.className='dr-acc';
            var s=D.createElement('summary');s.appendChild(n);cur.appendChild(s);
            var b=D.createElement('div');b.className='dr-acc-b';cur.appendChild(b);
            nd.appendChild(cur);
          }else if(cur){cur.lastChild.appendChild(n)}else nd.appendChild(n);
        });
        pd.parentNode.replaceChild(nd,pd);
      }
      ['.product__block--characteristics','.product__block--characteristic','.product__block--comments'].forEach(function(sel){
        var blk=D.querySelector(sel);if(!blk||blk.classList.contains('dr-blk'))return;
        var h=blk.querySelector(':scope>.j-product-block-title');if(!h)return;
        blk.classList.add('dr-blk','dr-closed');h.classList.add('dr-blk-t');
        h.setAttribute('role','button');h.setAttribute('tabindex','0');
        var tg=function(){blk.classList.toggle('dr-closed')};
        h.addEventListener('click',tg);h.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();tg()}});
      });
      if(/#comments|#reviews/.test(location.hash)){var cb=D.querySelector('.product__block--comments');if(cb)cb.classList.remove('dr-closed')}
    }
  }
  if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',function(){setTimeout(run,300)});else setTimeout(run,300);
})();

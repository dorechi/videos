/* DoRechi SEO: FAQPage + Organization JSON-LD (7 Oct 2026) */
(function(){
  function add(o){var s=document.createElement('script');s.type='application/ld+json';s.text=JSON.stringify(o);document.head.appendChild(s);}
  function clean(t){return (t||'').replace(/\s+/g,' ').trim();}
  function run(){
    try{
      var en=/^\/en(\/|$)/.test(location.pathname);
      var p=location.pathname.replace(/^\/en/,'')||'/';
      if(p==='/'){
        add({"@context":"https://schema.org","@type":"Organization","@id":"https://dorechi.ua/#organization",
          "name":en?"DoRechi":"ДоРечі","alternateName":en?"ДоРечі":"DoRechi",
          "url":"https://dorechi.ua/","logo":"https://dorechi.ua/content/images/2/1200x315l90nn0/24516281841293.webp",
          "foundingDate":"2011","address":{"@type":"PostalAddress","addressLocality":en?"Mykolaiv":"Миколаїв","addressCountry":"UA"},
          "email":"do_rechi@ukr.net",
          "sameAs":["https://www.instagram.com/dorechi.ua/","https://www.facebook.com/dorechi.ua/","https://www.youtube.com/channel/UC5w0tyrnyjjSMwYbvvFD42g"],"hasMerchantReturnPolicy":{"@type":"MerchantReturnPolicy","applicableCountry":"UA","returnPolicyCategory":"https://schema.org/MerchantReturnFiniteReturnWindow","merchantReturnDays":14,"returnMethod":"https://schema.org/ReturnByMail","returnFees":"https://schema.org/ReturnFeesCustomerResponsibility","refundType":"https://schema.org/FullRefund","merchantReturnLink":en?"https://dorechi.ua/en/return/":"https://dorechi.ua/return/"}});
      }
      if(document.querySelector('script[type="application/ld+json"][data-dr-faq]'))return;
      var hs=document.querySelectorAll('h2,h3');var h=null;
      for(var i=0;i<hs.length;i++){if(/^(Часті запитання|Frequently asked questions|FAQ$)/i.test(clean(hs[i].textContent))){h=hs[i];break;}}
      if(!h)return;
      var qa=[],q=null,a=[];var n=h.nextElementSibling;
      function push(){if(q&&a.length){qa.push({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a.join(' ')}});}}
      while(n){var t=n.tagName;
        if(t==='H2'||t==='H1')break;
        if(t==='H3'||t==='H4'){push();q=clean(n.textContent);a=[];}
        else if(q){var x=clean(n.textContent);if(x)a.push(x);}
        n=n.nextElementSibling;}
      push();
      if(qa.length>=1){var s=document.createElement('script');s.type='application/ld+json';s.setAttribute('data-dr-faq','1');s.text=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":qa});document.head.appendChild(s);}
    }catch(e){}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();

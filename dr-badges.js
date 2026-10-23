/* DoRechi: DR feature badges v2 (16 Oct 2026; v2 adds Discovery + liners): icon tiles (temperature, membrane, insulation...) under the price on desktop, above sizes on mobile; UA/EN; facts from confirmed product facts; skips Basic and the temporary red Discovery. */
(function(){
  if(window.__drBadges)return;window.__drBadges=1;
  var D=document;
  var I={
    temp:'<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/><path d="M11.5 9v8"/>',
    drop:'<path d="M12 2.7l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    layers:'<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    shine:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    wool:'<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>',
    wash:'<path d="M3 6h18l-2 14H5L3 6z"/><path d="M6 11c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 3 0"/>',
    age:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    height:'<path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    hand:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    wind:'<path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/><path d="M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2"/>',
    size:'<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4z"/><path d="m7.5 10.5 2 2M10.5 7.5l2 2M13.5 4.5l2 2M4.5 13.5l2 2"/>',
    swap:'<path d="M17 3l4 4-4 4"/><path d="M3 7h18"/><path d="M7 21l-4-4 4-4"/><path d="M21 17H3"/>',
    leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.1-6"/>'
  };
  var T20=['temp','+5 до -20 °C','температура','+5 to -20 °C','temperature'],
      T10=['temp','+5 до -10 °C','температура','+5 to -10 °C','temperature'],
      TD20=['temp','+5 до +20 °C','температура','+5 to +20 °C','temperature'],
      TD25=['temp','+5 до +25 °C','температура','+5 to +25 °C','temperature'],
      SHEEP=['wool','100% овчина','підкладка','100% sheepskin','lining'],
      FLEECE=['layers','Фліс Polar','підкладка','Polar fleece','lining'],
      HARN=['shield','5','отворів для ременів безпеки','5','harness openings'],
      HANDLE=['hand','Будь-яка ручка','одинарна чи подвійна','Any handle','single or double'],
      COTTON=['leaf','100% бавовна','підкладка','100% cotton','lining'],
      H5674=['height','56-74 см','зріст','56-74 cm','height'];
  var RULES=[
    [/Діскавері|Discovery/i,[T20,H5674,['layers','Hollowsoft 300','утеплювач, г/м²','Hollowsoft 300','insulation, g/m²'],['swap','Трансформер','з конверта в комбінезон','Convertible','footmuff to snowsuit']]],
    [/Матрасик|Seat Liner/i,[['size','89 x 37 см','розмір','89 x 37 cm','size'],['leaf','100% бавовна','преміум котон','100% cotton','premium cotton'],['drop','Мембрана','у зоні ніжок','Membrane','at the feet'],['shine','Світловідбивні','елементи','Reflective','details']]],
    [/Аполло|Apollo/i,[T20,['drop','7 000 мм','мембрана','7 000 mm','membrane'],['layers','Hollowsoft 300','утеплювач, г/м²','Hollowsoft 300','insulation, g/m²'],['shine','Світловідбивні','елементи','Reflective','details']]],
    [/Напівкомбінезон|Snow Pants/i,[T20,['drop','5 000 мм','мембрана','5 000 mm','membrane'],['layers','Thermoloft 200','утеплювач, г/м²','Thermoloft 200','insulation, g/m²'],['hand','Регульовані','шлейки','Adjustable','straps']]],
    [/Baby XS/i,function(s){return [T20,['age','0-9 міс','вік','0-9 mo','age'],s?SHEEP:FLEECE,HARN]}],
    [/Тренд|Trend/i,function(s){return [T20,['age','6 міс - 3 роки','вік','6 mo - 3 yrs','age'],s?SHEEP:FLEECE,HARN]}],
    [/Муфта|Hand Muff/i,function(s){return s?[T20,['wool','100% овчина','всередині','100% sheepskin','inside'],['drop','Мембрана','зовнішня тканина','Membrane','outer fabric'],HANDLE]:[T20,['layers','4 шари','утеплювача','4 layers','of padding'],HANDLE,['wash','Машинне','прання','Machine','washable']]}],
    [/Шапка зимова|Winter Beanie/i,[T20,['wool','30% мерино','у складі пряжі','30% merino','in the yarn'],COTTON]],
    [/Снуд зимовий|Merino Wool Mix Snood/i,[T20,['wool','30% мерино','у складі пряжі','30% merino','in the yarn'],['age','До 3 років','один розмір','Up to 3 yrs','one size']]],
    [/Шапка демісезонна|Снуд демісезонний|Cotton Mid-season|Cotton Beanie/i,[TD20,['leaf','95% бавовна','кашкорсе','95% cotton','rib knit'],['wash','Прання 30 °C','машинне','Wash 30 °C','machine']]],
    [/Еклер|Eclair/i,[TD20,COTTON,H5674]],
    [/Зефір|Zefir/i,[TD20,['leaf','Велюр','100% бавовна','Velour','100% cotton'],H5674]],
    [/Куртка демісезонна|Mid-season Jacket/i,[TD25,['drop','5 000 мм','мембрана','5 000 mm','membrane'],['layers','Hollowsoft 100','утеплювач, г/м²','Hollowsoft 100','insulation, g/m²'],['height','74-92 см','зріст','74-92 cm','height']]],
    [/Вітровка|Windbreaker/i,[['temp','від +15 °C','температура','from +15 °C','temperature'],['wind','Захист','від вітру','Windproof','shell'],COTTON]],
    [/Пінетки зимові|Winter Booties/i,[T10,['drop','Мембрана','зовнішня тканина','Membrane','outer fabric'],['layers','Hollowsoft 200','утеплювач, г/м²','Hollowsoft 200','insulation, g/m²'],['age','0-18 міс','вік','0-18 mo','age']]],
    [/Пінетки демісезонні|Mid-season Booties/i,[TD25,FLEECE,['age','0-12 міс','вік','0-12 mo','age']]],
    [/Рукавички з вовною|Merino Wool Mix Baby Mittens/i,[T10,['wool','Мерино','2 в\'язані шари','Merino','2 knitted layers'],['age','0-2 роки','вік','0-2 yrs','age']]],
    [/Рукавички зимові мембранні|Waterproof Winter Mittens/i,[T20,['drop','Мембрана','зовнішня тканина','Membrane','outer fabric'],['layers','Thinsulate','утеплювач','Thinsulate','insulation'],['age','До 24 міс','вік','Up to 24 mo','age']]]
  ];
  function css(){} /* CSS: CSS editor */
  function run(){
    if(D.querySelector('.dr-bdg'))return;
    var p=location.pathname;
    var h=D.querySelector('h1');if(!h)return;
    var t=h.textContent.replace(/\s+/g,' ').trim();
    if(/Basic|sleeping bag|Діскавері Червоний|Discovery Red/i.test(t))return;
    var mob=!!D.querySelector('header.header .header__left');
    var anchor=mob?D.querySelector('.product__block--modifications')||D.querySelector('.product__block--orderBox')
                   :(function(){var sd=D.querySelector('.product-short-description');return sd&&sd.closest('.product__group-item')})();
    if(!anchor)return;
    var list=null,sheep=/овчин|Sheepskin/i.test(t);
    for(var i=0;i<RULES.length;i++){if(RULES[i][0].test(t)){list=typeof RULES[i][1]=='function'?RULES[i][1](sheep):RULES[i][1];break}}
    if(!list)return;
    var EN=/^\/en(\/|$)/.test(p);
    css();
    var ul=D.createElement('ul');ul.className='dr-bdg'+(mob?' dr-bdg--m':'');
    list.forEach(function(b){
      var li=D.createElement('li');
      li.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+I[b[0]]+'</svg><div><b></b><span></span></div>';
      li.querySelector('b').textContent=EN?b[3]:b[1];
      li.querySelector('span').textContent=EN?b[4]:b[2];
      ul.appendChild(li);
    });
    anchor.parentNode.insertBefore(ul,anchor);
    if(!mob)anchor.style.display='none';
  }
  if(D.readyState=='loading')D.addEventListener('DOMContentLoaded',run);else run();
})();

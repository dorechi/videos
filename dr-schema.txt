/* DoRechi: DR product schema v1 (22 Oct 2026) - adds material, audience age, additionalProperty and VideoObject to the Product microdata on dorechi.ua product pages */
(function(){var f=function drSchema(){
  if(window.__drSchema)return;window.__drSchema=1;
  var EN=/^\/en\//.test(location.pathname);
  var P=document.querySelector('[itemscope][itemtype*="schema.org/Product"]');
  if(!P||P.querySelector('.dr-sd'))return;
  var h1=document.querySelector('h1');var N=(h1?h1.textContent:'').replace(/\s+/g,' ').trim();
  if(!N||/Basic|sleeping bag|Діскавері Червоний|Discovery Red/i.test(N))return;
  var T20=['Температурний режим','Temperature range','від +5 до -20 °C','+5 to -20 °C'],
      T10=['Температурний режим','Temperature range','від +5 до -10 °C','+5 to -10 °C'],
      T520=['Температурний режим','Temperature range','від +5 до +20 °C','+5 to +20 °C'],
      T525=['Температурний режим','Temperature range','від +5 до +25 °C','+5 to +25 °C'],
      HARN=['Отвори для ременів безпеки','Harness openings','5','5'],
      SK=/овчин|Sheepskin/i.test(N);
  function ins(u,e){return ['Утеплювач','Insulation',u,e];}
  function mem(v){return ['Мембрана','Membrane',v+' мм / 5 000 г/м²',v+' mm / 5,000 g/m²'];}
  function sz(u,e){return ['Розмір','Size',u,e];}
  var RULES=[
    [/Діскавері|Discovery/i,['Плащова тканина, утеплювач Hollowsoft 300, підкладка фліс','Wind- and water-repellent fabric, Hollowsoft 300 insulation, fleece lining'],[0,10],[T20,['Зріст дитини','Child height','56-74 см','56-74 cm'],ins('Hollowsoft 300 г/м²','Hollowsoft 300 g/m²'),['Тип','Type','конверт-трансформер у комбінезон','convertible footmuff to snowsuit']]],
    [/Матрасик|Seat Liner/i,['100% бавовна','100% cotton'],null,[sz('89 x 37 см','89 x 37 cm'),['Мембрана','Membrane','у зоні ніжок','at the feet'],['Світловідбивні елементи','Reflective details','так','yes']]],
    [/Аполло|Apollo/i,['Мембранна тканина, утеплювач Hollowsoft 300, фліс Polar','Membrane fabric, Hollowsoft 300 insulation, Polar fleece'],[6,36],[T20,mem('7 000'),ins('Hollowsoft 300 г/м²','Hollowsoft 300 g/m²'),['Світловідбивні елементи','Reflective details','так','yes']]],
    [/Напівкомбінезон|Snow Pants/i,['Мембранна тканина, утеплювач Thermoloft Active 200, фліс','Membrane fabric, Thermoloft Active 200 insulation, fleece'],null,[T20,mem('5 000'),ins('Thermoloft Active 200','Thermoloft Active 200')]],
    [/Baby XS/i,SK?['Мембранна тканина, овчина 100% вовна','Membrane fabric, 100% wool sheepskin']:['Мембранна тканина, утеплювач 400 г/м², фліс Polar','Membrane fabric, 400 g/m² padding, Polar fleece'],[0,10],[T20,sz('75 x 40 см','75 x 40 cm'),HARN]],
    [/Тренд|Trend/i,SK?['Плащова тканина, овчина 100%','Waterproof windproof fabric, 100% sheepskin']:['Плащова тканина, утеплювач 400 г/м², фліс Polar','Water- and wind-repellent fabric, 400 g/m² padding, Polar fleece'],[6,36],[T20,sz('100 x 48 см','100 x 48 cm'),HARN]],
    [/Муфта|Hand Muff/i,SK?['Мембранна тканина, овчина 100% вовна','Membrane fabric, 100% wool sheepskin']:['Фліс, 4 шари утеплювача','Fleece, 4-layer padding'],null,[T20,['Сумісність','Fits','будь-яка ручка, одинарна чи подвійна','any handle, single or double']]],
    [/Шапка зимова|Winter Beanie/i,['35% віскоза, 30% меріно, 25% бавовна, 10% нейлон','35% viscose, 30% merino, 25% cotton, 10% nylon'],null,[T20,['Підкладка','Lining','100% бавовна','100% cotton']]],
    [/Снуд зимовий|Merino Wool Mix Snood/i,['35% віскоза, 30% меріно, 25% бавовна, 10% нейлон','35% viscose, 30% merino, 25% cotton, 10% nylon'],[0,36],[T20]],
    [/вушками|with Ears/i,['Кашкорсе, підкладка бавовняний трикотаж','Cotton rib knit, cotton jersey lining'],null,[T520]],
    [/Шапка демісезонна|Cotton Mid-season Beanie|Cotton Beanie/i,['Кашкорсе: 95% бавовна, 5% еластан','Cotton rib knit: 95% cotton, 5% elastane'],null,[T520]],
    [/Снуд демісезонний|Cotton Mid-season Snood/i,['Кашкорсе: 95% бавовна, 5% еластан','Cotton rib knit: 95% cotton, 5% elastane'],[0,36],[T520]],
    [/Еклер|Eclair/i,null,[0,9],[T520,['Зріст дитини','Child height','56-74 см','56-74 cm'],['Підкладка','Lining','100% бавовняний трикотаж','100% cotton jersey']]],
    [/Зефір|Zefir/i,['Велюр 100% бавовна','100% cotton velour'],[0,9],[T520,['Зріст дитини','Child height','56-74 см','56-74 cm'],ins('силіконізований, 150 г/м²','siliconised padding, 150 g/m²')]],
    [/Куртка демісезонна|Mid-season Jacket/i,['Мембранна тканина, утеплювач Hollowsoft 100','Membrane fabric, Hollowsoft 100 insulation'],[6,24],[T525,mem('5 000')]],
    [/Вітровка|Windbreaker/i,['Вітрозахисна водовідштовхувальна тканина, підкладка 100% бавовна','Windproof water-repellent fabric, 100% cotton lining'],null,[['Температурний режим','Temperature range','від +15 °C','from +15 °C']]],
    [/Пінетки зимові|Winter Booties/i,['Мембранна тканина, утеплювач Hollowsoft 200, фліс Polar','Membrane fabric, Hollowsoft 200 insulation, Polar fleece'],[0,18],[T10,['Довжина устілки','Sole length','14 см','14 cm']]],
    [/Пінетки демісезонні|Mid-season Booties/i,null,[0,12],[T525,['Довжина устілки','Sole length','13 см','13 cm'],['Підкладка','Lining','фліс Polar','Polar fleece']]],
    [/Рукавички з вовною|Merino Wool Mix Baby Mittens/i,['Пряжа з меріно, 2 в’язані шари','Merino wool mix yarn, 2 knitted layers'],[0,24],[T10]],
    [/Рукавички зимові|Waterproof Winter Mittens/i,['Мембранна тканина, утеплювач Thinsulate, фліс','Membrane fabric, Thinsulate insulation, fleece lining'],[0,24],[T20]],
    [/плед|Blanket/i,['30% бавовна, 70% акрил','30% cotton, 70% acrylic'],null,[sz('80 x 100 см','80 x 100 cm')]],
    [/Фарби|Colors/i,null,null,[['Захист від УФ','UV protection','UPF 40, блокує 97% УФ-променів','UPF 40, blocks 97% of UV']]],
    [/Козирок|Shade/i,null,null,[['Захист від УФ','UV protection','UPF 50, блокує 98% УФ-променів','UPF 50, blocks 98% of UV']]],
    [/Сумка-рюкзак|Backpack/i,null,null,[sz('31 x 16.5 x 37.5 см','31 x 16.5 x 37.5 cm'),['Кількість кишень','Pockets','14','14']]]
  ];
  var R=null;for(var i=0;RULES.length>i;i++){if(RULES[i][0].test(N)){R=RULES[i];break;}}
  var L=EN?1:0,box=E('div');box.className='dr-sd';box.hidden=true;
    function E(t,p,ty){var e=document.createElement(t);if(p)e.setAttribute('itemprop',p);if(ty){e.setAttribute('itemscope','');e.setAttribute('itemtype','https://schema.org/'+ty);}return e;}function meta(p,v){var e=E('meta',p);e.setAttribute('content',String(v));return e;}
  var m=N.match(/,\s*(\d{2,3}(?:-\d{2,3})?)\s*$/);if(m)box.appendChild(meta('size',m[1]+(EN?' cm':' см')));
  if(R){
    if(R[1])box.appendChild(meta('material',R[1][L]));
    if(R[2]){var au=E('div','audience','PeopleAudience'),ag=E('div','suggestedAge','QuantitativeValue');ag.appendChild(meta('minValue',R[2][0]));ag.appendChild(meta('maxValue',R[2][1]));ag.appendChild(meta('unitCode','MON'));au.appendChild(ag);box.appendChild(au);}
    R[3].forEach(function(p){var pv=E('div','additionalProperty','PropertyValue');pv.appendChild(meta('name',p[L]));pv.appendChild(meta('value',p[2+L]));box.appendChild(pv);});
  }
  if(box.children.length)P.appendChild(box);
  var VD={'1812_F':'2026-10-03','1842F':'2026-10-03','1891':'2026-10-04','1898_68':'2026-10-06','1899_74':'2026-10-06','2074':'2026-10-03','2076':'2026-10-05','2087-v2':'2026-10-03','2087':'2026-10-03','2089F':'2026-10-03','2095 O':'2026-10-15','2095-v2':'2026-10-05','2095-v3':'2026-10-05','2095':'2026-10-05','2095_74_O':'2026-10-15','2107-v3':'2026-10-03','2107':'2026-10-03','2109-hd':'2026-10-14','2109-hd2':'2026-10-14','2109':'2026-10-03','2110-hd':'2026-10-14','2110':'2026-10-03','2111':'2026-10-03','2119':'2026-10-04','2120':'2026-10-04','2120_74_O':'2026-10-16','2121':'2026-10-04','windbreaker_white':'2026-10-03'};
  var tries=0;
  (function vid(){
    var vs=document.querySelectorAll('video.dr-video'),src='',poster='';
    for(var j=0;vs.length>j;j++){var v=vs[j],s=v.getAttribute('src')||v.getAttribute('data-src')||((v.querySelector('source')||{}).src)||'';if(!poster&&v.poster)poster=v.poster;if(/dorechi\/videos/.test(s)){src=s;if(v.poster)poster=v.poster;break;}}
    if(!src){if(++tries>19)return;setTimeout(vid,500);return;}
    if(P.querySelector('.dr-vo'))return;
    var f=decodeURIComponent(src.split('/').pop().replace(/\.mp4.*$/,'')),dt=VD[f];
    if(!dt||!poster)return;
    var md=document.querySelector('meta[name="description"]'),desc=(md&&md.content)||N;
    var o=document.createElement('div');o.className='dr-vo';o.hidden=true;
    var vo=E('div','subjectOf','VideoObject');[['name',(EN?'Video: ':'Відео: ')+N],['description',desc],['thumbnailUrl',poster],['contentUrl',src],['uploadDate',dt]].forEach(function(a){vo.appendChild(meta(a[0],a[1]));});o.appendChild(vo);
    P.appendChild(o);
  })();
};function go(){setTimeout(f,600);}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();})();

/* DoRechi: DR story cards v1 (21 Oct 2026, mobile homepage) */(function(){var run=function drStory(){
if(window.__drStory)return;window.__drStory=1;
if(!document.querySelector('header.header .header__left'))return;
var en=/^\/en(\/|$)/.test(location.pathname);var path=location.pathname.replace(/^\/en/,'')||'/';if(path!=='/')return;
var P=en?'/en':'';var I='/content/images/1/800x600e80nn0/';
var S=en?[
['blogyak-praty-zymovyi-kombinezon-71665409029802.webp','Apollo snowsuit: warm down to -20 °C','7000 mm membrane, Hollowsoft 300 and reflective details. Choose the size by height.','Shop Apollo','/kombinezon-zymovyi-apollo-74-92sm/'],
['blogbaby-xs-chy-trend-97292582224174.webp','Baby XS or Trend?','From birth to 9 months or from 6 months to 3 years: which footmuff fits your baby.','Compare footmuffs','/blog/baby-xs-chy-trend/'],
['blogrozmirna-sitka-50205563605745.webp','Size guide','How to measure your child and how much room to leave for growth.','Find the size','/blog/rozmirna-sitka/'],
['blogpodarunok-maliuku-vzymku-18868848509645.webp','Winter gift ideas','Gifts for newborns, toddlers and mums, plus matching sets in one colour.','See gift ideas','/blog/podarunok-maliuku-vzymku/']
]:[
['blogyak-praty-zymovyi-kombinezon-71665409029802.webp','Комбінезон Аполло: тепло до -20 °C','Мембрана 7 000 мм, Hollowsoft 300 і світловідбивні елементи. Розмір обираємо за зростом.','Обрати Аполло','/kombinezon-zymovyi-apollo-74-92sm/'],
['blogbaby-xs-chy-trend-97292582224174.webp','Baby XS чи Тренд?','Від народження до 9 міс чи від 6 міс до 3 років: який конверт підійде вашій дитині.','Порівняти конверти','/blog/baby-xs-chy-trend/'],
['blogrozmirna-sitka-50205563605745.webp','Розмірна сітка','Як виміряти дитину і скільки залишити на ріст протягом холодних місяців.','Підібрати розмір','/blog/rozmirna-sitka/'],
['blogpodarunok-maliuku-vzymku-18868848509645.webp','Подарунок малюку взимку','Ідеї для новонароджених, малюків і мам та комплекти в одному кольорі.','Ідеї подарунків','/blog/podarunok-maliuku-vzymku/']
];
var sec=document.createElement('section');sec.className='dr-st';
var h=document.createElement('div');h.className='dr-st__h';h.textContent=en?'Before you buy':'Перед покупкою';sec.appendChild(h);
var row=document.createElement('div');row.className='dr-st__row';sec.appendChild(row);
S.forEach(function(s){var c=document.createElement('div');c.className='dr-st__c';
var a0=document.createElement('a');a0.href=P+s[4];a0.className='dr-st__i';var im=document.createElement('img');im.src=I+s[0];im.alt=s[1];im.loading='lazy';a0.appendChild(im);c.appendChild(a0);
var b=document.createElement('div');b.className='dr-st__b';var t=document.createElement('div');t.className='dr-st__t';t.textContent=s[1];var p=document.createElement('p');p.className='dr-st__p';p.textContent=s[2];var a=document.createElement('a');a.className='dr-st__a';a.href=P+s[4];a.textContent=s[3];b.appendChild(t);b.appendChild(p);b.appendChild(a);c.appendChild(b);row.appendChild(c)});
var anchor=document.querySelector('section.popular-categories');if(!anchor)return;
if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(sec,anchor.nextSibling);
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run()})();
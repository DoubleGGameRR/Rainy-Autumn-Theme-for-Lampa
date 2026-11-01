/* Rainy Autumn Theme for Lampa | v1.0.0 | MIT
 * Self-contained: no remote assets, fonts, libraries, tracking or network requests.
 */
(function () {
'use strict';
var P='ratl-', STYLE=P+'styles', LAYER=P+'atmosphere', ROOT=P+'enabled', registered=false;
function get(k,d){try{if(window.Lampa&&Lampa.Storage&&Lampa.Storage.get){var v=Lampa.Storage.get(P+k,d);return v===undefined||v===null?d:v;}}catch(e){}return d;}
function on(k,d){var v=get(k,d);return v===true||v==='true'||v===1||v==='1';}
function count(v,a,b){v=parseInt(v,10);return isNaN(v)?a:Math.max(a,Math.min(b,v));}
var css=[
'html.'+ROOT+'{--ratl-amber:#e7ad4e;--ratl-autumn-bg:#10191d}',
'html.'+ROOT+' body{background-color:#10191d!important;background-image:radial-gradient(ellipse at 12% 78%,rgba(171,91,35,.22),transparent 34%),radial-gradient(ellipse at 82% 18%,rgba(178,153,111,.18),transparent 38%),linear-gradient(145deg,#0d171d 0%,#172329 48%,#29251f 100%)!important;color:#e8edef!important;position:relative}',
'html.'+ROOT+' body:before{content:"";position:fixed;z-index:0;pointer-events:none;inset:8% -18% 0;background:radial-gradient(ellipse at 20% 55%,rgba(192,207,203,.17) 0%,rgba(192,207,203,.075) 24%,transparent 48%),radial-gradient(ellipse at 72% 67%,rgba(173,190,190,.15) 0%,rgba(173,190,190,.06) 26%,transparent 52%),radial-gradient(ellipse at 48% 34%,rgba(203,211,204,.09),transparent 45%);filter:blur(34px);opacity:.9;transform:translate3d(-1.5%,0,0);animation:ratl-background-mist 48s ease-in-out infinite alternate}',
'html.'+ROOT+' body>*{position:relative;z-index:1}',
'@keyframes ratl-background-mist{0%{transform:translate3d(-2%,0,0) scale(1)}50%{transform:translate3d(1%,1.2%,0) scale(1.035)}100%{transform:translate3d(2%,-.8%,0) scale(1.015)}}',
'html.'+ROOT+' .head{background:linear-gradient(180deg,rgba(13,24,30,.91),rgba(13,24,30,.58))!important;border-bottom:1px solid rgba(220,174,99,.14)!important}',
'html.'+ROOT+' .menu{background:linear-gradient(155deg,#1c2b31,#172329 60%,#20251f)!important;border-right:1px solid rgba(222,173,93,.2)!important;color:#edf0e9!important}',
'html.'+ROOT+' .menu__item{color:#dfe7e6!important}',
'html.'+ROOT+' .menu__item.focus,html.'+ROOT+' .menu__item.active,html.'+ROOT+' .menu__item.traverse{background:linear-gradient(90deg,rgba(181,126,54,.34),rgba(107,133,116,.17))!important;color:#fff4d9!important}',
'html.'+ROOT+' .card.focus .card__view,html.'+ROOT+' .card.focus .card__img{outline-color:rgba(225,171,88,.8)!important}',
'#'+LAYER+'{position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden}',
'#'+LAYER+' .ratl-rain,#'+LAYER+' .ratl-leaves{position:absolute;inset:0;overflow:hidden}',
'#'+LAYER+' .ratl-rain{inset:-18% -5%;opacity:.82}',
'#'+LAYER+' .ratl-drop{position:absolute;top:-22%;display:block;width:2px;height:clamp(55px,9vh,105px);background:linear-gradient(180deg,transparent,rgba(224,240,244,.92),rgba(206,225,230,.48),transparent);box-shadow:0 0 3px rgba(210,235,242,.28);transform:rotate(10deg);animation:ratl-fall var(--dur) linear var(--delay) infinite;will-change:transform}',
'#'+LAYER+' .ratl-glass{position:absolute;inset:0;background:radial-gradient(ellipse at 14% 12%,rgba(206,222,224,.07),transparent 30%),linear-gradient(180deg,rgba(7,17,23,.03),rgba(7,17,23,.10))}',
'#'+LAYER+' .ratl-fog{position:absolute;left:-15%;width:130%;height:20%;border-radius:50%;filter:blur(28px);background:rgba(178,197,194,.075);animation:ratl-drift 32s ease-in-out infinite alternate}',
'#'+LAYER+' .ratl-fog.one{top:18%}#'+LAYER+' .ratl-fog.two{bottom:9%;opacity:.65;animation-duration:43s;animation-direction:alternate-reverse}',
'#'+LAYER+' .ratl-leaf{position:absolute;top:-12%;display:block;width:clamp(22px,2.2vw,34px);height:clamp(29px,2.9vw,43px);opacity:0;animation:ratl-leaf-fall var(--dur) linear var(--delay) infinite;will-change:transform}',
'#'+LAYER+' .ratl-leaf:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#ffe69a 0%,#f4bd48 38%,#d88926 72%,#a85f27 100%);border-radius:2px 85% 3px 85%;transform:rotate(35deg);box-shadow:0 0 10px rgba(255,190,75,.32)}',
'#'+LAYER+' .ratl-leaf:after{content:"";position:absolute;left:48%;top:12%;height:78%;width:1px;background:rgba(91,61,28,.42);transform:rotate(-24deg)}',
'@keyframes ratl-fall{0%{transform:translate3d(0,-5vh,0) rotate(10deg)}100%{transform:translate3d(-7vw,120vh,0) rotate(10deg)}}',
'@keyframes ratl-leaf-fall{0%{opacity:0;transform:translate3d(0,-5vh,0) rotate(0)}8%{opacity:.96}88%{opacity:.88}100%{opacity:0;transform:translate3d(var(--sway),115vh,0) rotate(var(--spin))}}',
'@keyframes ratl-drift{0%{transform:translateX(-5%)}100%{transform:translateX(8%)}}',
'@media(prefers-reduced-motion:reduce){#'+LAYER+' .ratl-drop{animation:none!important;top:25%!important;opacity:.75!important}#'+LAYER+' .ratl-leaf{animation:none!important;top:20%!important;opacity:.85!important}#'+LAYER+' .ratl-fog{animation:none!important}}'
].join('\n');
var frame=0, canvas=null, ctx=null, drops=[], leafItems=[], playerObserver=null, playerMode=false, resizeHandler=null;
function random(min,max){return min+Math.random()*(max-min);}
function resizeCanvas(){
 if(!canvas)return;
 var ratio=Math.min(window.devicePixelRatio||1,2);
 canvas.width=Math.max(1,Math.floor(window.innerWidth*ratio));
 canvas.height=Math.max(1,Math.floor(window.innerHeight*ratio));
 canvas.style.width='100%';canvas.style.height='100%';
 ctx=canvas.getContext('2d');
 if(ctx)ctx.setTransform(ratio,0,0,ratio,0,0);
}
function stopAnimation(){if(frame&&window.cancelAnimationFrame)window.cancelAnimationFrame(frame);frame=0;}
function draw(){
 if(!ctx||!canvas||playerMode)return;
 var w=window.innerWidth,h=window.innerHeight;
 ctx.clearRect(0,0,w,h);
 if(on('rain',true)){
  ctx.lineWidth=.65;ctx.strokeStyle='rgba(211,231,238,.28)';
  for(var i=0;i<drops.length;i++){
   var d=drops[i];ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x-2,d.y+d.len);ctx.stroke();
   d.x-=d.speed*.08;d.y+=d.speed;
   if(d.y>h+20){d.y=-random(20,h*.3);d.x=random(0,w);}
  }
 }
 if(on('leaves',true)){
  for(var j=0;j<leafItems.length;j++){
   var l=leafItems[j];ctx.save();ctx.translate(l.x,l.y);ctx.rotate(l.angle);
   ctx.fillStyle=l.color;ctx.beginPath();ctx.moveTo(0,-l.size);ctx.bezierCurveTo(l.size*.95,-l.size*.45,l.size*.9,l.size*.45,0,l.size);ctx.bezierCurveTo(-l.size*.9,l.size*.45,-l.size*.95,-l.size*.45,0,-l.size);ctx.fill();
   ctx.strokeStyle='rgba(103,65,23,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-l.size*.72);ctx.lineTo(0,l.size*.75);ctx.stroke();ctx.restore();
   l.x+=l.wind;l.y+=l.speed;l.angle+=l.spin;
   if(l.y>h+40){l.y=-30;l.x=random(0,w);}
   if(l.x<-30)l.x=w+20;if(l.x>w+30)l.x=-20;
  }
 }
 frame=window.requestAnimationFrame(draw);
}
function isPlayer(){
 var selectors=['.player','.player__body','.player__video','.player-video','.video-player','.player-layer'];
 for(var i=0;i<selectors.length;i++){
  var el=document.querySelector(selectors[i]);
  if(!el)continue;
  var rect=el.getBoundingClientRect(),style=window.getComputedStyle?window.getComputedStyle(el):null;
  if(rect.width>160&&rect.height>90&&(!style||(style.display!=='none'&&style.visibility!=='hidden'&&Number(style.opacity)!==0)))return true;
 }
 var video=document.querySelector('video');
 if(video){var vr=video.getBoundingClientRect();if(vr.width>160&&vr.height>90&&!video.paused&&!video.ended)return true;}
 return false;
}
function syncPlayerMode(){
 var next=isPlayer();if(next===playerMode)return;playerMode=next;
 if(canvas)canvas.style.display=playerMode?'none':'block';
 if(playerMode)stopAnimation();else if(ctx&&window.requestAnimationFrame)frame=window.requestAnimationFrame(draw);
}
function mount(){
 stopAnimation();
 var old=document.getElementById(LAYER);if(old&&old.parentNode)old.parentNode.removeChild(old);
 canvas=document.createElement('canvas');canvas.id=LAYER;canvas.setAttribute('aria-hidden','true');
 canvas.style.cssText='position:fixed!important;left:0!important;top:0!important;width:100vw!important;height:100vh!important;z-index:2147483647!important;pointer-events:none!important;display:block!important;';
 document.documentElement.appendChild(canvas);resizeCanvas();
 drops=[];leafItems=[];
 var w=window.innerWidth,h=window.innerHeight;
 var rainCount=on('rain',true)?count(get('rain_amount',42),18,85):0;
 var leafCount=on('leaves',true)?count(get('leaf_amount',14),7,24):0;
 for(var i=0;i<rainCount;i++)drops.push({x:random(0,w),y:random(-h,h),len:random(10,25),speed:random(3.2,6.2)});
 var colors=['#f6c34f','#e6a52f','#d98227','#f2d477','#bd7027'];
 for(var j=0;j<leafCount;j++)leafItems.push({x:random(0,w),y:random(-h,h),size:random(9,17),speed:random(1.1,2.8),wind:random(-.9,.9),angle:random(0,6.28),spin:random(-.025,.025),color:colors[j%colors.length]});
 if(window.addEventListener&&!resizeHandler){resizeHandler=resizeCanvas;window.addEventListener('resize',resizeHandler,false);}
 if(window.requestAnimationFrame&&!playerMode)frame=window.requestAnimationFrame(draw);
 syncPlayerMode();
 if(window.MutationObserver&&!playerObserver){playerObserver=new MutationObserver(function(){syncPlayerMode();});playerObserver.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});}
}
function apply(){if(!document.documentElement||!document.body)return;var active=on('enabled',true);document.documentElement.classList.toggle(ROOT,active);var style=document.getElementById(STYLE);if(active){if(!style){style=document.createElement('style');style.id=STYLE;style.type='text/css';style.appendChild(document.createTextNode(css));document.head.appendChild(style);}mount();}else{if(style&&style.parentNode)style.parentNode.removeChild(style);stopAnimation();var layer=document.getElementById(LAYER);if(layer&&layer.parentNode)layer.parentNode.removeChild(layer);canvas=null;ctx=null;}}
function settings(){if(registered||!window.Lampa||!Lampa.SettingsApi||!Lampa.SettingsApi.addParam)return;registered=true;function add(name,title,type,values,def){try{Lampa.SettingsApi.addParam({component:'interface',param:{name:P+name,type:type,values:values||null,default:def},field:{name:title,description:''}});}catch(e){}}
add('enabled','Rainy Autumn Theme','trigger',null,true);add('rain','Rain on glass','trigger',null,true);add('leaves','Falling yellow leaves','trigger',null,true);add('mist','Autumn mist','trigger',null,true);
add('rain_amount','Rain intensity','select',[{title:'Light',value:16},{title:'Medium',value:34},{title:'Heavy',value:52}],34);
add('leaf_amount','Leaves amount','select',[{title:'Few',value:5},{title:'Medium',value:9},{title:'More',value:14}],9);}
function init(){if(!document.body)return;settings();apply();}
if(window.Lampa){Lampa.Manifest=Lampa.Manifest||{plugins:{}};Lampa.Manifest.plugins=Lampa.Manifest.plugins||{};Lampa.Manifest.plugins.rainy_autumn_theme={name:'Rainy Autumn Theme',version:'1.0.6',description:'Rain, golden leaves and soft autumn mist.'};if(Lampa.Listener&&Lampa.Listener.follow)Lampa.Listener.follow('app',function(e){if(e.type==='ready')init();else if(e.type==='destroy'||e.type==='stop')syncPlayerMode();});}
if(document.readyState==='complete'||document.readyState==='interactive')setTimeout(init,0);else document.addEventListener('DOMContentLoaded',init,false);
})();
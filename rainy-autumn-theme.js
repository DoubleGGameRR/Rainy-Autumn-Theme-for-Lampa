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
'html.'+ROOT+'{--ratl-amber:#e7ad4e}',
'html.'+ROOT+' body{background-color:#101a20!important;background-image:radial-gradient(ellipse at 78% 8%,rgba(184,132,63,.12),transparent 38%),linear-gradient(145deg,rgba(15,28,35,.97),rgba(19,27,30,.97) 55%,rgba(32,28,23,.98))!important;color:#e8edef!important}',
'html.'+ROOT+' .head{background:linear-gradient(180deg,rgba(13,24,30,.91),rgba(13,24,30,.58))!important;border-bottom:1px solid rgba(220,174,99,.14)!important}',
'html.'+ROOT+' .menu{background:linear-gradient(155deg,#1c2b31,#172329 60%,#20251f)!important;border-right:1px solid rgba(222,173,93,.2)!important;color:#edf0e9!important}',
'html.'+ROOT+' .menu__item{color:#dfe7e6!important}',
'html.'+ROOT+' .menu__item.focus,html.'+ROOT+' .menu__item.active,html.'+ROOT+' .menu__item.traverse{background:linear-gradient(90deg,rgba(181,126,54,.34),rgba(107,133,116,.17))!important;color:#fff4d9!important}',
'html.'+ROOT+' .card.focus .card__view,html.'+ROOT+' .card.focus .card__img{outline-color:rgba(225,171,88,.8)!important}',
'#'+LAYER+'{position:fixed;inset:0;z-index:9990;pointer-events:none;overflow:hidden;contain:strict}',
'#'+LAYER+' .ratl-rain,#'+LAYER+' .ratl-leaves{position:absolute;inset:0;overflow:hidden}',
'#'+LAYER+' .ratl-rain{inset:-18% -5%;opacity:.42}',
'#'+LAYER+' .ratl-drop{position:absolute;top:-22%;width:1px;height:clamp(24px,4vh,54px);background:linear-gradient(180deg,transparent,rgba(206,225,230,.52),rgba(206,225,230,.08));transform:rotate(10deg);animation:ratl-fall var(--dur) linear var(--delay) infinite;will-change:transform}',
'#'+LAYER+' .ratl-glass{position:absolute;inset:0;background:radial-gradient(ellipse at 14% 12%,rgba(206,222,224,.07),transparent 30%),linear-gradient(180deg,rgba(7,17,23,.03),rgba(7,17,23,.10))}',
'#'+LAYER+' .ratl-fog{position:absolute;left:-15%;width:130%;height:20%;border-radius:50%;filter:blur(28px);background:rgba(178,197,194,.075);animation:ratl-drift 32s ease-in-out infinite alternate}',
'#'+LAYER+' .ratl-fog.one{top:18%}#'+LAYER+' .ratl-fog.two{bottom:9%;opacity:.65;animation-duration:43s;animation-direction:alternate-reverse}',
'#'+LAYER+' .ratl-leaf{position:absolute;top:-12%;width:clamp(11px,1.2vw,19px);height:clamp(15px,1.6vw,24px);opacity:0;animation:ratl-leaf-fall var(--dur) linear var(--delay) infinite;will-change:transform}',
'#'+LAYER+' .ratl-leaf:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,#f2cf75,#d99a35 48%,#a85f27);border-radius:2px 85% 3px 85%;transform:rotate(35deg);box-shadow:0 0 8px rgba(227,166,66,.12)}',
'#'+LAYER+' .ratl-leaf:after{content:"";position:absolute;left:48%;top:12%;height:78%;width:1px;background:rgba(91,61,28,.42);transform:rotate(-24deg)}',
'@keyframes ratl-fall{0%{transform:translate3d(0,-5vh,0) rotate(10deg)}100%{transform:translate3d(-7vw,120vh,0) rotate(10deg)}}',
'@keyframes ratl-leaf-fall{0%{opacity:0;transform:translate3d(0,-5vh,0) rotate(0)}8%{opacity:.82}88%{opacity:.72}100%{opacity:0;transform:translate3d(var(--sway),115vh,0) rotate(var(--spin))}}',
'@keyframes ratl-drift{0%{transform:translateX(-5%)}100%{transform:translateX(8%)}}',
'@media(prefers-reduced-motion:reduce){#'+LAYER+' .ratl-drop,#'+LAYER+' .ratl-leaf,#'+LAYER+' .ratl-fog{animation:none!important;display:none!important}}'
].join('\n');
function mount(){
var old=document.getElementById(LAYER);if(old&&old.parentNode)old.parentNode.removeChild(old);
var root=document.createElement('div');root.id=LAYER;root.setAttribute('aria-hidden','true');
if(on('rain',true)){var rain=document.createElement('div');rain.className='ratl-rain';for(var i=0,n=count(get('rain_amount',34),8,65);i<n;i++){var d=document.createElement('i');d.className='ratl-drop';d.style.left=((i*37+5)%100)+'%';d.style.setProperty('--dur',(1.1+(i%9)*.19)+'s');d.style.setProperty('--delay',(-((i*13)%35)/10)+'s');rain.appendChild(d);}root.appendChild(rain);var glass=document.createElement('div');glass.className='ratl-glass';root.appendChild(glass);}
if(on('mist',true)){var f1=document.createElement('div'),f2=document.createElement('div');f1.className='ratl-fog one';f2.className='ratl-fog two';root.appendChild(f1);root.appendChild(f2);}
if(on('leaves',true)){var leaves=document.createElement('div');leaves.className='ratl-leaves';for(var j=0,m=count(get('leaf_amount',9),3,18);j<m;j++){var leaf=document.createElement('i');leaf.className='ratl-leaf';leaf.style.left=((j*53+11)%100)+'%';leaf.style.setProperty('--dur',(13+(j%7)*2.7)+'s');leaf.style.setProperty('--delay',(-((j*19)%170)/10)+'s');leaf.style.setProperty('--sway',((j%2?1:-1)*(4+(j%5)*2))+'vw');leaf.style.setProperty('--spin',(180+j*97)+'deg');leaves.appendChild(leaf);}root.appendChild(leaves);}
document.body.appendChild(root);
}
function apply(){if(!document.documentElement||!document.body)return;var active=on('enabled',true);document.documentElement.classList.toggle(ROOT,active);var style=document.getElementById(STYLE);if(active){if(!style){style=document.createElement('style');style.id=STYLE;style.type='text/css';style.appendChild(document.createTextNode(css));document.head.appendChild(style);}mount();}else{if(style&&style.parentNode)style.parentNode.removeChild(style);var layer=document.getElementById(LAYER);if(layer&&layer.parentNode)layer.parentNode.removeChild(layer);}}
function settings(){if(registered||!window.Lampa||!Lampa.SettingsApi||!Lampa.SettingsApi.addParam)return;registered=true;function add(name,title,type,values,def){try{Lampa.SettingsApi.addParam({component:'interface',param:{name:P+name,type:type,values:values||null,default:def},field:{name:title,description:''}});}catch(e){}}
add('enabled','Rainy Autumn Theme','trigger',null,true);add('rain','Rain on glass','trigger',null,true);add('leaves','Falling yellow leaves','trigger',null,true);add('mist','Autumn mist','trigger',null,true);
add('rain_amount','Rain intensity','select',[{title:'Light',value:16},{title:'Medium',value:34},{title:'Heavy',value:52}],34);
add('leaf_amount','Leaves amount','select',[{title:'Few',value:5},{title:'Medium',value:9},{title:'More',value:14}],9);}
function init(){if(!document.body)return;settings();apply();}
if(window.Lampa){Lampa.Manifest=Lampa.Manifest||{plugins:{}};Lampa.Manifest.plugins=Lampa.Manifest.plugins||{};Lampa.Manifest.plugins.rainy_autumn_theme={name:'Rainy Autumn Theme',version:'1.0.0',description:'Rain, golden leaves and soft autumn mist.'};if(Lampa.Listener&&Lampa.Listener.follow)Lampa.Listener.follow('app',function(e){if(e.type==='ready')init();});}
if(document.readyState==='complete'||document.readyState==='interactive')setTimeout(init,0);else document.addEventListener('DOMContentLoaded',init,false);
})();
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1028:function(t,r,n){var e=n(968),o=n(1029),l=Object.hasOwnProperty,c=Object.create(null);for(var h in e)l.call(e,h)&&(c[e[h]]=h);var f=t.exports={to:{},get:{}};function d(t,r,n){return Math.min(Math.max(r,t),n)}function m(t){var r=Math.round(t).toString(16).toUpperCase();return r.length<2?"0"+r:r}f.get=function(t){var r,n;switch(t.substring(0,3).toLowerCase()){case"hsl":r=f.get.hsl(t),n="hsl";break;case"hwb":r=f.get.hwb(t),n="hwb";break;default:r=f.get.rgb(t),n="rgb"}return r?{model:n,value:r}:null},f.get.rgb=function(t){if(!t)return null;var r,i,n,o=[0,0,0,1];if(r=t.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(n=r[2],r=r[1],i=0;i<3;i++){var c=2*i;o[i]=parseInt(r.slice(c,c+2),16)}n&&(o[3]=parseInt(n,16)/255)}else if(r=t.match(/^#([a-f0-9]{3,4})$/i)){for(n=(r=r[1])[3],i=0;i<3;i++)o[i]=parseInt(r[i]+r[i],16);n&&(o[3]=parseInt(n+n,16)/255)}else if(r=t.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)){for(i=0;i<3;i++)o[i]=parseInt(r[i+1],0);r[4]&&(r[5]?o[3]=.01*parseFloat(r[4]):o[3]=parseFloat(r[4]))}else{if(!(r=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))return(r=t.match(/^(\w+)$/))?"transparent"===r[1]?[0,0,0,0]:l.call(e,r[1])?((o=e[r[1]])[3]=1,o):null:null;for(i=0;i<3;i++)o[i]=Math.round(2.55*parseFloat(r[i+1]));r[4]&&(r[5]?o[3]=.01*parseFloat(r[4]):o[3]=parseFloat(r[4]))}for(i=0;i<3;i++)o[i]=d(o[i],0,255);return o[3]=d(o[3],0,1),o},f.get.hsl=function(t){if(!t)return null;var r=t.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(r){var n=parseFloat(r[4]);return[(parseFloat(r[1])%360+360)%360,d(parseFloat(r[2]),0,100),d(parseFloat(r[3]),0,100),d(isNaN(n)?1:n,0,1)]}return null},f.get.hwb=function(t){if(!t)return null;var r=t.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(r){var n=parseFloat(r[4]);return[(parseFloat(r[1])%360+360)%360,d(parseFloat(r[2]),0,100),d(parseFloat(r[3]),0,100),d(isNaN(n)?1:n,0,1)]}return null},f.to.hex=function(){var t=o(arguments);return"#"+m(t[0])+m(t[1])+m(t[2])+(t[3]<1?m(Math.round(255*t[3])):"")},f.to.rgb=function(){var t=o(arguments);return t.length<4||1===t[3]?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")"},f.to.rgb.percent=function(){var t=o(arguments),r=Math.round(t[0]/255*100),g=Math.round(t[1]/255*100),b=Math.round(t[2]/255*100);return t.length<4||1===t[3]?"rgb("+r+"%, "+g+"%, "+b+"%)":"rgba("+r+"%, "+g+"%, "+b+"%, "+t[3]+")"},f.to.hsl=function(){var t=o(arguments);return t.length<4||1===t[3]?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")"},f.to.hwb=function(){var t=o(arguments),a="";return t.length>=4&&1!==t[3]&&(a=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+a+")"},f.to.keyword=function(t){return c[t.slice(0,3)]}},1029:function(t,r,n){"use strict";var e=n(1030),o=Array.prototype.concat,l=Array.prototype.slice,c=t.exports=function(t){for(var r=[],i=0,n=t.length;i<n;i++){var c=t[i];e(c)?r=o.call(r,l.call(c)):r.push(c)}return r};c.wrap=function(t){return function(){return t(c(arguments))}}},1030:function(t,r){t.exports=function(t){return!(!t||"string"==typeof t)&&(t instanceof Array||Array.isArray(t)||t.length>=0&&(t.splice instanceof Function||Object.getOwnPropertyDescriptor(t,t.length-1)&&"String"!==t.constructor.name))}},1031:function(t,r,n){const e=n(969),o=n(1032),l={};Object.keys(e).forEach((t=>{l[t]={},Object.defineProperty(l[t],"channels",{value:e[t].channels}),Object.defineProperty(l[t],"labels",{value:e[t].labels});const r=o(t);Object.keys(r).forEach((n=>{const e=r[n];l[t][n]=function(t){const r=function(...r){const n=r[0];if(null==n)return n;n.length>1&&(r=n);const e=t(r);if("object"==typeof e)for(let t=e.length,i=0;i<t;i++)e[i]=Math.round(e[i]);return e};return"conversion"in t&&(r.conversion=t.conversion),r}(e),l[t][n].raw=function(t){const r=function(...r){const n=r[0];return null==n?n:(n.length>1&&(r=n),t(r))};return"conversion"in t&&(r.conversion=t.conversion),r}(e)}))})),t.exports=l},1032:function(t,r,n){const e=n(969);function o(t){const r=function(){const t={},r=Object.keys(e);for(let n=r.length,i=0;i<n;i++)t[r[i]]={distance:-1,parent:null};return t}(),n=[t];for(r[t].distance=0;n.length;){const t=n.pop(),o=Object.keys(e[t]);for(let e=o.length,i=0;i<e;i++){const e=o[i],l=r[e];-1===l.distance&&(l.distance=r[t].distance+1,l.parent=t,n.unshift(e))}}return r}function link(t,r){return function(n){return r(t(n))}}function l(t,r){const path=[r[t].parent,t];let n=e[r[t].parent][t],o=r[t].parent;for(;r[o].parent;)path.unshift(r[o].parent),n=link(e[r[o].parent][o],n),o=r[o].parent;return n.conversion=path,n}t.exports=function(t){const r=o(t),n={},e=Object.keys(r);for(let t=e.length,i=0;i<t;i++){const t=e[i];null!==r[t].parent&&(n[t]=l(t,r))}return n}},967:function(t,r,n){const e=n(1028),o=n(1031),l=["keyword","gray","hex"],c={};for(const t of Object.keys(o))c[[...o[t].labels].sort().join("")]=t;const h={};function f(object,t){if(!(this instanceof f))return new f(object,t);if(t&&t in l&&(t=null),t&&!(t in o))throw new Error("Unknown model: "+t);let i,r;if(null==object)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(object instanceof f)this.model=object.model,this.color=[...object.color],this.valpha=object.valpha;else if("string"==typeof object){const t=e.get(object);if(null===t)throw new Error("Unable to parse color from string: "+object);this.model=t.model,r=o[this.model].channels,this.color=t.value.slice(0,r),this.valpha="number"==typeof t.value[r]?t.value[r]:1}else if(object.length>0){this.model=t||"rgb",r=o[this.model].channels;const n=Array.prototype.slice.call(object,0,r);this.color=v(n,r),this.valpha="number"==typeof object[r]?object[r]:1}else if("number"==typeof object)this.model="rgb",this.color=[object>>16&255,object>>8&255,255&object],this.valpha=1;else{this.valpha=1;const t=Object.keys(object);"alpha"in object&&(t.splice(t.indexOf("alpha"),1),this.valpha="number"==typeof object.alpha?object.alpha:0);const r=t.sort().join("");if(!(r in c))throw new Error("Unable to parse color from object: "+JSON.stringify(object));this.model=c[r];const{labels:n}=o[this.model],e=[];for(i=0;i<n.length;i++)e.push(object[n[i]]);this.color=v(e)}if(h[this.model])for(r=o[this.model].channels,i=0;i<r;i++){const t=h[this.model][i];t&&(this.color[i]=t(this.color[i]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}f.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(t){let r=this.model in e.to?this:this.rgb();r=r.round("number"==typeof t?t:1);const n=1===r.valpha?r.color:[...r.color,this.valpha];return e.to[r.model](n)},percentString(t){const r=this.rgb().round("number"==typeof t?t:1),n=1===r.valpha?r.color:[...r.color,this.valpha];return e.to.rgb.percent(n)},array(){return 1===this.valpha?[...this.color]:[...this.color,this.valpha]},object(){const t={},{channels:r}=o[this.model],{labels:n}=o[this.model];for(let i=0;i<r;i++)t[n[i]]=this.color[i];return 1!==this.valpha&&(t.alpha=this.valpha),t},unitArray(){const t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,1!==this.valpha&&t.push(this.valpha),t},unitObject(){const t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,1!==this.valpha&&(t.alpha=this.valpha),t},round(t){return t=Math.max(t||0,0),new f([...this.color.map(d(t)),this.valpha],this.model)},alpha(t){return void 0!==t?new f([...this.color,Math.max(0,Math.min(1,t))],this.model):this.valpha},red:m("rgb",0,y(255)),green:m("rgb",1,y(255)),blue:m("rgb",2,y(255)),hue:m(["hsl","hsv","hsl","hwb","hcg"],0,(t=>(t%360+360)%360)),saturationl:m("hsl",1,y(100)),lightness:m("hsl",2,y(100)),saturationv:m("hsv",1,y(100)),value:m("hsv",2,y(100)),chroma:m("hcg",1,y(100)),gray:m("hcg",2,y(100)),white:m("hwb",1,y(100)),wblack:m("hwb",2,y(100)),cyan:m("cmyk",0,y(100)),magenta:m("cmyk",1,y(100)),yellow:m("cmyk",2,y(100)),black:m("cmyk",3,y(100)),x:m("xyz",0,y(95.047)),y:m("xyz",1,y(100)),z:m("xyz",2,y(108.833)),l:m("lab",0,y(100)),a:m("lab",1),b:m("lab",2),keyword(t){return void 0!==t?new f(t):o[this.model].keyword(this.color)},hex(t){return void 0!==t?new f(t):e.to.hex(this.rgb().round().color)},hexa(t){if(void 0!==t)return new f(t);const r=this.rgb().round().color;let n=Math.round(255*this.valpha).toString(16).toUpperCase();return 1===n.length&&(n="0"+n),e.to.hex(r)+n},rgbNumber(){const t=this.rgb().color;return(255&t[0])<<16|(255&t[1])<<8|255&t[2]},luminosity(){const t=this.rgb().color,r=[];for(const[i,element]of t.entries()){const t=element/255;r[i]=t<=.04045?t/12.92:((t+.055)/1.055)**2.4}return.2126*r[0]+.7152*r[1]+.0722*r[2]},contrast(t){const r=this.luminosity(),n=t.luminosity();return r>n?(r+.05)/(n+.05):(n+.05)/(r+.05)},level(t){const r=this.contrast(t);return r>=7?"AAA":r>=4.5?"AA":""},isDark(){const t=this.rgb().color;return(2126*t[0]+7152*t[1]+722*t[2])/1e4<128},isLight(){return!this.isDark()},negate(){const t=this.rgb();for(let i=0;i<3;i++)t.color[i]=255-t.color[i];return t},lighten(t){const r=this.hsl();return r.color[2]+=r.color[2]*t,r},darken(t){const r=this.hsl();return r.color[2]-=r.color[2]*t,r},saturate(t){const r=this.hsl();return r.color[1]+=r.color[1]*t,r},desaturate(t){const r=this.hsl();return r.color[1]-=r.color[1]*t,r},whiten(t){const r=this.hwb();return r.color[1]+=r.color[1]*t,r},blacken(t){const r=this.hwb();return r.color[2]+=r.color[2]*t,r},grayscale(){const t=this.rgb().color,r=.3*t[0]+.59*t[1]+.11*t[2];return f.rgb(r,r,r)},fade(t){return this.alpha(this.valpha-this.valpha*t)},opaquer(t){return this.alpha(this.valpha+this.valpha*t)},rotate(t){const r=this.hsl();let n=r.color[0];return n=(n+t)%360,n=n<0?360+n:n,r.color[0]=n,r},mix(t,r){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof t);const n=t.rgb(),e=this.rgb(),p=void 0===r?.5:r,o=2*p-1,a=n.alpha()-e.alpha(),l=((o*a==-1?o:(o+a)/(1+o*a))+1)/2,c=1-l;return f.rgb(l*n.red()+c*e.red(),l*n.green()+c*e.green(),l*n.blue()+c*e.blue(),n.alpha()*p+e.alpha()*(1-p))}};for(const t of Object.keys(o)){if(l.includes(t))continue;const{channels:r}=o[t];f.prototype[t]=function(...r){return this.model===t?new f(this):r.length>0?new f(r,t):new f([...(n=o[this.model][t].raw(this.color),Array.isArray(n)?n:[n]),this.valpha],t);var n},f[t]=function(...n){let e=n[0];return"number"==typeof e&&(e=v(n,r)),new f(e,t)}}function d(t){return function(r){return function(t,r){return Number(t.toFixed(r))}(r,t)}}function m(t,r,n){t=Array.isArray(t)?t:[t];for(const e of t)(h[e]||(h[e]=[]))[r]=n;return t=t[0],function(e){let o;return void 0!==e?(n&&(e=n(e)),o=this[t](),o.color[r]=e,o):(o=this[t]().color[r],n&&(o=n(o)),o)}}function y(t){return function(r){return Math.max(0,Math.min(t,r))}}function v(t,r){for(let i=0;i<r;i++)"number"!=typeof t[i]&&(t[i]=0);return t}t.exports=f},968:function(t,r,n){"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},969:function(t,r,n){const e=n(968),o={};for(const t of Object.keys(e))o[e[t]]=t;const l={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};t.exports=l;for(const t of Object.keys(l)){if(!("channels"in l[t]))throw new Error("missing channels property: "+t);if(!("labels"in l[t]))throw new Error("missing channel labels property: "+t);if(l[t].labels.length!==l[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:r,labels:n}=l[t];delete l[t].channels,delete l[t].labels,Object.defineProperty(l[t],"channels",{value:r}),Object.defineProperty(l[t],"labels",{value:n})}l.rgb.hsl=function(t){const r=t[0]/255,g=t[1]/255,b=t[2]/255,n=Math.min(r,g,b),e=Math.max(r,g,b),o=e-n;let l,s;e===n?l=0:r===e?l=(g-b)/o:g===e?l=2+(b-r)/o:b===e&&(l=4+(r-g)/o),l=Math.min(60*l,360),l<0&&(l+=360);const c=(n+e)/2;return s=e===n?0:c<=.5?o/(e+n):o/(2-e-n),[l,100*s,100*c]},l.rgb.hsv=function(t){let r,n,e,o,s;const l=t[0]/255,g=t[1]/255,b=t[2]/255,c=Math.max(l,g,b),h=c-Math.min(l,g,b),f=function(t){return(c-t)/6/h+.5};return 0===h?(o=0,s=0):(s=h/c,r=f(l),n=f(g),e=f(b),l===c?o=e-n:g===c?o=1/3+r-e:b===c&&(o=2/3+n-r),o<0?o+=1:o>1&&(o-=1)),[360*o,100*s,100*c]},l.rgb.hwb=function(t){const r=t[0],g=t[1];let b=t[2];const n=l.rgb.hsl(t)[0],e=1/255*Math.min(r,Math.min(g,b));return b=1-1/255*Math.max(r,Math.max(g,b)),[n,100*e,100*b]},l.rgb.cmyk=function(t){const r=t[0]/255,g=t[1]/255,b=t[2]/255,n=Math.min(1-r,1-g,1-b);return[100*((1-r-n)/(1-n)||0),100*((1-g-n)/(1-n)||0),100*((1-b-n)/(1-n)||0),100*n]},l.rgb.keyword=function(t){const r=o[t];if(r)return r;let n,l=1/0;for(const r of Object.keys(e)){const o=e[r],f=(h=o,((c=t)[0]-h[0])**2+(c[1]-h[1])**2+(c[2]-h[2])**2);f<l&&(l=f,n=r)}var c,h;return n},l.keyword.rgb=function(t){return e[t]},l.rgb.xyz=function(t){let r=t[0]/255,g=t[1]/255,b=t[2]/255;r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,g=g>.04045?((g+.055)/1.055)**2.4:g/12.92,b=b>.04045?((b+.055)/1.055)**2.4:b/12.92;return[100*(.4124*r+.3576*g+.1805*b),100*(.2126*r+.7152*g+.0722*b),100*(.0193*r+.1192*g+.9505*b)]},l.rgb.lab=function(t){const r=l.rgb.xyz(t);let n=r[0],e=r[1],o=r[2];n/=95.047,e/=100,o/=108.883,n=n>.008856?n**(1/3):7.787*n+16/116,e=e>.008856?e**(1/3):7.787*e+16/116,o=o>.008856?o**(1/3):7.787*o+16/116;return[116*e-16,500*(n-e),200*(e-o)]},l.hsl.rgb=function(t){const r=t[0]/360,s=t[1]/100,n=t[2]/100;let e,o,l;if(0===s)return l=255*n,[l,l,l];e=n<.5?n*(1+s):n+s-n*s;const c=2*n-e,h=[0,0,0];for(let i=0;i<3;i++)o=r+1/3*-(i-1),o<0&&o++,o>1&&o--,l=6*o<1?c+6*(e-c)*o:2*o<1?e:3*o<2?c+(e-c)*(2/3-o)*6:c,h[i]=255*l;return h},l.hsl.hsv=function(t){const r=t[0];let s=t[1]/100,n=t[2]/100,e=s;const o=Math.max(n,.01);n*=2,s*=n<=1?n:2-n,e*=o<=1?o:2-o;return[r,100*(0===n?2*e/(o+e):2*s/(n+s)),100*((n+s)/2)]},l.hsv.rgb=function(t){const r=t[0]/60,s=t[1]/100;let n=t[2]/100;const e=Math.floor(r)%6,o=r-Math.floor(r),p=255*n*(1-s),q=255*n*(1-s*o),l=255*n*(1-s*(1-o));switch(n*=255,e){case 0:return[n,l,p];case 1:return[q,n,p];case 2:return[p,n,l];case 3:return[p,q,n];case 4:return[l,p,n];case 5:return[n,p,q]}},l.hsv.hsl=function(t){const r=t[0],s=t[1]/100,n=t[2]/100,e=Math.max(n,.01);let o,l;l=(2-s)*n;const c=(2-s)*e;return o=s*e,o/=c<=1?c:2-c,o=o||0,l/=2,[r,100*o,100*l]},l.hwb.rgb=function(t){const r=t[0]/360;let n=t[1]/100,e=t[2]/100;const o=n+e;let l;o>1&&(n/=o,e/=o);const i=Math.floor(6*r),c=1-e;l=6*r-i,0!=(1&i)&&(l=1-l);const h=n+l*(c-n);let f,g,b;switch(i){default:case 6:case 0:f=c,g=h,b=n;break;case 1:f=h,g=c,b=n;break;case 2:f=n,g=c,b=h;break;case 3:f=n,g=h,b=c;break;case 4:f=h,g=n,b=c;break;case 5:f=c,g=n,b=h}return[255*f,255*g,255*b]},l.cmyk.rgb=function(t){const r=t[0]/100,n=t[1]/100,e=t[2]/100,o=t[3]/100;return[255*(1-Math.min(1,r*(1-o)+o)),255*(1-Math.min(1,n*(1-o)+o)),255*(1-Math.min(1,e*(1-o)+o))]},l.xyz.rgb=function(t){const r=t[0]/100,n=t[1]/100,e=t[2]/100;let o,g,b;return o=3.2406*r+-1.5372*n+-.4986*e,g=-.9689*r+1.8758*n+.0415*e,b=.0557*r+-.204*n+1.057*e,o=o>.0031308?1.055*o**(1/2.4)-.055:12.92*o,g=g>.0031308?1.055*g**(1/2.4)-.055:12.92*g,b=b>.0031308?1.055*b**(1/2.4)-.055:12.92*b,o=Math.min(Math.max(0,o),1),g=Math.min(Math.max(0,g),1),b=Math.min(Math.max(0,b),1),[255*o,255*g,255*b]},l.xyz.lab=function(t){let r=t[0],n=t[1],e=t[2];r/=95.047,n/=100,e/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,e=e>.008856?e**(1/3):7.787*e+16/116;return[116*n-16,500*(r-n),200*(n-e)]},l.lab.xyz=function(t){let r,n,e;n=(t[0]+16)/116,r=t[1]/500+n,e=n-t[2]/200;const o=n**3,l=r**3,c=e**3;return n=o>.008856?o:(n-16/116)/7.787,r=l>.008856?l:(r-16/116)/7.787,e=c>.008856?c:(e-16/116)/7.787,r*=95.047,n*=100,e*=108.883,[r,n,e]},l.lab.lch=function(t){const r=t[0],a=t[1],b=t[2];let n;n=360*Math.atan2(b,a)/2/Math.PI,n<0&&(n+=360);return[r,Math.sqrt(a*a+b*b),n]},l.lch.lab=function(t){const r=t[0],n=t[1],hr=t[2]/360*2*Math.PI;return[r,n*Math.cos(hr),n*Math.sin(hr)]},l.rgb.ansi16=function(t,r=null){const[n,g,b]=t;let e=null===r?l.rgb.hsv(t)[2]:r;if(e=Math.round(e/50),0===e)return 30;let o=30+(Math.round(b/255)<<2|Math.round(g/255)<<1|Math.round(n/255));return 2===e&&(o+=60),o},l.hsv.ansi16=function(t){return l.rgb.ansi16(l.hsv.rgb(t),t[2])},l.rgb.ansi256=function(t){const r=t[0],g=t[1],b=t[2];if(r===g&&g===b)return r<8?16:r>248?231:Math.round((r-8)/247*24)+232;return 16+36*Math.round(r/255*5)+6*Math.round(g/255*5)+Math.round(b/255*5)},l.ansi16.rgb=function(t){let r=t%10;if(0===r||7===r)return t>50&&(r+=3.5),r=r/10.5*255,[r,r,r];const n=.5*(1+~~(t>50));return[(1&r)*n*255,(r>>1&1)*n*255,(r>>2&1)*n*255]},l.ansi256.rgb=function(t){if(t>=232){const r=10*(t-232)+8;return[r,r,r]}let r;t-=16;return[Math.floor(t/36)/5*255,Math.floor((r=t%36)/6)/5*255,r%6/5*255]},l.rgb.hex=function(t){const r=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(r.length)+r},l.hex.rgb=function(t){const r=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!r)return[0,0,0];let n=r[0];3===r[0].length&&(n=n.split("").map((t=>t+t)).join(""));const e=parseInt(n,16);return[e>>16&255,e>>8&255,255&e]},l.rgb.hcg=function(t){const r=t[0]/255,g=t[1]/255,b=t[2]/255,n=Math.max(Math.max(r,g),b),e=Math.min(Math.min(r,g),b),o=n-e;let l,c;return l=o<1?e/(1-o):0,c=o<=0?0:n===r?(g-b)/o%6:n===g?2+(b-r)/o:4+(r-g)/o,c/=6,c%=1,[360*c,100*o,100*l]},l.hsl.hcg=function(t){const s=t[1]/100,r=t[2]/100,n=r<.5?2*s*r:2*s*(1-r);let e=0;return n<1&&(e=(r-.5*n)/(1-n)),[t[0],100*n,100*e]},l.hsv.hcg=function(t){const s=t[1]/100,r=t[2]/100,n=s*r;let e=0;return n<1&&(e=(r-n)/(1-n)),[t[0],100*n,100*e]},l.hcg.rgb=function(t){const r=t[0]/360,n=t[1]/100,g=t[2]/100;if(0===n)return[255*g,255*g,255*g];const e=[0,0,0],o=r%1*6,l=o%1,c=1-l;let h=0;switch(Math.floor(o)){case 0:e[0]=1,e[1]=l,e[2]=0;break;case 1:e[0]=c,e[1]=1,e[2]=0;break;case 2:e[0]=0,e[1]=1,e[2]=l;break;case 3:e[0]=0,e[1]=c,e[2]=1;break;case 4:e[0]=l,e[1]=0,e[2]=1;break;default:e[0]=1,e[1]=0,e[2]=c}return h=(1-n)*g,[255*(n*e[0]+h),255*(n*e[1]+h),255*(n*e[2]+h)]},l.hcg.hsv=function(t){const r=t[1]/100,n=r+t[2]/100*(1-r);let e=0;return n>0&&(e=r/n),[t[0],100*e,100*n]},l.hcg.hsl=function(t){const r=t[1]/100,n=t[2]/100*(1-r)+.5*r;let s=0;return n>0&&n<.5?s=r/(2*n):n>=.5&&n<1&&(s=r/(2*(1-n))),[t[0],100*s,100*n]},l.hcg.hwb=function(t){const r=t[1]/100,n=r+t[2]/100*(1-r);return[t[0],100*(n-r),100*(1-n)]},l.hwb.hcg=function(t){const r=t[1]/100,n=1-t[2]/100,e=n-r;let g=0;return e<1&&(g=(n-e)/(1-e)),[t[0],100*e,100*g]},l.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},l.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},l.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},l.gray.hsl=function(t){return[0,0,t[0]]},l.gray.hsv=l.gray.hsl,l.gray.hwb=function(t){return[0,100,t[0]]},l.gray.cmyk=function(t){return[0,0,0,t[0]]},l.gray.lab=function(t){return[t[0],0,0]},l.gray.hex=function(t){const r=255&Math.round(t[0]/100*255),n=((r<<16)+(r<<8)+r).toString(16).toUpperCase();return"000000".substring(n.length)+n},l.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}}}]);
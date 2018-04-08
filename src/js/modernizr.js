/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csstransforms-cssvhunit-mediaqueries-requestanimationframe-setclasses !*/
 !function(e,n,t){function r(e,n){return typeof e===n}function i(){var e,n,t,i,o,s,a;for(var l in x)if(x.hasOwnProperty(l)){if(e=[],n=x[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(i=r(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)s=e[o],a=s.split("."),1===a.length?Modernizr[a[0]]=i:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=i),S.push((i?"":"no-")+a.join("-"))}}function o(e){var n=w.className,t=Modernizr._config.classPrefix||"";if(b&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),b?w.className.baseVal=n:w.className=n)}function s(n,t,r){var i;if("getComputedStyle"in e){i=getComputedStyle.call(e,n,t);var o=e.console;if(null!==i)r&&(i=i.getPropertyValue(r));else if(o){var s=o.error?"error":"log";o[s].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else i=!t&&n.currentStyle&&n.currentStyle[r];return i}function a(e,n){return e-1===n||e===n||e+1===n}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):b?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function u(){var e=n.body;return e||(e=l(b?"svg":"body"),e.fake=!0),e}function f(e,t,r,i){var o,s,a,f,d="modernizr",c=l("div"),p=u();if(parseInt(r,10))for(;r--;)a=l("div"),a.id=i?i[r]:d+(r+1),c.appendChild(a);return o=l("style"),o.type="text/css",o.id="s"+d,(p.fake?p:c).appendChild(o),p.appendChild(c),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(n.createTextNode(e)),c.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",f=w.style.overflow,w.style.overflow="hidden",w.appendChild(p)),s=t(c,e),p.fake?(p.parentNode.removeChild(p),w.style.overflow=f,w.offsetHeight):c.parentNode.removeChild(c),!!s}function d(e,n){return!!~(""+e).indexOf(n)}function c(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function p(e,n){return function(){return e.apply(n,arguments)}}function m(e,n,t){var i;for(var o in e)if(e[o]in n)return t===!1?e[o]:(i=n[e[o]],r(i,"function")?p(i,t||n):i);return!1}function v(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function h(n,r){var i=n.length;if("CSS"in e&&"supports"in e.CSS){for(;i--;)if(e.CSS.supports(v(n[i]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];i--;)o.push("("+v(n[i])+":"+r+")");return o=o.join(" or "),f("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==s(e,null,"position")})}return t}function g(e,n,i,o){function s(){u&&(delete N.style,delete N.modElem)}if(o=r(o,"undefined")?!1:o,!r(i,"undefined")){var a=h(e,i);if(!r(a,"undefined"))return a}for(var u,f,p,m,v,g=["modernizr","tspan","samp"];!N.style&&g.length;)u=!0,N.modElem=l(g.shift()),N.style=N.modElem.style;for(p=e.length,f=0;p>f;f++)if(m=e[f],v=N.style[m],d(m,"-")&&(m=c(m)),N.style[m]!==t){if(o||r(i,"undefined"))return s(),"pfx"==n?m:!0;try{N.style[m]=i}catch(y){}if(N.style[m]!=v)return s(),"pfx"==n?m:!0}return s(),!1}function y(e,n,t,i,o){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+T.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?g(a,n,i,o):(a=(e+" "+q.join(s+" ")+s).split(" "),m(a,n,t))}function C(e,n,r){return y(e,t,t,n,r)}var S=[],x=[],_={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){x.push({name:e,fn:n,options:t})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=_,Modernizr=new Modernizr;var w=n.documentElement,b="svg"===w.nodeName.toLowerCase(),z=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return f("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();_.mq=z,Modernizr.addTest("mediaqueries",z("only all"));var E=_.testStyles=f;E("#modernizr { height: 50vh; }",function(n){var t=parseInt(e.innerHeight/2,10),r=parseInt(s(n,null,"height"),10);Modernizr.addTest("cssvhunit",a(r,t))});var P="Moz O ms Webkit",T=_._config.usePrefixes?P.split(" "):[];_._cssomPrefixes=T;var q=_._config.usePrefixes?P.toLowerCase().split(" "):[];_._domPrefixes=q;var A={elem:l("modernizr")};Modernizr._q.push(function(){delete A.elem});var N={style:A.elem.style};Modernizr._q.unshift(function(){delete N.style}),_.testAllProps=y,_.testAllProps=C,Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&C("transform","scale(1)",!0)});var j=function(n){var r,i=prefixes.length,o=e.CSSRule;if("undefined"==typeof o)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+n;for(var s=0;i>s;s++){var a=prefixes[s],l=a.toUpperCase()+"_"+r;if(l in o)return"@-"+a.toLowerCase()+"-"+n}return!1};_.atRule=j;var L=_.prefixed=function(e,n,t){return 0===e.indexOf("@")?j(e):(-1!=e.indexOf("-")&&(e=c(e)),n?y(e,n,t):y(e,"pfx"))};Modernizr.addTest("requestanimationframe",!!L("requestAnimationFrame",e),{aliases:["raf"]}),i(),o(S),delete _.addTest,delete _.addAsyncTest;for(var O=0;O<Modernizr._q.length;O++)Modernizr._q[O]();e.Modernizr=Modernizr}(window,document);
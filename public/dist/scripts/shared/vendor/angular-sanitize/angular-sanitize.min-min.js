!function(e,t,r){"use strict";function n(e){var r=[];return l(r,t.noop).chars(e),r.join("")}function a(e,r){var n,a={},i=e.split(",");for(n=0;n<i.length;n++)a[r?t.lowercase(i[n]):i[n]]=!0;return a}function i(e,r){function n(e,n){var a,i=0;if(n=t.lowercase(n))for(i=l.length-1;0<=i&&l[i]!=n;i--);if(0<=i){for(a=l.length-1;a>=i;a--)r.end&&r.end(l[a]);l.length=i}}"string"!=typeof e&&(e=null===e||void 0===e?"":""+e);var a,i,o,l=[],b=e;for(l.last=function(){return l[l.length-1]};e;){if(o="",i=!0,l.last()&&$[l.last()]?(e=e.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*"+l.last()+"[^>]*>","i"),function(e,t){return t=t.replace(f,"$1").replace(x,"$1"),r.chars&&r.chars(s(t)),""}),n(0,l.last())):(0===e.indexOf("\x3c!--")?0<=(a=e.indexOf("--",4))&&e.lastIndexOf("--\x3e",a)===a&&(r.comment&&r.comment(e.substring(4,a)),e=e.substring(a+3),i=!1):m.test(e)?(a=e.match(m))&&(e=e.replace(a[0],""),i=!1):g.test(e)?(a=e.match(h))&&(e=e.substring(a[0].length),a[0].replace(h,n),i=!1):d.test(e)&&((a=e.match(u))?(a[4]&&(e=e.substring(a[0].length),a[0].replace(u,function(e,a,i,o){if(a=t.lowercase(a),w[a])for(;l.last()&&z[l.last()];)n(0,l.last());y[a]&&l.last()==a&&n(0,a),(o=v[a]||!!o)||l.push(a);var c={};i.replace(p,function(e,t,r,n,a){c[t]=s(r||n||a||"")}),r.start&&r.start(a,c,o)})),i=!1):(o+="<",e=e.substring(1))),i&&(a=e.indexOf("<"),o+=0>a?e:e.substring(0,a),e=0>a?"":e.substring(a),r.chars&&r.chars(s(o)))),e==b)throw c("badparse",e);b=e}n()}function s(e){return e?(E.innerHTML=e.replace(/</g,"&lt;"),E.textContent):""}function o(e){return e.replace(/&/g,"&amp;").replace(b,function(e){var t=e.charCodeAt(0);return e=e.charCodeAt(1),"&#"+(1024*(t-55296)+(e-56320)+65536)+";"}).replace(k,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function l(e,r){var n=!1,a=t.bind(e,e.push);return{start:function(e,i,s){e=t.lowercase(e),!n&&$[e]&&(n=e),n||!0!==A[e]||(a("<"),a(e),t.forEach(i,function(n,i){var s=t.lowercase(i),l="img"===e&&"src"===s||"background"===s;!0!==D[s]||!0===C[s]&&!r(n,l)||(a(" "),a(i),a('="'),a(o(n)),a('"'))}),a(s?"/>":">"))},end:function(e){e=t.lowercase(e),n||!0!==A[e]||(a("</"),a(e),a(">")),e==n&&(n=!1)},chars:function(e){n||a(o(e))}}}var c=t.$$minErr("$sanitize"),u=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,h=/^<\/\s*([\w:-]+)[^>]*>/,p=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,d=/^</,g=/^<\//,f=/\x3c!--(.*?)--\x3e/g,m=/<!DOCTYPE([^>]*?)>/i,x=/<!\[CDATA\[(.*?)]]\x3e/g,b=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,k=/([^\#-~| |!])/g,v=a("area,br,col,hr,img,wbr");e=a("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),r=a("rp,rt");var y=t.extend({},r,e),w=t.extend({},e,a("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),z=t.extend({},r,a("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));e=a("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use");var $=a("script,style"),A=t.extend({},v,w,z,y,e),C=a("background,cite,href,longdesc,src,usemap,xlink:href");e=a("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),r=a("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",!0);var D=t.extend({},C,r,e),E=document.createElement("pre");t.module("ngSanitize",[]).provider("$sanitize",function(){this.$get=["$$sanitizeUri",function(e){return function(t){var r=[];return i(t,l(r,function(t,r){return!/^unsafe/.test(e(t,r))})),r.join("")}}]}),t.module("ngSanitize").filter("linky",["$sanitize",function(e){var r=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,a=/^mailto:/i;return function(i,s){function o(e){e&&p.push(n(e))}if(!i)return i;for(var l,c,u,h=i,p=[];l=h.match(r);)c=l[0],l[2]||l[4]||(c=(l[3]?"http://":"mailto:")+c),u=l.index,o(h.substr(0,u)),function(e,r){p.push("<a "),t.isDefined(s)&&p.push('target="',s,'" '),p.push('href="',e.replace(/"/g,"&quot;"),'">'),o(r),p.push("</a>")}(c,l[0].replace(a,"")),h=h.substring(u+l[0].length);return o(h),e(p.join(""))}}])}(window,window.angular);
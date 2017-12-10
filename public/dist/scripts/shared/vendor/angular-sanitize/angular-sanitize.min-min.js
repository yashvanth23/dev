!function(e,t,r){"use strict";function n(e,r){var n,a={},i=e.split(",");for(n=0;n<i.length;n++)a[r?t.lowercase(i[n]):i[n]]=!0;return a}function a(e){return e?(C.innerHTML=e.replace(/</g,"&lt;"),C.textContent):""}function i(e){return e.replace(/&/g,"&amp;").replace(m,function(e){var t=e.charCodeAt(0);return e=e.charCodeAt(1),"&#"+(1024*(t-55296)+(e-56320)+65536)+";"}).replace(x,function(e){return"&#"+e.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(e,r){var n=!1,a=t.bind(e,e.push);return{start:function(e,s,o){e=t.lowercase(e),!n&&w[e]&&(n=e),n||!0!==z[e]||(a("<"),a(e),t.forEach(s,function(n,s){var o=t.lowercase(s),l="img"===e&&"src"===o||"background"===o;!0!==A[o]||!0===$[o]&&!r(n,l)||(a(" "),a(s),a('="'),a(i(n)),a('"'))}),a(o?"/>":">"))},end:function(e){e=t.lowercase(e),n||!0!==z[e]||(a("</"),a(e),a(">")),e==n&&(n=!1)},chars:function(e){n||a(i(e))}}}var o=t.$$minErr("$sanitize"),l=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,c=/^<\/\s*([\w:-]+)[^>]*>/,u=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,h=/^</,p=/^<\//,d=/\x3c!--(.*?)--\x3e/g,g=/<!DOCTYPE([^>]*?)>/i,f=/<!\[CDATA\[(.*?)]]\x3e/g,m=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,x=/([^\#-~| |!])/g,b=n("area,br,col,hr,img,wbr");e=n("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),r=n("rp,rt");var k=t.extend({},r,e),v=t.extend({},e,n("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),y=t.extend({},r,n("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"));e=n("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use");var w=n("script,style"),z=t.extend({},b,v,y,k,e),$=n("background,cite,href,longdesc,src,usemap,xlink:href");e=n("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),r=n("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",!0);var A=t.extend({},$,r,e),C=document.createElement("pre");t.module("ngSanitize",[]).provider("$sanitize",function(){this.$get=["$$sanitizeUri",function(e){return function(r){var n=[];return function(e,r){function n(e,n,s,o){if(n=t.lowercase(n),v[n])for(;z.last()&&y[z.last()];)i(0,z.last());k[n]&&z.last()==n&&i(0,n),(o=b[n]||!!o)||z.push(n);var l={};s.replace(u,function(e,t,r,n,i){l[t]=a(r||n||i||"")}),r.start&&r.start(n,l,o)}function i(e,n){var a,i=0;if(n=t.lowercase(n))for(i=z.length-1;0<=i&&z[i]!=n;i--);if(0<=i){for(a=z.length-1;a>=i;a--)r.end&&r.end(z[a]);z.length=i}}"string"!=typeof e&&(e=null===e||void 0===e?"":""+e);var s,m,x,z=[],$=e;for(z.last=function(){return z[z.length-1]};e;){if(x="",m=!0,z.last()&&w[z.last()]?(e=e.replace(new RegExp("([\\W\\w]*)<\\s*\\/\\s*"+z.last()+"[^>]*>","i"),function(e,t){return t=t.replace(d,"$1").replace(f,"$1"),r.chars&&r.chars(a(t)),""}),i(0,z.last())):(0===e.indexOf("\x3c!--")?0<=(s=e.indexOf("--",4))&&e.lastIndexOf("--\x3e",s)===s&&(r.comment&&r.comment(e.substring(4,s)),e=e.substring(s+3),m=!1):g.test(e)?(s=e.match(g))&&(e=e.replace(s[0],""),m=!1):p.test(e)?(s=e.match(c))&&(e=e.substring(s[0].length),s[0].replace(c,i),m=!1):h.test(e)&&((s=e.match(l))?(s[4]&&(e=e.substring(s[0].length),s[0].replace(l,n)),m=!1):(x+="<",e=e.substring(1))),m&&(s=e.indexOf("<"),x+=0>s?e:e.substring(0,s),e=0>s?"":e.substring(s),r.chars&&r.chars(a(x)))),e==$)throw o("badparse",e);$=e}i()}(r,s(n,function(t,r){return!/^unsafe/.test(e(t,r))})),n.join("")}}]}),t.module("ngSanitize").filter("linky",["$sanitize",function(e){var r=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,n=/^mailto:/i;return function(a,i){function o(e){e&&d.push(function(e){var r=[];return s(r,t.noop).chars(e),r.join("")}(e))}function l(e,r){d.push("<a "),t.isDefined(i)&&d.push('target="',i,'" '),d.push('href="',e.replace(/"/g,"&quot;"),'">'),o(r),d.push("</a>")}if(!a)return a;for(var c,u,h,p=a,d=[];c=p.match(r);)u=c[0],c[2]||c[4]||(u=(c[3]?"http://":"mailto:")+u),h=c.index,o(p.substr(0,h)),l(u,c[0].replace(n,"")),p=p.substring(h+c[0].length);return o(p),e(d.join(""))}}])}(window,window.angular);
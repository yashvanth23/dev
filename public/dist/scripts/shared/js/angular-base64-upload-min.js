!function(e,n){"use strict";e._arrayBufferToBase64=function(n){for(var t="",i=new Uint8Array(n),a=i.byteLength,r=0;r<a;r+=1)t+=String.fromCharCode(i[r]);return e.btoa(t)};e.angular.module("naif.base64",[]).directive("baseSixtyFourInput",["$window","$q",function(e,t){var i={onChange:"&",onAfterValidate:"&",parser:"&"},a=["onabort","onerror","onloadstart","onloadend","onprogress","onload"];return a.forEach(function(e){i[e]="&"}),{restrict:"A",require:"ngModel",scope:i,link:function(i,r,o,l){function f(){var e=o.multiple?p:p[0];l.$setViewValue(e),function(e){var n=!0;if(o.maxsize&&e){var t=1e3*parseFloat(o.maxsize);if(o.multiple){for(var i=0;i<e.length;i++)if(e[i].filesize>t){n=!1;break}}else n=e.filesize<=t;l.$setValidity("maxsize",n)}}(e),function(e){var n=!0,t=1e3*parseFloat(o.minsize);if(o.minsize&&e){if(o.multiple){for(var i=0;i<e.length;i++)if(e[i].filesize<t){n=!1;break}}else n=e.filesize>=t;l.$setValidity("minsize",n)}}(e),function(e){if(o.maxnum&&o.multiple&&e){var n=e.length<=parseInt(o.maxnum);l.$setValidity("maxnum",n)}}(e),function(e){if(o.minnum&&o.multiple&&e){var n=e.length>=parseInt(o.minnum);l.$setValidity("minnum",n)}}(e),function(e){var n,t,i,a=!0;if(o.accept&&(t=o.accept.trim().replace(/[,\s]+/gi,"|").replace(/\./g,"\\.").replace(/\/\*/g,"/.*"),n=new RegExp(t)),o.accept&&e){if(o.multiple)for(var r=0;r<e.length;r++){var f=e[r];if(i="."+f.filename.split(".").pop(),!(a=n.test(f.filetype)||n.test(i)))break}else i="."+e.filename.split(".").pop(),a=n.test(e.filetype)||n.test(i);l.$setValidity("accept",a)}}(e)}function s(e,n,t,i,a){t[e]=function(e){n()(e,t,i,c,p,a)}}function u(r,l,f){for(var u=a.length-1;u>=0;u--){var d=a[u];o[d]&&"onload"!==d&&s(d,i[d],r,l,f)}r.onload=function(a,r,l){if("image"==l.filetype.split("/")[0])return function(f){var s=f.target.result,u=o.maxsize&&r.size>1024*o.maxsize;l.base64=null,o.doNotParseIfOversize!==n&&u?l.base64=null:l.base64=e._arrayBufferToBase64(s),(o.parser?t.when(i.parser()(r,l)):t.when(l)).then(function(e){p.push(e),r.deferredObj.resolve()}),o.onload&&(i.onload&&"function"==typeof i.onload()?i.onload()(f,a,r,c,p,l):i.onload(f,c))};o.onload&&i.onload&&"function"==typeof i.onload()&&i.onload()("unsupported")}(r,l,f)}var c=[],p=[];l&&(l.$isEmpty=function(e){return!e||(angular.isArray(e)?0===e.length:!e.base64)},i._clearInput=function(){r[0].value=""},i.$watch(function(){return l.$viewValue},function(e){l.$isEmpty(e)&&l.$dirty&&(i._clearInput(),l.$setValidity("maxnum",!0),l.$setValidity("minnum",!0),l.$setValidity("maxsize",!0),l.$setValidity("minsize",!0),l.$setValidity("accept",!0))}),r.on("change",function(n){p=[],p=angular.copy(p),0===n.target.files.length?(c=[],f()):(c=n.target.files,function(){var n,i=[];for(n=c.length-1;n>=0;n--)c[n].deferredObj=t.defer(),i.push(c[n].deferredObj.promise);for(t.all(i).then(f),n=c.length-1;n>=0;n--){var a=new e.FileReader,r=c[n],o={};o.filetype=r.type,o.filename=r.name,o.filesize=r.size,u(a,r,o),a.readAsArrayBuffer(r)}}(),function(e){o.onChange&&(i.onChange&&"function"==typeof i.onChange()?i.onChange()(e,c):i.onChange(e,c))}(n),function(e){if(o.onAfterValidate){for(var n=[],a=c.length-1;a>=0;a--)n.push(c[a].deferredObj.promise);t.all(n).then(function(){i.onAfterValidate&&"function"==typeof i.onAfterValidate()?i.onAfterValidate()(e,p,c):i.onAfterValidate(e,p,c)})}}(n)),i._clearInput()}))}}}])}(window);
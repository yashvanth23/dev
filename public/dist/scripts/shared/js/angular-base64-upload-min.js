!function(e,n){"use strict";e._arrayBufferToBase64=function(n){for(var t="",i=new Uint8Array(n),a=i.byteLength,r=0;r<a;r+=1)t+=String.fromCharCode(i[r]);return e.btoa(t)},e.angular.module("naif.base64",[]).directive("baseSixtyFourInput",["$window","$q",function(e,t){var i={onChange:"&",onAfterValidate:"&",parser:"&"},a=["onabort","onerror","onloadstart","onloadend","onprogress","onload"];return a.forEach(function(e){i[e]="&"}),{restrict:"A",require:"ngModel",scope:i,link:function(i,r,o,l){function f(e){if(o.maxnum&&o.multiple&&e){var n=e.length<=parseInt(o.maxnum);l.$setValidity("maxnum",n)}return e}function u(e){if(o.minnum&&o.multiple&&e){var n=e.length>=parseInt(o.minnum);l.$setValidity("minnum",n)}return e}function s(e){var n=!0;if(o.maxsize&&e){var t=1e3*parseFloat(o.maxsize);if(o.multiple){for(var i=0;i<e.length;i++)if(e[i].filesize>t){n=!1;break}}else n=e.filesize<=t;l.$setValidity("maxsize",n)}return e}function c(e){var n=!0,t=1e3*parseFloat(o.minsize);if(o.minsize&&e){if(o.multiple){for(var i=0;i<e.length;i++)if(e[i].filesize<t){n=!1;break}}else n=e.filesize>=t;l.$setValidity("minsize",n)}return e}function p(e){var n,t,i,a=!0;if(o.accept&&(t=o.accept.trim().replace(/[,\s]+/gi,"|").replace(/\./g,"\\.").replace(/\/\*/g,"/.*"),n=new RegExp(t)),o.accept&&e){if(o.multiple)for(var r=0;r<e.length;r++){var f=e[r];if(i="."+f.filename.split(".").pop(),!(a=n.test(f.filetype)||n.test(i)))break}else i="."+e.filename.split(".").pop(),a=n.test(e.filetype)||n.test(i);l.$setValidity("accept",a)}return e}function d(){var e=o.multiple?$:$[0];l.$setViewValue(e),s(e),c(e),f(e),u(e),p(e)}function m(e,n,t,i,a){t[e]=function(e){n()(e,t,i,z,$,a)}}function g(a,r,l){if("image"==l.filetype.split("/")[0])return function(f){var u=f.target.result,s=o.maxsize&&r.size>1024*o.maxsize;l.base64=null,o.doNotParseIfOversize!==n&&s?l.base64=null:l.base64=e._arrayBufferToBase64(u),(o.parser?t.when(i.parser()(r,l)):t.when(l)).then(function(e){$.push(e),r.deferredObj.resolve()}),o.onload&&(i.onload&&"function"==typeof i.onload()?i.onload()(f,a,r,z,$,l):i.onload(f,z))};o.onload&&i.onload&&"function"==typeof i.onload()&&i.onload()("unsupported")}function h(e,n,t){for(var r=a.length-1;r>=0;r--){var l=a[r];o[l]&&"onload"!==l&&m(l,i[l],e,n,t)}e.onload=g(e,n,t)}function y(){var n,i=[];for(n=z.length-1;n>=0;n--)z[n].deferredObj=t.defer(),i.push(z[n].deferredObj.promise);for(t.all(i).then(d),n=z.length-1;n>=0;n--){var a=new e.FileReader,r=z[n],o={};o.filetype=r.type,o.filename=r.name,o.filesize=r.size,h(a,r,o),a.readAsArrayBuffer(r)}}function v(e){o.onChange&&(i.onChange&&"function"==typeof i.onChange()?i.onChange()(e,z):i.onChange(e,z))}function V(e){if(o.onAfterValidate){for(var n=[],a=z.length-1;a>=0;a--)n.push(z[a].deferredObj.promise);t.all(n).then(function(){i.onAfterValidate&&"function"==typeof i.onAfterValidate()?i.onAfterValidate()(e,$,z):i.onAfterValidate(e,$,z)})}}var z=[],$=[];l&&(l.$isEmpty=function(e){return!e||(angular.isArray(e)?0===e.length:!e.base64)},i._clearInput=function(){r[0].value=""},i.$watch(function(){return l.$viewValue},function(e){l.$isEmpty(e)&&l.$dirty&&(i._clearInput(),l.$setValidity("maxnum",!0),l.$setValidity("minnum",!0),l.$setValidity("maxsize",!0),l.$setValidity("minsize",!0),l.$setValidity("accept",!0))}),r.on("change",function(e){$=[],$=angular.copy($),0===e.target.files.length?(z=[],d()):(z=e.target.files,y(),v(e),V(e)),i._clearInput()}))}}}])}(window);
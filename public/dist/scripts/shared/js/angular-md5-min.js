"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="angular-md5"),function(r){r.module("angular-md5",["gdi2290.md5"]),r.module("ngMd5",["gdi2290.md5"]),r.module("gdi2290.md5",["gdi2290.gravatar-filter","gdi2290.md5-service","gdi2290.md5-filter"]),r.module("gdi2290.gravatar-filter",[]).filter("gravatar",["md5",function(r){var n={};return function(t,e){return n[t]||(e=e?r.createHash(e.toString().toLowerCase()):"",n[t]=t?r.createHash(t.toString().toLowerCase()):e),n[t]}}]),r.module("gdi2290.md5-filter",[]).filter("md5",["md5",function(r){return function(n){return n?r.createHash(n.toString().toLowerCase()):n}}]),r.module("gdi2290.md5-service",[]).factory("md5",[function(){return{createHash:function(r){if(null===r)return null;var n,t,e,u,o,i,d,a,f,c,l=function(r,n){return r<<n|r>>>32-n},g=function(r,n){var t,e,u,o,i;return u=2147483648&r,o=2147483648&n,t=1073741824&r,e=1073741824&n,i=(1073741823&r)+(1073741823&n),t&e?2147483648^i^u^o:t|e?1073741824&i?3221225472^i^u^o:1073741824^i^u^o:i^u^o},m=function(r,n,t,e,u,o,i){return r=g(r,g(g(function(r,n,t){return r&n|~r&t}(n,t,e),u),i)),g(l(r,o),n)},s=function(r,n,t,e,u,o,i){return r=g(r,g(g(function(r,n,t){return r&t|n&~t}(n,t,e),u),i)),g(l(r,o),n)},v=function(r,n,t,e,u,o,i){return r=g(r,g(g(function(r,n,t){return r^n^t}(n,t,e),u),i)),g(l(r,o),n)},h=function(r,n,t,e,u,o,i){return r=g(r,g(g(function(r,n,t){return n^(r|~t)}(n,t,e),u),i)),g(l(r,o),n)},p=function(r){var n,t="",e="";for(n=0;n<=3;n++)t+=(e="0"+(r>>>8*n&255).toString(16)).substr(e.length-2,2);return t},w=[];for(d=1732584193,a=4023233417,f=2562383102,c=271733878,n=(w=function(r){for(var n,t=r.length,e=t+8,u=16*((e-e%64)/64+1),o=new Array(u-1),i=0,d=0;d<t;)i=d%4*8,o[n=(d-d%4)/4]=o[n]|r.charCodeAt(d)<<i,d++;return n=(d-d%4)/4,i=d%4*8,o[n]=o[n]|128<<i,o[u-2]=t<<3,o[u-1]=t>>>29,o}(r)).length,t=0;t<n;t+=16)e=d,u=a,o=f,i=c,a=h(a=h(a=h(a=h(a=v(a=v(a=v(a=v(a=s(a=s(a=s(a=s(a=m(a=m(a=m(a=m(a,f=m(f,c=m(c,d=m(d,a,f,c,w[t+0],7,3614090360),a,f,w[t+1],12,3905402710),d,a,w[t+2],17,606105819),c,d,w[t+3],22,3250441966),f=m(f,c=m(c,d=m(d,a,f,c,w[t+4],7,4118548399),a,f,w[t+5],12,1200080426),d,a,w[t+6],17,2821735955),c,d,w[t+7],22,4249261313),f=m(f,c=m(c,d=m(d,a,f,c,w[t+8],7,1770035416),a,f,w[t+9],12,2336552879),d,a,w[t+10],17,4294925233),c,d,w[t+11],22,2304563134),f=m(f,c=m(c,d=m(d,a,f,c,w[t+12],7,1804603682),a,f,w[t+13],12,4254626195),d,a,w[t+14],17,2792965006),c,d,w[t+15],22,1236535329),f=s(f,c=s(c,d=s(d,a,f,c,w[t+1],5,4129170786),a,f,w[t+6],9,3225465664),d,a,w[t+11],14,643717713),c,d,w[t+0],20,3921069994),f=s(f,c=s(c,d=s(d,a,f,c,w[t+5],5,3593408605),a,f,w[t+10],9,38016083),d,a,w[t+15],14,3634488961),c,d,w[t+4],20,3889429448),f=s(f,c=s(c,d=s(d,a,f,c,w[t+9],5,568446438),a,f,w[t+14],9,3275163606),d,a,w[t+3],14,4107603335),c,d,w[t+8],20,1163531501),f=s(f,c=s(c,d=s(d,a,f,c,w[t+13],5,2850285829),a,f,w[t+2],9,4243563512),d,a,w[t+7],14,1735328473),c,d,w[t+12],20,2368359562),f=v(f,c=v(c,d=v(d,a,f,c,w[t+5],4,4294588738),a,f,w[t+8],11,2272392833),d,a,w[t+11],16,1839030562),c,d,w[t+14],23,4259657740),f=v(f,c=v(c,d=v(d,a,f,c,w[t+1],4,2763975236),a,f,w[t+4],11,1272893353),d,a,w[t+7],16,4139469664),c,d,w[t+10],23,3200236656),f=v(f,c=v(c,d=v(d,a,f,c,w[t+13],4,681279174),a,f,w[t+0],11,3936430074),d,a,w[t+3],16,3572445317),c,d,w[t+6],23,76029189),f=v(f,c=v(c,d=v(d,a,f,c,w[t+9],4,3654602809),a,f,w[t+12],11,3873151461),d,a,w[t+15],16,530742520),c,d,w[t+2],23,3299628645),f=h(f,c=h(c,d=h(d,a,f,c,w[t+0],6,4096336452),a,f,w[t+7],10,1126891415),d,a,w[t+14],15,2878612391),c,d,w[t+5],21,4237533241),f=h(f,c=h(c,d=h(d,a,f,c,w[t+12],6,1700485571),a,f,w[t+3],10,2399980690),d,a,w[t+10],15,4293915773),c,d,w[t+1],21,2240044497),f=h(f,c=h(c,d=h(d,a,f,c,w[t+8],6,1873313359),a,f,w[t+15],10,4264355552),d,a,w[t+6],15,2734768916),c,d,w[t+13],21,1309151649),f=h(f,c=h(c,d=h(d,a,f,c,w[t+4],6,4149444226),a,f,w[t+11],10,3174756917),d,a,w[t+2],15,718787259),c,d,w[t+9],21,3951481745),d=g(d,e),a=g(a,u),f=g(f,o),c=g(c,i);return(p(d)+p(a)+p(f)+p(c)).toLowerCase()}}}])}(angular);
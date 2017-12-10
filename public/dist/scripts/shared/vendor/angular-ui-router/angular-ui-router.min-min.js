"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(e,t,r){"use strict";function n(e,t){return N(new(N(function(){},{prototype:e})),t)}function i(e){return M(arguments,function(t){t!==e&&M(t,function(t,r){e.hasOwnProperty(r)||(e[r]=t)})}),e}function a(e){if(Object.keys)return Object.keys(e);var t=[];return M(e,function(e,r){t.push(r)}),t}function o(e,t){if(Array.prototype.indexOf)return e.indexOf(t,Number(arguments[2])||0);var r=e.length>>>0,n=Number(arguments[2])||0;for(0>(n=0>n?Math.ceil(n):Math.floor(n))&&(n+=r);r>n;n++)if(n in e&&e[n]===t)return n;return-1}function u(e,t,r,n){var i,u=function(e,t){var r=[];for(var n in e.path){if(e.path[n]!==t.path[n])break;r.push(e.path[n])}return r}(r,n),s={},l=[];for(var c in u)if(u[c].params&&(i=a(u[c].params)).length)for(var f in i)o(l,i[f])>=0||(l.push(i[f]),s[i[f]]=e[i[f]]);return N({},s,t)}function s(e,t,r){if(!r){r=[];for(var n in e)r.push(n)}for(var i=0;i<r.length;i++){var a=r[i];if(e[a]!=t[a])return!1}return!0}function l(e,t){var r={};return M(e,function(e){r[e]=t[e]}),r}function c(e){var t={},r=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));for(var n in e)-1==o(r,n)&&(t[n]=e[n]);return t}function f(e,t){var r=V(e),n=r?[]:{};return M(e,function(e,i){t(e,i)&&(n[r?n.length:i]=e)}),n}function p(e,t){var r=V(e)?[]:{};return M(e,function(e,n){r[n]=t(e,n)}),r}function h(e,t){var n=1,u=2,s={},l=[],f=s,p=N(e.when(s),{$$promises:s,$$values:s});this.study=function(s){function h(e,r){if(g[r]!==u){if(m.push(r),g[r]===n)throw m.splice(0,o(m,r)),new Error("Cyclic dependency: "+m.join(" -> "));if(g[r]=n,k(e))d.push(r,[function(){return t.get(e)}],l);else{var i=t.annotate(e);M(i,function(e){e!==r&&s.hasOwnProperty(e)&&h(s[e],e)}),d.push(r,e,i)}m.pop(),g[r]=u}}function v(e){return I(e)&&e.then&&e.$$promises}if(!I(s))throw new Error("'invocables' must be an object");var $=a(s||{}),d=[],m=[],g={};return M(s,h),s=m=g=null,function(n,a,o){function u(){--w||(b||i(y,a.$$values),m.$$values=y,m.$$promises=m.$$promises||!0,delete m.$$inheritedValues,h.resolve(y))}function s(e){m.$$failure=e,h.reject(e)}function l(r,i,a){function l(e){f.reject(e),s(e)}function c(){if(!C(m.$$failure))try{f.resolve(t.invoke(i,o,y)),f.promise.then(function(e){y[r]=e,u()},l)}catch(e){l(e)}}var f=e.defer(),p=0;M(a,function(e){g.hasOwnProperty(e)&&!n.hasOwnProperty(e)&&(p++,g[e].then(function(t){y[e]=t,--p||c()},l))}),p||c(),g[r]=f.promise}if(v(n)&&o===r&&(o=a,a=n,n=null),n){if(!I(n))throw new Error("'locals' must be an object")}else n=f;if(a){if(!v(a))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else a=p;var h=e.defer(),m=h.promise,g=m.$$promises={},y=N({},n),w=1+d.length/3,b=!1;if(C(a.$$failure))return s(a.$$failure),m;a.$$inheritedValues&&i(y,c(a.$$inheritedValues,$)),N(g,a.$$promises),a.$$values?(b=i(y,c(a.$$values,$)),m.$$inheritedValues=c(a.$$values,$),u()):(a.$$inheritedValues&&(m.$$inheritedValues=c(a.$$inheritedValues,$)),a.then(u,s));for(var E=0,S=d.length;S>E;E+=3)n.hasOwnProperty(d[E])?u():l(d[E],d[E+1],d[E+2]);return m}},this.resolve=function(e,t,r,n){return this.study(e)(t,r,n)}}function v(e,t,r){this.fromConfig=function(e,t,r){return C(e.template)?this.fromString(e.template,t):C(e.templateUrl)?this.fromUrl(e.templateUrl,t):C(e.templateProvider)?this.fromProvider(e.templateProvider,t,r):null},this.fromString=function(e,t){return q(e)?e(t):e},this.fromUrl=function(r,n){return q(r)&&(r=r(n)),null==r?null:e.get(r,{cache:t,headers:{Accept:"text/html"}}).then(function(e){return e.data})},this.fromProvider=function(e,t,n){return r.invoke(e,null,n||{params:t})}}function $(e,t,i){function a(t,r,n,i){if(d.push(t),v[t])return v[t];if(!/^\w+(-+\w+)*(?:\[\])?$/.test(t))throw new Error("Invalid parameter name '"+t+"' in pattern '"+e+"'");if($[t])throw new Error("Duplicate parameter name '"+t+"' in pattern '"+e+"'");return $[t]=new F.Param(t,r,n,i),$[t]}function o(e,t,r,n){var i=["",""],a=e.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!t)return a;switch(r){case!1:i=["(",")"+(n?"?":"")];break;case!0:i=["?(",")?"];break;default:i=["("+r+"|",")?"]}return a+i[0]+t+i[1]}function u(i,a){var o,u,s,l,c;return o=i[2]||i[3],c=t.params[o],s=e.substring(p,i.index),u=a?i[4]:i[4]||("*"==i[1]?".*":null),l=F.type(u||"string")||n(F.type("string"),{pattern:new RegExp(u,t.caseInsensitive?"i":r)}),{id:o,regexp:u,segment:s,type:l,cfg:c}}t=N({params:{}},I(t)?t:{});var s,l=/([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,c=/([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,f="^",p=0,h=this.segments=[],v=i?i.params:{},$=this.params=i?i.params.$$new():new F.ParamSet,d=[];this.source=e;for(var m,g,y;(s=l.exec(e))&&!((m=u(s,!1)).segment.indexOf("?")>=0);)g=a(m.id,m.type,m.cfg,"path"),f+=o(m.segment,g.type.pattern.source,g.squash,g.isOptional),h.push(m.segment),p=l.lastIndex;var w=(y=e.substring(p)).indexOf("?");if(w>=0){var b=this.sourceSearch=y.substring(w);if(y=y.substring(0,w),this.sourcePath=e.substring(0,p+w),b.length>0)for(p=0;s=c.exec(b);)m=u(s,!0),g=a(m.id,m.type,m.cfg,"search"),p=l.lastIndex}else this.sourcePath=e,this.sourceSearch="";f+=o(y)+(!1===t.strict?"/?":"")+"$",h.push(y),this.regexp=new RegExp(f,t.caseInsensitive?"i":r),this.prefix=h[0],this.$$paramNames=d}function d(e){N(this,e)}function m(){function e(e){return null!=e?e.toString().replace(/\//g,"%2F"):e}function i(e){return q(e)||V(e)&&q(e[e.length-1])}function u(){for(;w.length;){var e=w.shift();if(e.pattern)throw new Error("You cannot override a type's .pattern at runtime.");t.extend(g[e.name],l.invoke(e.def))}}function s(e){N(this,e||{})}F=this;var l,c=!1,h=!0,v=!1,g={},y=!0,w=[],b={string:{encode:e,decode:function(e){return null!=e?e.toString().replace(/%2F/g,"/"):e},is:function(e){return null==e||!C(e)||"string"==typeof e},pattern:/[^/]*/},int:{encode:e,decode:function(e){return parseInt(e,10)},is:function(e){return C(e)&&this.decode(e.toString())===e},pattern:/\d+/},bool:{encode:function(e){return e?1:0},decode:function(e){return 0!==parseInt(e,10)},is:function(e){return!0===e||!1===e},pattern:/0|1/},date:{encode:function(e){return this.is(e)?[e.getFullYear(),("0"+(e.getMonth()+1)).slice(-2),("0"+e.getDate()).slice(-2)].join("-"):r},decode:function(e){if(this.is(e))return e;var t=this.capture.exec(e);return t?new Date(t[1],t[2]-1,t[3]):r},is:function(e){return e instanceof Date&&!isNaN(e.valueOf())},equals:function(e,t){return this.is(e)&&this.is(t)&&e.toISOString()===t.toISOString()},pattern:/[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,capture:/([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/},json:{encode:t.toJson,decode:t.fromJson,is:t.isObject,equals:t.equals,pattern:/[^/]*/},any:{encode:t.identity,decode:t.identity,equals:t.equals,pattern:/.*/}};m.$$getDefaultValue=function(e){if(!i(e.value))return e.value;if(!l)throw new Error("Injectable functions cannot be called at configuration time");return l.invoke(e.value)},this.caseInsensitive=function(e){return C(e)&&(c=e),c},this.strictMode=function(e){return C(e)&&(h=e),h},this.defaultSquashPolicy=function(e){if(!C(e))return v;if(!0!==e&&!1!==e&&!k(e))throw new Error("Invalid squash policy: "+e+". Valid policies: false, true, arbitrary-string");return v=e,e},this.compile=function(e,t){return new $(e,N({strict:h,caseInsensitive:c},t))},this.isMatcher=function(e){if(!I(e))return!1;var t=!0;return M($.prototype,function(r,n){q(r)&&(t=t&&C(e[n])&&q(e[n]))}),t},this.type=function(e,t,r){if(!C(t))return g[e];if(g.hasOwnProperty(e))throw new Error("A type named '"+e+"' has already been defined.");return g[e]=new d(N({name:e},t)),r&&(w.push({name:e,def:r}),y||u()),this},M(b,function(e,t){g[t]=new d(N({name:t},e))}),g=n(g,{}),this.$get=["$injector",function(e){return l=e,y=!1,u(),M(b,function(e,t){g[t]||(g[t]=new d(e))}),this}],this.Param=function(e,t,n,u){function s(){if(!l)throw new Error("Injectable functions cannot be called at configuration time");var e=l.invoke(n.$$fn);if(null!==e&&e!==r&&!c.type.is(e))throw new Error("Default value ("+e+") for parameter '"+c.id+"' is not an instance of Type ("+c.type.name+")");return e}var c=this;n=function(e){var t=I(e)?a(e):[];return-1===o(t,"value")&&-1===o(t,"type")&&-1===o(t,"squash")&&-1===o(t,"array")&&(e={value:e}),e.$$fn=i(e.value)?e.value:function(){return e.value},e}(n),t=function(t,r,n){if(t.type&&r)throw new Error("Param '"+e+"' has two type configurations.");return r||(t.type?t.type instanceof d?t.type:new d(t.type):"config"===n?g.any:g.string)}(n,t,u);var h=function(){var t={array:"search"===u&&"auto"},r=e.match(/\[\]$/)?{array:!0}:{};return N(t,r,n).array}();"string"!==(t=h?t.$asArray(h,"search"===u):t).name||h||"path"!==u||n.value!==r||(n.value="");var $=n.value!==r,m=function(e,t){var r=e.squash;if(!t||!1===r)return!1;if(!C(r)||null==r)return v;if(!0===r||k(r))return r;throw new Error("Invalid squash policy: '"+r+"'. Valid policies: false, true, or arbitrary string")}(n,$),y=function(e,t,n,i){var a,u,s=[{from:"",to:n||t?r:""},{from:null,to:n||t?r:""}];return a=V(e.replace)?e.replace:[],k(i)&&a.push({from:i,to:r}),u=p(a,function(e){return e.from}),f(s,function(e){return-1===o(u,e.from)}).concat(a)}(n,h,$,m);N(this,{id:e,type:t,location:u,array:h,squash:m,replace:y,isOptional:$,value:function(e){return e=function(e){var t=p(f(c.replace,function(e){return function(t){return t.from===e}}(e)),function(e){return e.to});return t.length?t[0]:e}(e),C(e)?c.type.$normalize(e):s()},dynamic:r,config:n,toString:function(){return"{Param:"+e+" "+t+" squash: '"+m+"' optional: "+$+"}"}})},s.prototype={$$new:function(){return n(this,N(new s,{$$parent:this}))},$$keys:function(){for(var e=[],t=[],r=this,n=a(s.prototype);r;)t.push(r),r=r.$$parent;return t.reverse(),M(t,function(t){M(a(t),function(t){-1===o(e,t)&&-1===o(n,t)&&e.push(t)})}),e},$$values:function(e){var t={},r=this;return M(r.$$keys(),function(n){t[n]=r[n].value(e&&e[n])}),t},$$equals:function(e,t){var r=!0,n=this;return M(n.$$keys(),function(i){var a=e&&e[i],o=t&&t[i];n[i].type.equals(a,o)||(r=!1)}),r},$$validates:function(e){var n,i,a,o,u,s=this.$$keys();for(n=0;n<s.length&&(i=this[s[n]],(a=e[s[n]])!==r&&null!==a||!i.isOptional);n++){if(o=i.type.$normalize(a),!i.type.is(o))return!1;if(u=i.type.encode(o),t.isString(u)&&!i.type.pattern.exec(u))return!1}return!0},$$parent:r},this.ParamSet=s}function g(e,n){function i(e,t,r){if(!r)return!1;var n=e.invoke(t,t,{$match:r});return!C(n)||n}function a(n,i,a,c){function f(e){function t(e){var t=e(a,n);return!!t&&(k(t)&&n.replace().url(t),!0)}if(!e||!e.defaultPrevented){h&&n.url(),h=r;var i,o=u.length;for(i=0;o>i;i++)if(t(u[i]))return;s&&t(s)}}function p(){return o=o||i.$on("$locationChangeSuccess",f)}var h,v=c.baseHref(),$=n.url();return l||p(),{sync:function(){f()},listen:function(){return p()},update:function(e){return e?void($=n.url()):void(n.url()!==$&&(n.url($),n.replace()))},push:function(e,t,i){var a=e.format(t||{});null!==a&&t&&t["#"]&&(a+="#"+t["#"]),n.url(a),h=i&&i.$$avoidResync?n.url():r,i&&i.replace&&n.replace()},href:function(r,i,a){if(!r.validates(i))return null;var o=e.html5Mode();t.isObject(o)&&(o=o.enabled);var u=r.format(i);if(a=a||{},o||null===u||(u="#"+e.hashPrefix()+u),null!==u&&i&&i["#"]&&(u+="#"+i["#"]),u=function(e,t,r){return"/"===v?e:t?v.slice(0,-1)+e:r?v.slice(1)+e:e}(u,o,a.absolute),!a.absolute||!u)return u;var s=!o&&u?"/":"",l=n.port();return l=80===l||443===l?"":":"+l,[n.protocol(),"://",n.host(),l,s,u].join("")}}}var o,u=[],s=null,l=!1;this.rule=function(e){if(!q(e))throw new Error("'rule' must be a function");return u.push(e),this},this.otherwise=function(e){if(k(e)){var t=e;e=function(){return t}}else if(!q(e))throw new Error("'rule' must be a function");return s=e,this},this.when=function(e,t){var r,a=k(t);if(k(e)&&(e=n.compile(e)),!a&&!q(t)&&!V(t))throw new Error("invalid 'handler' in when()");var o={matcher:function(e,t){return a&&(r=n.compile(t),t=["$match",function(e){return r.format(e)}]),N(function(r,n){return i(r,t,e.exec(n.path(),n.search()))},{prefix:k(e.prefix)?e.prefix:""})},regex:function(e,t){if(e.global||e.sticky)throw new Error("when() RegExp must not be global or sticky");return a&&(r=t,t=["$match",function(e){return function(e,t){return e.replace(/\$(\$|\d{1,2})/,function(e,r){return t["$"===r?0:Number(r)]})}(r,e)}]),N(function(r,n){return i(r,t,e.exec(n.path()))},{prefix:function(e){var t=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);return null!=t?t[1].replace(/\\(.)/g,"$1"):""}(e)})}},u={matcher:n.isMatcher(e),regex:e instanceof RegExp};for(var s in u)if(u[s])return this.rule(o[s](e,t));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(e){e===r&&(e=!0),l=e},this.$get=a,a.$inject=["$location","$rootScope","$injector","$browser"]}function y(e,i){function c(e,t){if(!e)return r;var n=k(e),i=n?e:e.name;if(function(e){return 0===e.indexOf(".")||0===e.indexOf("^")}(i)){if(!t)throw new Error("No reference point given for path '"+i+"'");t=c(t);for(var a=i.split("."),o=0,u=a.length,s=t;u>o;o++)if(""!==a[o]||0!==o){if("^"!==a[o])break;if(!s.parent)throw new Error("Path '"+i+"' not valid for state '"+t.name+"'");s=s.parent}else s=t;a=a.slice(o).join("."),i=s.name+(s.name&&a?".":"")+a}var l=g[i];return!l||!n&&(n||l!==e&&l.self!==e)?r:l}function f(t){var r=(t=n(t,{self:t,resolve:t.resolve||{},toString:function(){return this.name}})).name;if(!k(r)||r.indexOf("@")>=0)throw new Error("State must have a valid name");if(g.hasOwnProperty(r))throw new Error("State '"+r+"'' is already defined");var i=-1!==r.indexOf(".")?r.substring(0,r.lastIndexOf(".")):k(t.parent)?t.parent:I(t.parent)&&k(t.parent.name)?t.parent.name:"";if(i&&!g[i])return function(e,t){y[e]||(y[e]=[]),y[e].push(t)}(i,t.self);for(var a in b)q(b[a])&&(t[a]=b[a](t,b.$delegates[a]));return g[r]=t,!t[w]&&t.url&&e.when(t.url,["$match","$stateParams",function(e,r){m.$current.navigable==t&&s(e,r)||m.transitionTo(t,e,{inherit:!0,location:!1})}]),function(e){for(var t=y[e]||[];t.length;)f(t.shift())}(r),t}function h(e){for(var t=e.split("."),r=m.$current.name.split("."),n=0,i=t.length;i>n;n++)"*"===t[n]&&(r[n]="*");return"**"===t[0]&&(r=r.slice(o(r,t[1]))).unshift("**"),"**"===t[t.length-1]&&(r.splice(o(r,t[t.length-2])+1,Number.MAX_VALUE),r.push("**")),t.length==r.length&&r.join("")===t.join("")}function v(e,i,o,f,v,y,b,E,S){function x(t,r,n,a){var o=e.$broadcast("$stateNotFound",t,r,n);if(o.defaultPrevented)return b.update(),O;if(!o.retry)return null;if(a.$retry)return b.update(),F;var u=m.transition=i.when(o.retry);return u.then(function(){return u!==m.transition?j:(t.options.$retry=!0,m.transitionTo(t.to,t.toParams,t.options))},function(){return O}),b.update(),u}function P(e,r,n,a,u,s){var c=n?r:l(e.params.$$keys(),r),p={$stateParams:c};u.resolve=v.resolve(e.resolve,p,u.resolve,e);var h=[u.resolve.then(function(e){u.globals=e})];return a&&h.push(a),i.all(h).then(function(){var r=[];return M(e.views,function(n,i){var a=n.resolve&&n.resolve!==e.resolve?n.resolve:{};a.$template=[function(){return o.load(i,{view:n,locals:u.globals,params:c,notify:s.notify})||""}],r.push(v.resolve(a,u.globals,u.resolve,e).then(function(r){if(q(n.controllerProvider)||V(n.controllerProvider)){var o=t.extend({},a,u.globals);r.$$controller=f.invoke(n.controllerProvider,null,o)}else r.$$controller=n.controller;r.$$state=e,r.$$controllerAs=n.controllerAs,u[i]=r}))}),i.all(r).then(function(){return u.globals})}).then(function(e){return u})}var j=i.reject(new Error("transition superseded")),A=i.reject(new Error("transition prevented")),O=i.reject(new Error("transition aborted")),F=i.reject(new Error("transition failed"));return d.locals={resolve:null,globals:{$stateParams:{}}},m={params:{},current:d.self,$current:d,transition:null},m.reload=function(e){return m.transitionTo(m.current,y,{reload:e||!0,inherit:!1,notify:!0})},m.go=function(e,t,r){return m.transitionTo(e,t,N({inherit:!0,relative:m.$current},r))},m.transitionTo=function(t,r,a){r=r||{},a=N({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},a||{});var o,s=m.$current,p=m.params,h=s.path,v=c(t,a.relative),g=r["#"];if(!C(v)){var E={to:t,toParams:r,options:a},S=x(E,s.self,p,a);if(S)return S;if(t=E.to,r=E.toParams,a=E.options,v=c(t,a.relative),!C(v)){if(!a.relative)throw new Error("No such state '"+t+"'");throw new Error("Could not resolve '"+t+"' from state '"+a.relative+"'")}}if(v[w])throw new Error("Cannot transition to abstract state '"+t+"'");if(a.inherit&&(r=u(y,r||{},m.$current,v)),!v.params.$$validates(r))return F;r=v.params.$$values(r);var O=(t=v).path,q=0,V=O[q],M=d.locals,D=[];if(a.reload){if(k(a.reload)||I(a.reload)){if(I(a.reload)&&!a.reload.name)throw new Error("Invalid reload state object");var U=!0===a.reload?h[0]:c(a.reload);if(a.reload&&!U)throw new Error("No such reload state '"+(k(a.reload)?a.reload:a.reload.name)+"'");for(;V&&V===h[q]&&V!==U;)M=D[q]=V.locals,q++,V=O[q]}}else for(;V&&V===h[q]&&V.ownParams.$$equals(r,p);)M=D[q]=V.locals,q++,V=O[q];if($(t,r,s,p,M,a))return g&&(r["#"]=g),m.params=r,R(m.params,y),a.location&&t.navigable&&t.navigable.url&&(b.push(t.navigable.url,r,{$$avoidResync:!0,replace:"replace"===a.location}),b.update(!0)),m.transition=null,i.when(m.current);if(r=l(t.params.$$keys(),r||{}),a.notify&&e.$broadcast("$stateChangeStart",t.self,r,s.self,p).defaultPrevented)return e.$broadcast("$stateChangeCancel",t.self,r,s.self,p),b.update(),A;for(var T=i.when(M),z=q;z<O.length;z++,V=O[z])M=D[z]=n(M),T=P(V,r,V===t,T,M,a);var L=m.transition=T.then(function(){var n,i,o;if(m.transition!==L)return j;for(n=h.length-1;n>=q;n--)(o=h[n]).self.onExit&&f.invoke(o.self.onExit,o.self,o.locals.globals),o.locals=null;for(n=q;n<O.length;n++)i=O[n],i.locals=D[n],i.self.onEnter&&f.invoke(i.self.onEnter,i.self,i.locals.globals);return g&&(r["#"]=g),m.transition!==L?j:(m.$current=t,m.current=t.self,m.params=r,R(m.params,y),m.transition=null,a.location&&t.navigable&&b.push(t.navigable.url,t.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===a.location}),a.notify&&e.$broadcast("$stateChangeSuccess",t.self,r,s.self,p),b.update(!0),m.current)},function(n){return m.transition!==L?j:(m.transition=null,(o=e.$broadcast("$stateChangeError",t.self,r,s.self,p,n)).defaultPrevented||b.update(),i.reject(n))});return L},m.is=function(e,t,n){var i=c(e,(n=N({relative:m.$current},n||{})).relative);return C(i)?m.$current===i&&(!t||s(i.params.$$values(t),y)):r},m.includes=function(e,t,n){if(n=N({relative:m.$current},n||{}),k(e)&&function(e){return e.indexOf("*")>-1}(e)){if(!h(e))return!1;e=m.$current.name}var i=c(e,n.relative);return C(i)?!!C(m.$current.includes[i.name])&&(!t||s(i.params.$$values(t),y,a(t))):r},m.href=function(e,t,n){var i=c(e,(n=N({lossy:!0,inherit:!0,absolute:!1,relative:m.$current},n||{})).relative);if(!C(i))return null;n.inherit&&(t=u(y,t||{},m.$current,i));var a=i&&n.lossy?i.navigable:i;return a&&a.url!==r&&null!==a.url?b.href(a.url,l(i.params.$$keys().concat("#"),t||{}),{absolute:n.absolute}):null},m.get=function(e,t){if(0===arguments.length)return p(a(g),function(e){return g[e].self});var r=c(e,t||m.$current);return r&&r.self?r.self:null},m}function $(e,t,r,n,i,a){function o(e,t,r){var n=e.params.$$keys().filter(function(t){return"search"!=e.params[t].location}),i=function(e){var t={},r=Array.prototype.concat.apply(Array.prototype,Array.prototype.slice.call(arguments,1));return M(r,function(r){r in e&&(t[r]=e[r])}),t}.apply({},[e.params].concat(n));return new F.ParamSet(i).$$equals(t,r)}return!(a.reload||e!==r||!(i===r.locals||!1===e.self.reloadOnSearch&&o(r,n,t)))||void 0}var d,m,g={},y={},w="abstract",b={parent:function(e){if(C(e.parent)&&e.parent)return c(e.parent);var t=/^(.+)\.[^.]+$/.exec(e.name);return t?c(t[1]):d},data:function(e){return e.parent&&e.parent.data&&(e.data=e.self.data=N({},e.parent.data,e.data)),e.data},url:function(e){var t=e.url,r={params:e.params||{}};if(k(t))return"^"==t.charAt(0)?i.compile(t.substring(1),r):(e.parent.navigable||d).url.concat(t,r);if(!t||i.isMatcher(t))return t;throw new Error("Invalid url '"+t+"' in state '"+e+"'")},navigable:function(e){return e.url?e:e.parent?e.parent.navigable:null},ownParams:function(e){var t=e.url&&e.url.params||new F.ParamSet;return M(e.params||{},function(e,r){t[r]||(t[r]=new F.Param(r,null,e,"config"))}),t},params:function(e){return e.parent&&e.parent.params?N(e.parent.params.$$new(),e.ownParams):new F.ParamSet},views:function(e){var t={};return M(C(e.views)?e.views:{"":e},function(r,n){n.indexOf("@")<0&&(n+="@"+e.parent.name),t[n]=r}),t},path:function(e){return e.parent?e.parent.path.concat(e):[]},includes:function(e){var t=e.parent?N({},e.parent.includes):{};return t[e.name]=!0,t},$delegates:{}};(d=f({name:"",url:"^",views:null,abstract:!0})).navigable=null,this.decorator=function(e,t){return k(e)&&!C(t)?b[e]:q(t)&&k(e)?(b[e]&&!b.$delegates[e]&&(b.$delegates[e]=b[e]),b[e]=t,this):this},this.state=function(e,t){return I(e)?t=e:t.name=e,f(t),this},this.$get=v,v.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}function w(){function e(e,t){return{load:function(r,n){var i;return(n=N({template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}},n)).view&&(i=t.fromConfig(n.view,n.params,n.locals)),i&&n.notify&&e.$broadcast("$viewContentLoading",n),i}}}this.$get=e,e.$inject=["$rootScope","$templateFactory"]}function b(e,r,n,i){function a(e,t){if(s)return{enter:function(e,t,r){var n=s.enter(e,null,t,r);n&&n.then&&n.then(r)},leave:function(e,t){var r=s.leave(e,t);r&&r.then&&r.then(t)}};if(u){var r=u&&u(t,e);return{enter:function(e,t,n){r.enter(e,null,t),n()},leave:function(e,t){r.leave(e),t()}}}return{enter:function(e,t,r){t.after(e),r()},leave:function(e,t){e.remove(),t()}}}var o=r.has?function(e){return r.has(e)?r.get(e):null}:function(e){try{return r.get(e)}catch(e){return null}},u=o("$animator"),s=o("$animate");return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(r,o,u){return function(r,o,s){function l(){f&&(f.remove(),f=null),h&&(h.$destroy(),h=null),p&&(m.leave(p,function(){f=null}),f=p,p=null)}function c(a){var c,f=S(r,s,o,i),g=f&&e.$current&&e.$current.locals[f];if(a||g!==v){c=r.$new(),v=e.$current.locals[f];var y=u(c,function(e){m.enter(e,o,function(){h&&h.$emit("$viewContentAnimationEnded"),(t.isDefined(d)&&!d||r.$eval(d))&&n(e)}),l()});p=y,(h=c).$emit("$viewContentLoaded"),h.$eval($)}}var f,p,h,v,$=s.onload||"",d=s.autoscroll,m=a(s,r);r.$on("$stateChangeSuccess",function(){c(!1)}),r.$on("$viewContentLoading",function(){c(!1)}),c(!0)}}}}function E(e,t,r,n){return{restrict:"ECA",priority:-400,compile:function(i){var a=i.html();return function(i,o,u){var s=r.$current,l=S(i,u,o,n),c=s&&s.locals[l];if(c){o.data("$uiView",{name:l,state:c.$$state}),o.html(c.$template?c.$template:a);var f=e(o.contents());if(c.$$controller){c.$scope=i,c.$element=o;var p=t(c.$$controller,c);c.$$controllerAs&&(i[c.$$controllerAs]=p),o.data("$ngControllerController",p),o.children().data("$ngControllerController",p)}f(i)}}}}}function S(e,t,r,n){var i=n(t.uiView||t.name||"")(e),a=r.inheritedData("$uiView");return i.indexOf("@")>=0?i:i+"@"+(a?a.state.name:"")}function x(e){var t=e.parent().inheritedData("$uiView");return t&&t.state&&t.state.name?t.state:void 0}function P(e,r){var n=["location","inherit","reload","absolute"];return{restrict:"A",require:["?^uiSrefActive","?^uiSrefActiveEq"],link:function(i,a,o,u){var s=function(e,t){var r,n=e.match(/^\s*({[^}]*})\s*$/);if(n&&(e=t+"("+n[1]+")"),!(r=e.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/))||4!==r.length)throw new Error("Invalid state ref '"+e+"'");return{state:r[1],paramExpr:r[3]||null}}(o.uiSref,e.current.name),l=null,c=x(a)||e.$current,f="[object SVGAnimatedString]"===Object.prototype.toString.call(a.prop("href"))?"xlink:href":"href",p=null,h="A"===a.prop("tagName").toUpperCase(),v="FORM"===a[0].nodeName,$=v?"action":f,d=!0,m={relative:c,inherit:!0},g=i.$eval(o.uiSrefOpts)||{};t.forEach(n,function(e){e in g&&(m[e]=g[e])});var y=function(r){if(r&&(l=t.copy(r)),d){p=e.href(s.state,l,m);var n=u[1]||u[0];return n&&n.$$addStateInfo(s.state,l),null===p?(d=!1,!1):void o.$set($,p)}};s.paramExpr&&(i.$watch(s.paramExpr,function(e,t){e!==l&&y(e)},!0),l=t.copy(i.$eval(s.paramExpr))),y(),v||a.bind("click",function(t){if(!((t.which||t.button)>1||t.ctrlKey||t.metaKey||t.shiftKey||a.attr("target"))){var n=r(function(){e.go(s.state,l,m)});t.preventDefault();var i=h&&!p?1:0;t.preventDefault=function(){i--<=0&&r.cancel(n)}}})}}}function j(e,t,r){return{restrict:"A",controller:["$scope","$element","$attrs",function(t,n,i){function a(){!function(){for(var e=0;e<s.length;e++)if(o(s[e].state,s[e].params))return!0;return!1}()?n.removeClass(u):n.addClass(u)}function o(t,r){return void 0!==i.uiSrefActiveEq?e.is(t.name,r):e.includes(t.name,r)}var u,s=[];u=r(i.uiSrefActiveEq||i.uiSrefActive||"",!1)(t),this.$$addStateInfo=function(t,r){var i=e.get(t,x(n));s.push({state:i||{name:t},params:r}),a()},t.$on("$stateChangeSuccess",a)}]}}function A(e){var t=function(t){return e.is(t)};return t.$stateful=!0,t}function O(e){var t=function(t){return e.includes(t)};return t.$stateful=!0,t}var C=t.isDefined,q=t.isFunction,k=t.isString,I=t.isObject,V=t.isArray,M=t.forEach,N=t.extend,R=t.copy;t.module("ui.router.util",["ng"]),t.module("ui.router.router",["ui.router.util"]),t.module("ui.router.state",["ui.router.router","ui.router.util"]),t.module("ui.router",["ui.router.state"]),t.module("ui.router.compat",["ui.router"]),h.$inject=["$q","$injector"],t.module("ui.router.util").service("$resolve",h),v.$inject=["$http","$templateCache","$injector"],t.module("ui.router.util").service("$templateFactory",v);var F;$.prototype.concat=function(e,t){var r={caseInsensitive:F.caseInsensitive(),strict:F.strictMode(),squash:F.defaultSquashPolicy()};return new $(this.sourcePath+e+this.sourceSearch,N(r,t),this)},$.prototype.toString=function(){return this.source},$.prototype.exec=function(e,t){function r(e){function t(e){return e.split("").reverse().join("")}return p(p(t(e).split(/-(?!\\)/),t),function(e){return e.replace(/\\-/g,"-")}).reverse()}var n=this.regexp.exec(e);if(!n)return null;t=t||{};var i,a,o,u=this.parameters(),s=u.length,l=this.segments.length-1,c={};if(l!==n.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(i=0;l>i;i++){o=u[i];var f=this.params[o],h=n[i+1];for(a=0;a<f.replace;a++)f.replace[a].from===h&&(h=f.replace[a].to);h&&!0===f.array&&(h=r(h)),c[o]=f.value(h)}for(;s>i;i++)o=u[i],c[o]=this.params[o].value(t[o]);return c},$.prototype.parameters=function(e){return C(e)?this.params[e]||null:this.$$paramNames},$.prototype.validates=function(e){return this.params.$$validates(e)},$.prototype.format=function(e){function t(e){return encodeURIComponent(e).replace(/-/g,function(e){return"%5C%"+e.charCodeAt(0).toString(16).toUpperCase()})}e=e||{};var r=this.segments,n=this.parameters(),i=this.params;if(!this.validates(e))return null;var a,o=!1,u=r.length-1,s=n.length,l=r[0];for(a=0;s>a;a++){var c=u>a,f=n[a],h=i[f],v=h.value(e[f]),$=h.isOptional&&h.type.equals(h.value(),v),d=!!$&&h.squash,m=h.type.encode(v);if(c){var g=r[a+1];if(!1===d)null!=m&&(l+=V(m)?p(m,t).join("-"):encodeURIComponent(m)),l+=g;else if(!0===d){var y=l.match(/\/$/)?/\/?(.*)/:/(.*)/;l+=g.match(y)[1]}else k(d)&&(l+=d+g)}else{if(null==m||$&&!1!==d)continue;V(m)||(m=[m]),m=p(m,encodeURIComponent).join("&"+f+"="),l+=(o?"&":"?")+f+"="+m,o=!0}}return l},d.prototype.is=function(e,t){return!0},d.prototype.encode=function(e,t){return e},d.prototype.decode=function(e,t){return e},d.prototype.equals=function(e,t){return e==t},d.prototype.$subPattern=function(){var e=this.pattern.toString();return e.substr(1,e.length-2)},d.prototype.pattern=/.*/,d.prototype.toString=function(){return"{Type:"+this.name+"}"},d.prototype.$normalize=function(e){return this.is(e)?e:this.decode(e)},d.prototype.$asArray=function(e,t){if(!e)return this;if("auto"===e&&!t)throw new Error("'auto' array mode is for query parameters only");return new function(e,t){function n(e,t){return function(){return e[t].apply(e,arguments)}}function i(e){return V(e)?e:C(e)?[e]:[]}function a(e){switch(e.length){case 0:return r;case 1:return"auto"===t?e[0]:e;default:return e}}function o(e){return!e}function u(e,t){return function(r){var n=p(r=i(r),e);return!0===t?0===f(n,o).length:a(n)}}this.encode=u(n(e,"encode")),this.decode=u(n(e,"decode")),this.is=u(n(e,"is"),!0),this.equals=function(e){return function(t,r){var n=i(t),a=i(r);if(n.length!==a.length)return!1;for(var o=0;o<n.length;o++)if(!e(n[o],a[o]))return!1;return!0}}(n(e,"equals")),this.pattern=e.pattern,this.$normalize=u(n(e,"$normalize")),this.name=e.name,this.$arrayMode=t}(this,e)},t.module("ui.router.util").provider("$urlMatcherFactory",m),t.module("ui.router.util").run(["$urlMatcherFactory",function(e){}]),g.$inject=["$locationProvider","$urlMatcherFactoryProvider"],t.module("ui.router.router").provider("$urlRouter",g),y.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],t.module("ui.router.state").value("$stateParams",{}).provider("$state",y),w.$inject=[],t.module("ui.router.state").provider("$view",w),t.module("ui.router.state").provider("$uiViewScroll",function(){var e=!1;this.useAnchorScroll=function(){e=!0},this.$get=["$anchorScroll","$timeout",function(t,r){return e?t:function(e){return r(function(){e[0].scrollIntoView()},0,!1)}}]}),b.$inject=["$state","$injector","$uiViewScroll","$interpolate"],E.$inject=["$compile","$controller","$state","$interpolate"],t.module("ui.router.state").directive("uiView",b),t.module("ui.router.state").directive("uiView",E),P.$inject=["$state","$timeout"],j.$inject=["$state","$stateParams","$interpolate"],t.module("ui.router.state").directive("uiSref",P).directive("uiSrefActive",j).directive("uiSrefActiveEq",j),A.$inject=["$state"],O.$inject=["$state"],t.module("ui.router.state").filter("isState",A).filter("includedByState",O)}(window,window.angular);
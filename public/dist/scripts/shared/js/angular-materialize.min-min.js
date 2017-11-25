!function(e){function i(e,i){var t,n,a,o,l=0,r=function(){l=+new Date,t=null,o=e.apply(n,a),t||(n=a=null)},s=function(){var s=+new Date,u=i-(s-l);return n=this,a=arguments,u<=0||u>i?(t&&(clearTimeout(t),t=null),l=s,o=e.apply(n,a),t||(n=a=null)):t||(t=setTimeout(r,u)),o};return s.cancel=function(){clearTimeout(t),l=0,t=n=a=null},s}var t;e.module("ui.materialize",["ui.materialize.ngModel","ui.materialize.collapsible","ui.materialize.toast","ui.materialize.sidenav","ui.materialize.material_select","ui.materialize.dropdown","ui.materialize.inputfield","ui.materialize.input_date","ui.materialize.tabs","ui.materialize.pagination","ui.materialize.pushpin","ui.materialize.scrollspy","ui.materialize.parallax","ui.materialize.modal","ui.materialize.tooltipped","ui.materialize.slider","ui.materialize.materialboxed","ui.materialize.scrollFire","ui.materialize.nouislider","ui.materialize.input_clock","ui.materialize.carousel"]),e.module("ui.materialize.scrollFire",[]).directive("scrollFire",["$compile","$timeout",function(t,n){return{restrict:"A",scope:{offset:"@",scrollFire:"&"},link:function(t,n,a){function o(){$(window).off("scroll resize blur focus",s)}var l=t.offset;e.isDefined(t.offset)||(l=0),l=Number(l)||0;var r=!1,s=i(function(){r||window.pageYOffset+window.innerHeight>n[0].getBoundingClientRect().top+window.pageYOffset+l&&(r=!0,t.scrollFire({}),o())},100);$(window).on("scroll resize blur focus",s),s(),t.$on("$destroy",o)}}}]),e.module("ui.materialize.ngModel",[]).directive("ngModel",["$timeout",function(e){return{restrict:"A",priority:-1,link:function(i,n,a){i.$watch(a.ngModel,function(i,a){e(function(){i instanceof Array&&a instanceof Array&&i.length==a.length||n.is("select")||(i?n.trigger("change"):n.attr("placeholder")===t&&(n.is(":focus")||n.trigger("blur")))})})}}}]),e.module("ui.materialize.slider",[]).directive("slider",["$timeout",function(i){return{restrict:"A",scope:{height:"=",transition:"=",interval:"=",indicators:"="},link:function(t,n,a){n.addClass("slider"),i(function(){n.slider({height:e.isDefined(t.height)?t.height:400,transition:e.isDefined(t.transition)?t.transition:500,interval:e.isDefined(t.interval)?t.interval:6e3,indicators:!e.isDefined(t.indicators)||t.indicators})})}}}]),e.module("ui.materialize.carousel",[]).directive("carousel",["$timeout",function(i){return{restrict:"A",scope:{timeConstant:"@",dist:"@",shift:"@",padding:"@",fullWidth:"@",indicators:"@",noWrap:"@"},link:function(t,n,a){n.addClass("carousel"),i(function(){n.carousel({time_constant:e.isDefined(t.timeConstant)?t.timeConstant:200,dist:e.isDefined(t.dist)?t.dist:-100,shift:e.isDefined(t.shift)?t.shift:0,padding:e.isDefined(t.padding)?t.padding:0,full_width:!!e.isDefined(t.fullWidth)&&t.fullWidth,indicators:!!e.isDefined(t.indicators)&&t.indicators,no_wrap:!!e.isDefined(t.noWrap)&&t.noWrap})})}}}]),e.module("ui.materialize.collapsible",[]).directive("collapsible",["$timeout",function(e){return{link:function(i,t,n){e(function(){t.collapsible()}),"watch"in n&&i.$watch(function(){return t[0].innerHTML},function(i,n){i!==n&&e(function(){t.collapsible()})})}}}]),e.module("ui.materialize.parallax",[]).directive("parallax",["$timeout",function(e){return{link:function(i,t,n){e(function(){t.parallax()})}}}]),e.module("ui.materialize.toast",[]).constant("toastConfig",{duration:3e3}).directive("toast",["toastConfig",function(i){return{scope:{message:"@",duration:"@",callback:"&"},link:function(t,n,a){n.bind(a.toast,function(){var n=e.isDefined(t.message)?t.message:"",o=e.isDefined(a.toastclass)?a.toastclass:"";Materialize.toast(n,t.duration?t.duration:i.duration,o,t.callback)})}}}]),e.module("ui.materialize.pushpin",[]).directive("pushpin",[function(){return{restrict:"AE",require:["?pushpinTop","?pushpinOffset","?pushpinBottom"],link:function(e,i,t){var n=t.pushpinTop||0,a=t.pushpinOffset||0,o=t.pushpinBottom||1/0;setTimeout(function(){i.pushpin({top:n,offset:a,bottom:o})},0)}}}]),e.module("ui.materialize.scrollspy",[]).directive("scrollspy",["$timeout",function(e){return{restrict:"A",link:function(i,t,n){t.addClass("scrollspy"),e(function(){t.scrollSpy()})}}}]),e.module("ui.materialize.tabs",[]).directive("tabs",["$timeout",function(e){return{scope:{reload:"="},link:function(i,t,n){t.addClass("tabs"),e(function(){t.tabs()}),i.$watch("reload",function(e){!0===e&&(t.tabs(),i.reload=!1)})}}}]),e.module("ui.materialize.sidenav",[]).directive("sidenav",[function(){return{scope:{menuwidth:"@",closeonclick:"@"},link:function(i,n,a){n.sideNav({menuWidth:e.isDefined(i.menuwidth)?parseInt(i.menuwidth,10):t,edge:a.sidenav?a.sidenav:"left",closeOnClick:e.isDefined(i.closeonclick)?"true"==i.closeonclick:t})}}}]),e.module("ui.materialize.material_select",[]).directive("materialSelect",["$compile","$timeout",function(i,n){return{link:function(i,a,o){if(a.is("select")){function l(e,n){function l(){if(!o.multiple){var e=a.val();a.siblings("ul").find("li").each(function(){var i=$(this);i.text()===e&&i.addClass("active")})}}if(o.multiple){if(n!==t&&e!==t&&n.length===e.length)return;var r=a.siblings("ul.active");if(e!==t&&r.length&&r.children("li.active").length==e.length)return}a.siblings(".caret").remove(),i.$evalAsync(function(){a.material_select(function(){o.multiple||a.siblings("input.select-dropdown").trigger("close"),l()});a.siblings("input.select-dropdown").off("mousedown.material_select_fix").on("mousedown.material_select_fix",function(e){(e.clientX>=e.target.clientWidth||e.clientY>=e.target.clientHeight)&&e.preventDefault()}),l(),a.siblings("input.select-dropdown").off("click.material_select_fix").on("click.material_select_fix",function(){$("input.select-dropdown").not(a.siblings("input.select-dropdown")).trigger("close")})})}if(n(l),o.ngModel)if(o.ngModel&&!e.isDefined(i.$eval(o.ngModel))){var r=!1;i.$watch(o.ngModel,function(t,n){!r&&e.isDefined(i.$eval(o.ngModel))?(r=!0,l()):l(t,n)})}else i.$watch(o.ngModel,l);"watch"in o&&i.$watch(function(){return a[0].innerHTML},function(e,i){e!==i&&n(l)}),o.ngDisabled&&i.$watch(o.ngDisabled,l)}}}}]),e.module("ui.materialize.dropdown",[]).directive("dropdown",["$timeout",function(i){return{scope:{inDuration:"@",outDuration:"@",constrainWidth:"@",hover:"@",alignment:"@",gutter:"@",belowOrigin:"@"},link:function(n,a,o){i(function(){a.dropdown({inDuration:e.isDefined(n.inDuration)?n.inDuration:t,outDuration:e.isDefined(n.outDuration)?n.outDuration:t,constrain_width:e.isDefined(n.constrainWidth)?n.constrainWidth:t,hover:e.isDefined(n.hover)?n.hover:t,alignment:e.isDefined(n.alignment)?n.alignment:t,gutter:e.isDefined(n.gutter)?n.gutter:t,belowOrigin:e.isDefined(n.belowOrigin)?n.belowOrigin:t})})}}}]),e.module("ui.materialize.inputfield",[]).directive("inputField",["$timeout",function(i){var t=0;return{transclude:!0,scope:{},link:function(n,a){i(function(){var o=a.find("> > input, > > textarea"),l=a.find("> > label");if(1==o.length&&1==l.length&&!o.attr("id")&&!l.attr("for")){var r="angularMaterializeID"+t++;o.attr("id",r),l.attr("for",r)}Materialize.updateTextFields(),a.find("> > .materialize-textarea").each(function(){var e=$(this);e.addClass("materialize-textarea"),e.trigger("autoresize");var t=e.attr("ng-model");t&&n.$parent.$watch(t,function(t,n){t!==n&&i(function(){e.trigger("autoresize")})})}),a.find("> > .materialize-textarea, > > input").each(function(i,t){(t=e.element(t)).siblings('span[class="character-counter"]').length||t.characterCounter()})})},template:'<div ng-transclude class="input-field"></div>'}}]),e.module("ui.materialize.input_date",[]).directive("inputDate",["$compile","$timeout",function(i,n){var a=$("<style>#inputCreated_root {outline: none;}</style>");$("html > head").append(a);var o=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,i=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g,a=function(e,i){for(e=String(e),i=i||2;e.length<i;)e="0"+e;return e};return function(l,r,s){var u=o;if(1!==arguments.length||"[object String]"!=Object.prototype.toString.call(l)||/\d/.test(l)||(r=l,l=t),l=l?new Date(l):new Date,isNaN(l))throw SyntaxError("invalid date");"UTC:"==(r=String(u.masks[r]||r||u.masks.default)).slice(0,4)&&(r=r.slice(4),s=!0);var c=s?"getUTC":"get",d=l[c+"Date"](),f=l[c+"Day"](),m=l[c+"Month"](),p=l[c+"FullYear"](),g=l[c+"Hours"](),h=l[c+"Minutes"](),v=l[c+"Seconds"](),y=l[c+"Milliseconds"](),D=s?0:l.getTimezoneOffset(),b={d:d,dd:a(d),ddd:u.i18n.dayNames[f],dddd:u.i18n.dayNames[f+7],m:m+1,mm:a(m+1),mmm:u.i18n.monthNames[m],mmmm:u.i18n.monthNames[m+12],yy:String(p).slice(2),yyyy:p,h:g%12||12,hh:a(g%12||12),H:g,HH:a(g),M:h,MM:a(h),s:v,ss:a(v),l:a(y,3),L:a(y>99?Math.round(y/10):y),t:g<12?"a":"p",tt:g<12?"am":"pm",T:g<12?"A":"P",TT:g<12?"AM":"PM",Z:s?"UTC":(String(l).match(i)||[""]).pop().replace(n,""),o:(D>0?"-":"+")+a(100*Math.floor(Math.abs(D)/60)+Math.abs(D)%60,4),S:["th","st","nd","rd"][d%10>3?0:(d%100-d%10!=10)*d%10]};return r.replace(e,function(e){return e in b?b[e]:e.slice(1,e.length-1)})}}();o.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"},o.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},Date.prototype.format=function(e,i){return o(this,e,i)};var l=function(e){return"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e.getTime())};return{require:"ngModel",scope:{container:"@",format:"@",formatSubmit:"@",monthsFull:"@",monthsShort:"@",weekdaysFull:"@",weekdaysShort:"@",weekdaysLetter:"@",firstDay:"=",disable:"=",today:"=",clear:"=",close:"=",selectYears:"=",selectMonths:"=",onStart:"&",onRender:"&",onOpen:"&",onClose:"&",onSet:"&",onStop:"&",ngReadonly:"=?",max:"@",min:"@"},link:function(a,o,r,s){s.$formatters.unshift(function(i){if(i){var t=new Date(i);return e.isDefined(a.format)?t.format(a.format):t.format("d mmmm, yyyy")}return null});var u=e.isDefined(a.monthsFull)?a.$eval(a.monthsFull):t,c=e.isDefined(a.monthsShort)?a.$eval(a.monthsShort):t,d=e.isDefined(a.weekdaysFull)?a.$eval(a.weekdaysFull):t,f=e.isDefined(a.weekdaysShort)?a.$eval(a.weekdaysShort):t,m=e.isDefined(a.weekdaysLetter)?a.$eval(a.weekdaysLetter):t;i(o.contents())(a),a.ngReadonly||n(function(){var i={container:a.container,format:e.isDefined(a.format)?a.format:t,formatSubmit:e.isDefined(a.formatSubmit)?a.formatSubmit:t,monthsFull:e.isDefined(u)?u:t,monthsShort:e.isDefined(c)?c:t,weekdaysFull:e.isDefined(d)?d:t,weekdaysShort:e.isDefined(f)?f:t,weekdaysLetter:e.isDefined(m)?m:t,firstDay:e.isDefined(a.firstDay)?a.firstDay:0,disable:e.isDefined(a.disable)?a.disable:t,today:e.isDefined(a.today)?a.today:t,clear:e.isDefined(a.clear)?a.clear:t,close:e.isDefined(a.close)?a.close:t,selectYears:e.isDefined(a.selectYears)?a.selectYears:t,selectMonths:e.isDefined(a.selectMonths)?a.selectMonths:t,onStart:e.isDefined(a.onStart)?function(){a.onStart()}:t,onRender:e.isDefined(a.onRender)?function(){a.onRender()}:t,onOpen:e.isDefined(a.onOpen)?function(){a.onOpen()}:t,onClose:e.isDefined(a.onClose)?function(){a.onClose()}:t,onSet:e.isDefined(a.onSet)?function(){a.onSet()}:t,onStop:e.isDefined(a.onStop)?function(){a.onStop()}:t};a.container||delete i.container;var n=o.pickadate(i).pickadate("picker");a.$watch("max",function(e){if(n){var i=new Date(e);n.set({max:!!l(i)&&i})}}),a.$watch("min",function(e){if(n){var i=new Date(e);n.set({min:!!l(i)&&i})}}),a.$watch("disable",function(i){if(n){var t=!(!e.isDefined(i)||!e.isArray(i))&&i;n.set({disable:t})}})})}}}]),e.module("ui.materialize.input_clock",[]).directive("inputClock",[function(){return{restrict:"A",scope:{default:"@",fromnow:"=?",donetext:"@",autoclose:"=?",ampmclickable:"=?",darktheme:"=?",twelvehour:"=?",vibrate:"=?"},link:function(i,t){$(t).addClass("timepicker"),i.ngReadonly||t.pickatime({default:e.isDefined(i.default)?i.default:"",fromnow:e.isDefined(i.fromnow)?i.fromnow:0,donetext:e.isDefined(i.donetext)?i.donetext:"Done",autoclose:!!e.isDefined(i.autoclose)&&i.autoclose,ampmclickable:!!e.isDefined(i.ampmclickable)&&i.ampmclickable,darktheme:!!e.isDefined(i.darktheme)&&i.darktheme,twelvehour:!e.isDefined(i.twelvehour)||i.twelvehour,vibrate:!e.isDefined(i.vibrate)||i.vibrate})}}}]),e.module("ui.materialize.pagination",[]).directive("pagination",["$sce",function(e){function i(e,i){e.List=[],e.Hide=!1,e.page=parseInt(e.page)||1,e.total=parseInt(e.total)||0,e.dots=e.dots||"...",e.ulClass=e.ulClass||i.ulClass||"pagination",e.adjacent=parseInt(e.adjacent)||2,e.activeClass="active",e.disabledClass="disabled",e.scrollTop=e.$eval(i.scrollTop),e.hideIfEmpty=e.$eval(i.hideIfEmpty),e.showPrevNext=e.$eval(i.showPrevNext),e.useSimplePrevNext=e.$eval(i.useSimplePrevNext)}function t(e,i){e.page>i&&(e.page=i),e.page<=0&&(e.page=1),e.adjacent<=0&&(e.adjacent=2),i<=1&&(e.Hide=e.hideIfEmpty)}function n(e,i){i=i.valueOf(),e.page!=i&&(e.page=i,e.paginationAction({page:i}),e.scrollTop&&scrollTo(0,0))}function a(i,t,a){var o=0;for(o=i;o<=t;o++){var l={value:e.trustAsHtml(o.toString()),liClass:a.page==o?a.activeClass:"waves-effect",action:function(){n(a,this.value)}};a.List.push(l)}}function o(i){i.List.push({value:e.trustAsHtml(i.dots)})}function l(e,i){a(1,2,e),3!=i&&o(e)}function r(i,t,a){if(i.showPrevNext&&!(t<1)){var o,l,r;if("prev"===a){o=i.page-1<=0;var s=i.page-1<=0?1:i.page-1;i.useSimplePrevNext?(l={value:"<<",title:"First Page",page:1},r={value:"<",title:"Previous Page",page:s}):(l={value:'<i class="material-icons">first_page</i>',title:"First Page",page:1},r={value:'<i class="material-icons">chevron_left</i>',title:"Previous Page",page:s})}else{o=i.page+1>t;var u=i.page+1>=t?t:i.page+1;i.useSimplePrevNext?(l={value:">",title:"Next Page",page:u},r={value:">>",title:"Last Page",page:t}):(l={value:'<i class="material-icons">chevron_right</i>',title:"Next Page",page:u},r={value:'<i class="material-icons">last_page</i>',title:"Last Page",page:t})}var c=function(t,a){i.List.push({value:e.trustAsHtml(t.value),title:t.title,liClass:a?i.disabledClass:"",action:function(){a||n(i,t.page)}})};c(l,o),c(r,o)}}function s(e,i,t){t!=e-2&&o(i),a(e-1,e,i)}function u(e,n){if(e.pageSize&&!(e.pageSize<0)){i(e,n);var o,u=2*e.adjacent,c=Math.ceil(e.total/e.pageSize);if(t(e,c),r(e,c,"prev"),c<5+u)a(o=1,c,e);else{var d;e.page<=1+u?(a(o=1,d=2+u+(e.adjacent-1),e),s(c,e,d)):c-u>e.page&&e.page>u?(o=e.page-e.adjacent,d=e.page+e.adjacent,l(e,o),a(o,d,e),s(c,e,d)):(d=c,l(e,o=c-(1+u+(e.adjacent-1))),a(o,d,e))}r(e,c,"next")}}return{restrict:"EA",scope:{page:"=",pageSize:"=",total:"=",dots:"@",hideIfEmpty:"@",adjacent:"@",scrollTop:"@",showPrevNext:"@",useSimplePrevNext:"@",paginationAction:"&",ulClass:"=?"},template:'<ul ng-hide="Hide" ng-class="ulClass"> <li ng-class="Item.liClass" ng-click="Item.action()" ng-repeat="Item in List"> <a href> <span ng-bind-html="Item.value"></span> </a></ul>',link:function(e,i,t){e.$watchCollection("[page, total, pageSize]",function(){u(e,t)})}}}]),e.module("ui.materialize.modal",[]).directive("modal",["$compile","$timeout",function(i,n){return{scope:{dismissible:"=",opacity:"@",inDuration:"@",outDuration:"@",ready:"&?",complete:"&?",open:"=?",enableTabs:"@?"},link:function(a,o,l){n(function(){var n=$(l.href?l.href:"#"+l.target);i(o.contents())(a);var r={dismissible:e.isDefined(a.dismissible)?a.dismissible:t,opacity:e.isDefined(a.opacity)?a.opacity:t,in_duration:e.isDefined(a.inDuration)?a.inDuration:t,out_duration:e.isDefined(a.outDuration)?a.outDuration:t,ready:function(){e.isFunction(a.ready)&&a.$apply(a.ready),a.open=!0,a.$apply(),a.enableTabs&&n.find("ul.tabs").tabs()},complete:function(){e.isFunction(a.complete)&&a.$apply(a.complete),a.open=!1,a.$apply()}};n.modal(r),o.modal(r),e.isDefined(l.open)&&n.length>0&&a.$watch("open",function(i,t){e.isDefined(i)&&(!0===i?n.modal("open"):n.modal("close"))})})}}}]),e.module("ui.materialize.tooltipped",[]).directive("tooltipped",["$compile","$timeout",function(e,i){return{restrict:"A",link:function(t,n,a){function o(){n.addClass("tooltipped"),e(n.contents())(t),i(function(){n.attr("data-tooltip-id")&&n.tooltip("remove"),n.tooltip()}),l=t.$on("$destroy",function(){n.tooltip("remove")})}var l=Function.prototype;a.$observe("tooltipped",function(e){"false"===e&&l!==Function.prototype?(n.tooltip("remove"),l(),l=Function.prototype):"false"!==e&&l===Function.prototype&&o()}),"false"!==a.tooltipped&&o(),n.on("$destroy",function(){n.tooltip("remove")})}}}]),e.module("ui.materialize.materialboxed",[]).directive("materialboxed",["$timeout",function(e){return{restrict:"A",link:function(i,t,n){e(function(){t.materialbox()})}}}]),e.module("ui.materialize.nouislider",[]).directive("nouislider",["$timeout",function(i){return{restrict:"A",scope:{ngModel:"=",min:"@",max:"@",step:"@?",connect:"@?",tooltips:"@?",behaviour:"@?"},link:function(n,a,o){function l(){e.isArray(n.ngModel)&&(r=!0),noUiSlider.create(a[0],{start:n.ngModel||0,step:parseFloat(n.step||1),tooltips:e.isDefined(n.tooltips)?n.tooltips:t,connect:e.isDefined(n.connect)?n.connect:[!1,!1],behaviour:e.isDefined(n.behaviour)?n.behaviour:t,range:{min:parseFloat(n.min||0),max:parseFloat(n.max||100)},format:{to:function(e){return Math.round(100*e)/100},from:function(e){return Number(e)}}})}var r=!1,s=n.$watch("ngModel",function(e){e!==t&&(l(),s())});a[0].noUiSlider.on("update",function(e,t){i(function(){n.ngModel=r?e:e[0]})})}}}])}(angular);
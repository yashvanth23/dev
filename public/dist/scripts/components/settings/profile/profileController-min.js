+function(o,r){"use strict";function e(r,e,t,n,a,i,s,c){r.initFunction=function(){r.userData=JSON.parse(o.sessionStorage.userDetail),r.getPLayerHistory()},r.getPLayerHistory=function(){var o=e.appConfig.baseUrl+e.appConfig.getLeaderBoard+"/"+r.userData.username;a.get(o).then(function(o){o&&"success"==o.data.status?(r.profile=o.data.data,console.log(r.profile)):t.showError("#errorModal",o.data.error,!0)},function(o){t.showError("#errorModal",o,!0)})},r.initFunction()}r.module("fandom").registerCtrl("profileCtrl",e),e.$inject=["$scope","$rootScope","$commons","$logger","fandomService","exceptionService","$window","$filter"]}(window,angular);
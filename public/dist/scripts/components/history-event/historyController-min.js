+function(t,e){"use strict";function o(e,o,a,r,s,n,c,i){e.initFunction=function(){e.matchDetails=JSON.parse(t.sessionStorage.match),e.userData=JSON.parse(t.sessionStorage.userDetail),o.loader=!0,e.noScore=!1,e.userScore=[],e.noUserScore=!1,e.getHistoryScore()},e.getHistoryScore=function(){var t=o.appConfig.baseUrl+o.appConfig.getBoard+"/"+e.matchDetails.matchId;s.get(t).then(function(t){if(o.loader=!1,t&&"success"==t.data.status)if(e.historyScore=t.data.data,e.historyScore.length>0){for(var a=0;a<e.historyScore.length;a++)e.historyScore[a].user.username==e.userData.username&&e.userScore.push(e.historyScore[a]);e.userScore.length>0?e.noUserScore=!1:(e.userScore=[],e.noUserScore=!0),e.noScore=!1}else e.noScore=!0,e.noUserScore=!1;else e.toastContent=$("<span>"+t.data.error+"</span>").add($('<button class="btn-flat toast-action"  >OK</button>')),Materialize.toast(e.toastContent,3e3)},function(t){e.toastContent=$("<span>"+t+"</span>").add($('<button class="btn-flat toast-action"  >OK</button>')),Materialize.toast(e.toastContent,3e3)})},e.$watch("historyChange",function(){t.sessionStorage.match!==e.matchDetails&&(e.matchDetails=JSON.parse(t.sessionStorage.match),o.loader=!0,e.getHistoryScore())}),e.initFunction()}e.module("fantumn").registerCtrl("historyCtrl",o),o.$inject=["$scope","$rootScope","$commons","$logger","fantumnService","exceptionService","$window","$filter"]}(window,angular);
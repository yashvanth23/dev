/**
 * @Filename : dashboardController.js
 * @Description : 
 * @Author : Patharraj
 * @Date : Oct 14, 2017 
 * 
 * @History
 *  Version     Date        Author        Remarks
 *  1.0         14-10-17    Patharraj     File Created         
 */

/**
 * @ngdoc controller
 * @name dashboardCtrl
 * @description
 * 
 */

+ function(window, angular) {
    'use strict';
    angular
        .module("fantumn")
        .registerCtrl('dashboardCtrl', dashboardCtrl)
    dashboardCtrl.$inject = ["$scope", "$rootScope", "$commons", "$logger", "$cookies", "fantumnService", "exceptionService", "$q", "$interval", "md5", "$filter"];


    function dashboardCtrl($scope, $rootScope, $commons, $logger, $cookies, fantumnService, exceptionService, $q, $interval, md5, $filter,$window,location) {
        $scope.initFunction = function() {
            $scope.guide1=false;
           
           if (window.sessionStorage.userDetail != undefined) {
                    if (window.sessionStorage.userDetail != "") {
                        $scope.userInfo = JSON.parse(window.sessionStorage.userDetail);
                        $scope.loginStatus = true;
                        $rootScope.name=$scope.userInfo.username;
                    }
                }
            if($rootScope.name != "") {
            if($rootScope.name != undefined){
            var leaderboardUrl = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getLeaderBoard + "/" + $rootScope.name;
              fantumnService.get(leaderboardUrl).then(function(leaderboard){                 
                                  if(leaderboard && leaderboard.data.status == "success")
                                 $scope.matchCard = leaderboard.data.data.matchCards; 
                             if($scope.matchCard.length==0){
                                 $scope.guide1=true;
                                  console.log("helo");
                                  angular.element('.logo').css({
                                  "margin-top": '-2%'
                                
                                        });
                             }
                         });
                     }
            }
            
         setInterval(function(){
            if($scope.color=='yellow'){
             $scope.color='';             
             $scope.move='10px';
         } else{
             $scope.color='yellow';             
              $scope.move='40px';
         }
         angular.element('.chat').css({                
                "color":'white',
                "left":$scope.move
            });
           },500);
        };

        $scope.initFunction();
    }
}(window, angular);
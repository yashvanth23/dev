/**
 * @Filename : upcomingController.js
 * @Description : 
 * @Author : Patharraj
 * @Date : Oct 15, 2017 
 * 
 * @History
 *  Version     Date        Author        Remarks
 *  1.0         19-10-17    Patharraj     File Created         
 */

/**
 * @ngdoc controller
 * @name profileController
 * @description
 * 
 */

+ function(window, angular) {
    'use strict';
    angular
        .module("fantumn")
        .registerCtrl('profileCtrl', profileCtrl);
    profileCtrl.$inject = ["$scope", "$rootScope", "$commons", "$logger", "fantumnService", "exceptionService", "$window", "$filter"];


    function profileCtrl($scope, $rootScope, $commons, $logger, fantumnService, exceptionService, $window, $filter,$location) {
             if (window.sessionStorage.userDetail != undefined) {
                    if (window.sessionStorage.userDetail != "") {
        $scope.initFunction = function() {
            $scope.userData = JSON.parse(window.sessionStorage.userDetail);
            $scope.getPLayerHistory();
        };


        $scope.getPLayerHistory = function() {
            var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getLeaderBoard + "/" + $scope.userData.username;
            fantumnService.get(url).then(function(res) {
                if (res && res.data.status == "success") {
                    $scope.profile = res.data.data;
                    console.log($scope.profile);
                } else {
                    $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                    Materialize.toast($scope.toastContent, 3000);
                }
            }, function(err) {
                $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                Materialize.toast($scope.toastContent, 3000);
            });
        };

        $scope.redirectSetting = function() {
            window.sessionStorage.pageName = "setting";
            window.sessionStorage.pagename = "setting";
            $commons.navigate('layout.setting', '', false);
        };
        $scope.initFunction();

    }else        
         $commons.navigate('layout.dashboard', '', false);
             }else
                 $commons.navigate('layout.dashboard', '', false);
         }
}(window, angular);
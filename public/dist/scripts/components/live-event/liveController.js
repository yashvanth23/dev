/**
 * @Filename : liveController.js
 * @Description : 
 * @Author : Patharraj
 * @Date : Oct 15, 2017 
 * 
 * @History
 *  Version     Date        Author        Remarks
 *  1.0         15-10-17    Patharraj     File Created         
 */

/**
 * @ngdoc controller
 * @name liveController
 * @description
 * 
 */

+ function(window, angular) {
    'use strict';
    angular
        .module("fantumn")
        .registerCtrl('liveCtrl', liveCtrl);
    liveCtrl.$inject = ["$scope", "$rootScope", "$commons", "$logger", "fantumnService", "exceptionService", "$window", "$filter"];


    function liveCtrl($scope, $rootScope, $commons, $logger, fantumnService, exceptionService, $window, $filter) {
if (window.sessionStorage.userDetail != undefined) {
                    if (window.sessionStorage.userDetail != "") {
        $scope.initFunction = function() {
            $scope.matchDetails = JSON.parse(window.sessionStorage.match);
            $scope.userData = JSON.parse(window.sessionStorage.userDetail);
            $rootScope.loader = true;
            $scope.noScore = false;
            $scope.noUserScore = false;
            $scope.userScore = [];
            $scope.getLiveScore();
        };

        $scope.getLiveScore = function() {
            var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getBoard + "/" + $scope.matchDetails.matchId;
            fantumnService.get(url).then(function(res) {
                $rootScope.loader = false;
                if (res && res.data.status == "success") {
                    $scope.liveScore = res.data.data;
                    $scope.tempArray = [];
                    $scope.historyScore = $filter("orderBy")($scope.liveScore, "-matchPoints");
                    if ($scope.liveScore.length > 0) {
                        for (var i = 0; i < $scope.liveScore.length; i++) {
                            var j = 1;
                            $scope.tempArray.push({
                                "_id": $scope.liveScore[i]._id,
                                "username": $scope.liveScore[i].user.username,
                                "matchPoints": $scope.liveScore[i].matchPoints,
                                "rank": j
                            });
                            j++;
                            if ($scope.liveScore[i].user.username == $scope.userData.username) {
                                $scope.userScore.push($scope.liveScore[i]);
                            }
                        }
                        $scope.filterArray($scope.liveScore, $scope.tempArray);
                        if ($scope.userScore.length > 0) {
                            $scope.noUserScore = false;
                        } else {
                            $scope.userScore = [];
                            $scope.noUserScore = true;
                        }
                        $scope.noScore = false;
                    } else {
                        $scope.noScore = true;
                        $scope.noUserScore = false;
                    }

                    if (angular.element('.float-refresh').hasClass('refresher')) {
                        angular.element('.float-refresh').removeClass('refresher');
                    }
                } else {
                    $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                    Materialize.toast($scope.toastContent, 3000);
                }
            }, function(err) {
                $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                Materialize.toast($scope.toastContent, 3000);
            });
        };

        $scope.refreshLive = function() {
            angular.element('.float-refresh').addClass('refresher');
            $scope.getLiveScore();
        };

        $scope.filterArray = function(array, filter) {
            filter = $filter("orderBy")(filter, "matchPoints");
            for (var i = 0; i < array.length; i++) {
                for (var k = 0; k < filter.length; k++) {
                    if (array[i].matchPoints == filter[k].matchPoints) {
                        $scope.liveScore[i]["rank"] = filter[i].rank;
                    } else {
                        $scope.liveScore[i]["rank"] = i + 1;
                    }
                }
            }

            return $scope.liveScore;
        };

        $scope.$watch("liveChange", function() {
            if (window.sessionStorage.match !== $scope.matchDetails) {
                $scope.matchDetails = JSON.parse(window.sessionStorage.match);
                $rootScope.loader = true;
                $scope.getLiveScore();
            }
        });
        $scope.initFunction();
}else        
         $commons.navigate('layout.dashboard', '', false);
             }else
                 $commons.navigate('layout.dashboard', '', false);
    }
}(window, angular);
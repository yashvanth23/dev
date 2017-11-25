/**
 * @Filename : historyController.js
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
 * @name historyController
 * @description
 * 
 */

+ function(window, angular) {
    'use strict';
    angular
        .module("fantumn")
        .registerCtrl('historyCtrl', historyCtrl);
    historyCtrl.$inject = ["$scope", "$rootScope", "$commons", "$logger", "fantumnService", "exceptionService", "$window", "$filter"];


    function historyCtrl($scope, $rootScope, $commons, $logger, fantumnService, exceptionService, $window, $filter) {
if (window.sessionStorage.userDetail != undefined) {
                    if (window.sessionStorage.userDetail != "") {
        $scope.initFunction = function() {
            $scope.matchDetails = JSON.parse(window.sessionStorage.match);
            $scope.userData = JSON.parse(window.sessionStorage.userDetail);
            $rootScope.loader = true;
            $scope.noScore = false;
            $scope.userScore = [];
            $scope.noUserScore = false;
            $scope.getHistoryScore();
        };

        $scope.getHistoryScore = function() {
            var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getBoard + "/" + $scope.matchDetails.matchId;
            fantumnService.get(url).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        console.log(res.data.data);
                        $scope.historyScore = res.data.data;
                        $scope.tempArray = [];
                        $scope.historyScore = $filter("orderBy")($scope.historyScore, "-matchPoints");
                        if ($scope.historyScore.length > 0) {
                            for (var i = 0; i < $scope.historyScore.length; i++) {
                                var j = 1;
                                $scope.tempArray.push({
                                    "_id": $scope.historyScore[i]._id,
                                    "username": $scope.historyScore[i].user.username,
                                    "matchPoints": $scope.historyScore[i].matchPoints,
                                    "rank": j
                                });
                                j++;
                                if ($scope.historyScore[i].user.username == $scope.userData.username) {
                                    $scope.userScore.push($scope.historyScore[i]);
                                }
                            }
                            $scope.filterArray($scope.historyScore, $scope.tempArray);
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
                    } else {
                        $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    }
                },
                function(err) {
                    $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                    Materialize.toast($scope.toastContent, 3000);
                });
        };

        $scope.filterArray = function(array, filter) {
            filter = $filter("orderBy")(filter, "matchPoints");
            for (var i = 0; i < array.length; i++) {
                for (var k = 0; k < filter.length; k++) {
                    if (array[i].matchPoints == filter[k].matchPoints) {
                        $scope.historyScore[i]["rank"] = filter[i].rank;
                    } else {
                        $scope.historyScore[i]["rank"] = i + 1;
                    }
                }
            }

            return $scope.historyScore;
        };


        $scope.$watch("historyChange", function() {
            if (window.sessionStorage.match !== $scope.matchDetails) {
                $scope.matchDetails = JSON.parse(window.sessionStorage.match);
                $rootScope.loader = true;
                $scope.getHistoryScore();
            }
        });

        $scope.initFunction();
}else        
         $commons.navigate('layout.dashboard', '', false);
             }else
                 $commons.navigate('layout.dashboard', '', false);
    }
}(window, angular);
/**
 * @Filename : contactController.js
 * @Description : 
 * @Author : Patharraj
 * @Date : Oct 15, 2017 
 * 
 * @History
 *  Version     Date        Author        Remarks
 *  1.0         20-10-17    Patharraj     File Created         
 */

/**
 * @ngdoc controller
 * @name contactController
 * @description
 * 
 */

+ function(window, angular) {
    'use strict';
    angular
        .module("fantumn")
        .registerCtrl('contactCtrl', contactCtrl);
    contactCtrl.$inject = ["$scope", "$rootScope", "$commons", "$logger", "fantumnService", "exceptionService", "$window", "$filter"];


    function contactCtrl($scope, $rootScope, $commons, $logger, fantumnService, exceptionService, $window, $filter) {

        $scope.initFunction = function() {
            $scope.report = {
                "name": "",
                "email": "",
                "content": "",
                "subject": ""
            };
            $scope.reportDrop = false;
            $scope.suggestSubmit = false;
        };

        $scope.openReport = function(report) {
            if (report == "suggest") {
                $scope.report.subject = "feature";
                $scope.title = "Suggest and Feature";
            } else {
                $scope.report.subject = "report";
                $scope.title = "Report a problem";
            }
            if (window.sessionStorage.userDetail != undefined) {
                if (window.sessionStorage.userDetail != "") {
                    $scope.userDetail = JSON.parse(window.sessionStorage.userDetail);
                    $("#email").val($scope.userDetail.email);
                    angular.element(".email label").addClass('active');
                    $scope.report.email = $scope.userDetail.email;
                }
            }
            angular.element('.contact-popup').addClass('active');
            $scope.reportDrop = true;
        };

        $scope.closeReport = function() {
            angular.element('.contact-popup').removeClass('active');
            $scope.reportDrop = false;
            $scope.report = {
                "name": "",
                "email": "",
                "content": "",
                "subject": ""
            };
            $scope.suggestSubmit = false;
        };


        $scope.suggestReport = function(valid) {
            $scope.suggestSubmit = true;
            if (valid) {
                $rootScope.loader = true;
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.report;
                fantumnService.post(url, $scope.report).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.toastContent = $('<span>Successfully Send A Email !</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                        $scope.closeReport();
                    } else {
                        $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    }
                }, function(err) {
                    $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                    Materialize.toast($scope.toastContent, 3000);
                });
            }
        };

        $scope.initFunction();

    }
}(window, angular);
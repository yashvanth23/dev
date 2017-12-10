/**
 * @Filename : common.js
 * @Description :
 * @Author : Patharraj
 * @Date : Oct 14, 2017
 * 
 * @History
 *  Version     Date          Author        Remarks
 *  1.0         14-10-2017    Patharraj     File Created
 */

/**
 * @ngdoc common
 * @name fantumnCommon
 * @description
 * 
 */


+ function(angular) {

    'use strict';
    angular
        .module('fantumn')
        .service('$commons', fantumnCommonFactory);


    function fantumnCommonFactory($logger, $window, $rootScope, $timeout, fantumnNavigateService, $state, exceptionService) {

        var fn = {};
        $rootScope.expireCount = 0;
        fn.navigate = function(pageName, params, reloadPage) {
            fantumnNavigateService.data = params;
            $window.sessionStorage.data = null;
            $window.sessionStorage.data = params;
            $state.go(pageName, {}, {
                reload: reloadPage
            });
        }

        fn.getParams = function() {
            var paramsData = $window.sessionStorage.data || '{}';
            return JSON.parse(paramsData);
        }

        fn.showSuccess = function(element, messageKey, status) {
            angular.element(element).addClass("active");
            $rootScope.message = messageKey;
            angular.element(".circle-loader").addClass("load-complete");
            angular.element(".checkmark").css({ "display": "block" });
            $rootScope.customLoader = true;
        };

        fn.showError = function(element, messageKey, status) {
            angular.element(element).addClass("active");
            $rootScope.message = messageKey;
            $rootScope.customLoader = true;
        };

        fn.showWarning = function(element, messageKey, status) {
            angular.element(element).addClass("active");
            $rootScope.message = messageKey;
            $rootScope.customLoader = true;
        };

        return fn;
    }
}(angular);
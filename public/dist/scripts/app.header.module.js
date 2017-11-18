+ function(window, angular, undefined) {


    angular.module("fantumn-grid-header", ["fantumn-app", "fantumn"])
        .factory('$headers', kendoGridHeaderFactory);

    function kendoGridHeaderFactory($logger, $rootScope, appConfig) {
        var fn = {};
        return fn;
    }

}(window, window.angular);
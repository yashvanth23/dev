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
            $scope.profil = {
                "name": "",
                lastname:""
            }
             $scope.backdrop=false;
            $scope.userData = JSON.parse(window.sessionStorage.userDetail);
             var url1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.profile + "/" + $scope.userData._id;
             fantumnService.get(url1).then(function(res) {
               
                if (res && res.data.status == "success") {
                    $scope.profile = res.data.data;  
                     console.log($scope.profile);
                    $scope.profil.name = $scope.profile.firstName;
                    $scope.profil.lastname = $scope.profile.lastName;
                   // $scope.profileInfo.email = $scope.profile.email;                   
                } else {
                   // $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                    $scope.toastContent=res.data.error;
                   Materialize.toast($scope.toastContent, 1500,'rounded');
                } });
            $scope.getPLayerHistory();
           
        };

        
         $scope.rank = function(){
             $scope.set1="";
              $scope.set="fantumn";
             var url3 =$rootScope.appConfig.baseUrl + $rootScope.appConfig.globalrank;
             fantumnService.get(url3).then(function(res) {
                 if (res && res.data.status == "success") {
                     $scope.ranking= res.data.data;
                      for ( var i=0; i<$scope.ranking.length; ++i){
                          for (var j=i+1; j<$scope.ranking.length; ++j)
                          {
                              if ($scope.ranking[i].userPoints <$scope.ranking[j].userPoints)
                              {
                                  var a= $scope.ranking[i];
                                  $scope.ranking[i] =$scope.ranking[j];
                                  $scope.ranking[j] = a;
                              }
                          }
                      }
                      console.log($scope.ranking);
                     var k=1;
                    for ( var i=0; i<$scope.ranking.length; i++){                       
                     $scope.ranking[i]["rank"] = k;
                     k++;
                   }
                   console.log($scope.ranking);
                     $scope.backdrop=true;
                     angular.element('.momo1').css({
                'opacity': '1',
                "display": 'block'
             });
                 }
             });
        };
        $scope.matchcard = function(){
            $scope.set="";
            $scope.set1="fantumn";
             var url2 =$rootScope.appConfig.baseUrl + $rootScope.appConfig.matchcard + "/" + $scope.userData._id;
             fantumnService.get(url2).then(function(res) {
                 
                 if (res && res.data.status == "success") {
                     $scope.usermatchcard = res.data.data;
                     $scope.backdrop=true;
                     angular.element('.momo').css({
                'opacity': '1',
                "display": 'block'
             });
                 }
             });
        };
        $scope.disable =function(){            
                  angular.element('.momo1').css({
                'opacity': '0',
                "display": 'none'
            });      
             angular.element('.momo').css({
                'opacity': '0',
                "display": 'none'
            });
             $scope.backdrop=false;
             
          }
        
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
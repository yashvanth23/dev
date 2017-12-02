/**
 * @Filename : layoutController.js
 * @Description : 
 * @Author : Patharraj
 * @Date : Oct 14, 2017 
 * 
 * @History
 *  Version     Date        Author        Remarks
 *  1.0         14-10-17    Patharraj     File Created         
 *  1.1         21-10-17    Patharraj     File Created   
 */

/**
 * @ngdoc controller
 * @name layoutController
 * @description
 * 
 */

+ function(window, angular) {
    'use strict';
    angular
        .module("fantumn")
        .registerCtrl('layoutController', layoutController);
    layoutController.$inject = ["$scope", "$rootScope", "$commons", "$logger", "$cookies", "fantumnService", "exceptionService", "$q", "$interval", "md5", "$filter"];


    function layoutController($scope, $rootScope, $commons, $logger, $cookies, fantumnService, exceptionService, $q, $interval, md5, $filter,$window,location) {
        // var signInParams = "";
        /**
         * @ngdoc method
         * @name layout
         * @methodOf: Initialize variable and default methods
         * @description Initialize variable and default methods
         * @param 
         * @returns 
         */
        $scope.initFunction = function() {
            try {
                $scope.tab = "upcoming";
                $scope.matchLoader = true;
                $scope.sidemenu = false;
                $scope.loginStatus = false;
                $scope.backdrop = false;
                $scope.loginEnable = false;
                $scope.registerEnable = false;
                $scope.loginSubmit = false;
                $scope.registerSubmit = false;
                $scope.footerHide = false;
                $scope.forgotError = false;
                $scope.user = {
                    "username": "",
                    "password": ""
                };
                $scope.userDetail = {
                    "email": "",
                    "password": "",
                    "dob": "",
                    "username": "",
                    "avatar": ""
                };
               $scope.loadfalse="345688";
                var userInfo = $cookies.get('userInfo');
                if (userInfo != undefined) {
                    window.sessionStorage.userDetail = userInfo;
                }
                if (window.sessionStorage.userDetail != undefined) {
                    if (window.sessionStorage.userDetail != "") {
                        $scope.userInfo = JSON.parse(window.sessionStorage.userDetail);
                        $scope.loginStatus = true;
                        if(window.sessionStorage.match !=undefined)
                        $scope.matchDetails = JSON.parse(window.sessionStorage.match);
                          else
                               $scope.matchDetails="undefined";
                    }
                }
                if (window.sessionStorage.pageName == "upcoming") {
                    $scope.footerHide = true;
                } else if (window.sessionStorage.pageName == "setting") {
                    $scope.footerHide = true;
                } else {
                    $scope.footerHide = false;
                }
                $scope.redirecturl = {
                    "index": "",
                    "match": "",
                    "tabStatus": "",
                    "element": ""
                };
                  setInterval(function() {
            Materialize.Toast.removeAll();            
                },3000);
                if($scope.loginStatus){
                    var  model2={
                        _id:$scope.userInfo._id
                    }
                     var url1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.updateProfile;
                                 fantumnService.post(url1, model2).then(function(res1) {
                            if (res1 && res1.data.status == "success") {                       
                                $scope.name1 =res1.data.data.firstName;
                                if($scope.name1==null){
                                    $scope.name =res1.data.data.username;
                                }
                                else{
                                  $scope.name =res1.data.data.firstName  
                                }}
                              });
                }
                $scope.mobile = false; 
                 var upcomingUrl1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.upcoming;
                if($scope.loginStatus){
        var leaderboardUrl = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getLeaderBoard + "/" + $scope.userInfo.username;
              fantumnService.get(leaderboardUrl).then(function(leaderboard){
                                  if(leaderboard && leaderboard.data.status == "success")
                                 $scope.matchCard = leaderboard.data.data.matchCards;           
        });       
            fantumnService.get(upcomingUrl1).then(function(res) {
                                      $scope.upcome=res.data;            
                                      $scope.getUpcomingMatch();
                                  })
                              }else{
                                   fantumnService.get(upcomingUrl1).then(function(res) {
                                      $scope.upcome=res.data;            
                                      $scope.getUpcomingMatch();
                                  })
                              }   
    
       setInterval(function() {
             fantumnService.get(upcomingUrl1).then(function(res) {
                      $scope.upcome=res.data;    
                   });             
                          $scope.getUpcomingMatch();
           }, 60000);

                $scope.ageError = false;
                $rootScope.playerListData = [];
                $scope.getViewportWidth();
                // $interval(function() {
                //     alert("2232323");
                //     $scope.getLiveMatch();
                // }, 15 * 60 * 6000);
            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }
        };

        $scope.returnIST = function(date) {
            return moment(date).utcOffset('+0530').format('YYYY-MM-DD HH:mm') + ":00";
        };

        /**
         * @ngdoc method
         * @name layout
         * @methodOf: getUpcomingMatch
         * @description get Upcoming match details
         * @param 
         * @returns 
        */
       $scope.lol =function(){
       var upcomingUrl1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.upcoming;
            fantumnService.get(upcomingUrl1).then(function(res) {
                                      $scope.upcome=res.data;            
                                      $scope.getUpcomingMatch();
        }); }       
        $scope.lead = function(){           
            var leaderboardUrl = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getLeaderBoard + "/" + $scope.userInfo.username;
        fantumnService.get(leaderboardUrl).then(function(leaderboard){            
            if(leaderboard && leaderboard.data.status == "success")
           $scope.matchCard = leaderboard.data.data.matchCards;
             var upcomingUrl1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.upcoming;
            fantumnService.get(upcomingUrl1).then(function(res) {
                                      $scope.upcome=res.data;            
                                      $scope.getUpcomingMatch();
                                  });
          });
       }
        $scope.getUpcomingMatch = function() {             
            try {                
                var currentDate = new Date();
                currentDate = currentDate.toISOString();
               // $scope.lead();
                if ($scope.loginStatus) {                         
                            if ($scope.upcome.status == "success") {
                                $scope.upcomingMatch = [];
                                for (var i = 0; i < $scope.upcome.data.length; i++) {
                                    if (currentDate < $scope.upcome.data[i].match.startingDateTime) {
                                        $scope.upcomingMatch.push({
                                            competition: $scope.upcome.data[i].season.competition.name,
                                            home: $scope.upcome.data[i].team1.name,
                                            away: $scope.upcome.data[i].team2.name,
                                            homeLogo: $scope.upcome.data[i].team1.duplicateLogo,
                                            awayLogo: $scope.upcome.data[i].team2.duplicateLogo,
                                            matchId: $scope.upcome.data[i].match.matchId,
                                            starts: $scope.upcome.data[i].match.startingDateTime,
                                            _id: $scope.upcome.data[i].match._id,
                                            picked: $scope.matchCard.indexOf($scope.upcome.data[i].match._id) != -1,
                                            teams: {
                                                team1: $scope.upcome.data[i].team1,
                                                team2: $scope.upcome.data[i].team2
                                            },
                                            match: {
                                                lineup: $scope.upcome.data[i].match.lineup
                                            }
                                        });
                                    }
                                    $scope.matchLoader = false;
                                }
                                $scope.calculateViewport($scope.upcomingMatch);
                               // $scope.matchLoader = false;
                            } else {
                               $scope.upcomingMatch = "something went wrong";
                            }                  
                } else {                    
                        if ($scope.upcome.status == "success") {
                            $scope.upcomingMatch = [];
                            for (var i = 0; i < $scope.upcome.data.length; i++) {
                                if (currentDate < $scope.upcome.data[i].match.startingDateTime) {
                                    $scope.upcomingMatch.push({
                                        competition: $scope.upcome.data[i].season.competition.name,
                                        home: $scope.upcome.data[i].team1.name,
                                        away: $scope.upcome.data[i].team2.name,
                                        homeLogo: $scope.upcome.data[i].team1.duplicateLogo,
                                        awayLogo: $scope.upcome.data[i].team2.duplicateLogo,
                                        matchId: $scope.upcome.data[i].match.matchId,
                                        starts: $scope.upcome.data[i].match.startingDateTime,
                                        _id: $scope.upcome.data[i].match._id,
                                        picked: false,
                                        teams: {
                                            team1: $scope.upcome.data[i].team1,
                                            team2: $scope.upcome.data[i].team2
                                        },
                                        match: {
                                            lineup: $scope.upcome.data[i].match.lineup
                                        }
                                    });
                                }
                            }
                            $scope.calculateViewport($scope.upcomingMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.upcomingMatch = "something went wrong";
                        }                   
                }
            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }
             var url1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.historyMatch;               
                    fantumnService.get(url1).then(function(res) {
                        $scope.history=res.data;
                    });
              var url2 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.liveMatch;
              fantumnService.get(url2).then(function(res) {
                  $scope.live=res.data;
              });
        };

        /**
         * @ngdoc method
         * @name layout
         * @methodOf: getLiveMatch
         * @description get Live match details
         * @param 
         * @returns 
         */
        $scope.getLiveMatch = function() {
            try {
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.liveMatch;
                if ($scope.loginStatus) {                    
                        if ($scope.live.status == "success") {
                            $scope.liveMatch = [];
                            for (var i = 0; i < $scope.live.data.length; i++) {
                                $scope.liveMatch.push({
                                    competition: $scope.live.data[i].season.competition.name,
                                    home: $scope.live.data[i].team1.name,
                                    away: $scope.live.data[i].team2.name,
                                    homeLogo: $scope.live.data[i].team1.duplicateLogo,
                                    awayLogo: $scope.live.data[i].team2.duplicateLogo,
                                    matchId: $scope.live.data[i].match.matchId,
                                    starts: $scope.live.data[i].match.startingDateTime,
                                    teams: {
                                        team1: $scope.live.data[i].team1,
                                        team2: $scope.live.data[i].team2
                                    },
                                    picked: $scope.matchCard.indexOf($scope.live.data[i].match._id) != -1
                                });
                            }
                            $scope.calculateViewport($scope.liveMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.toastContent = $('<span>Something went Wrong</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    
                } else {
                    
                        if ($scope.live.status == "success") {
                            $scope.liveMatch = [];
                            for (var i = 0; i < $scope.live.data.length; i++) {
                                $scope.liveMatch.push({
                                    competition: $scope.live.data[i].season.competition.name,
                                    home: $scope.live.data[i].team1.name,
                                    away: $scope.live.data[i].team2.name,
                                    homeLogo: $scope.live.data[i].team1.duplicateLogo,
                                    awayLogo: $scope.live.data[i].team2.duplicateLogo,
                                    matchId: $scope.live.data[i].match.matchId,
                                    starts: $scope.live.data[i].match.startingDateTime,
                                    teams: {
                                        team1: $scope.live.data[i].team1,
                                        team2: $scope.live.data[i].team2
                                    },
                                    picked: false
                                });
                            }
                            $scope.calculateViewport($scope.liveMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.toastContent = $('<span> Something Went Wrong</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    
                }
            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }
        };

        /**
         * @ngdoc method
         * @name layout
         * @methodOf: getHistoryMatch
         * @description get History match details
         * @param 
         * @returns 
         */
        $scope.getHistoryMatch = function() {
            try {
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.historyMatch;
                if ($scope.loginStatus) {
                    
                        if ($scope.history.status == "success") {
                            $scope.historyMatch = [];
                            for (var i = 0; i < $scope.history.data.length; i++) {
                                $scope.historyMatch.push({
                                    competition: $scope.history.data[i].season.competition.name,
                                    home: $scope.history.data[i].team1.name,
                                    away: $scope.history.data[i].team2.name,
                                    homeLogo: $scope.history.data[i].team1.duplicateLogo,
                                    awayLogo: $scope.history.data[i].team2.duplicateLogo,
                                    matchId: $scope.history.data[i].match.matchId,
                                    starts: $scope.history.data[i].match.startingDateTime,
                                    homeScore: $scope.history.data[i].match.team1Score,
                                    awayScore: $scope.history.data[i].match.team2Score,
                                    teams: {
                                        team1: $scope.history.data[i].team1,
                                        team2: $scope.history.data[i].team2
                                    },
                                    picked: $scope.matchCard.indexOf($scope.history.data[i].match._id) != -1
                                });
                            }
                            $scope.calculateViewport($scope.historyMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.toastContent = $('<span> errror </span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    
                } else {
                   
                        if ($scope.history.status == "success") {
                            $scope.historyMatch = [];
                            for (var i = 0; i <$scope.history.data.length; i++) {
                                $scope.historyMatch.push({
                                    competition: $scope.history.data[i].season.competition.name,
                                    home: $scope.history.data[i].team1.name,
                                    away: $scope.history.data[i].team2.name,
                                    homeLogo: $scope.history.data[i].team1.duplicateLogo,
                                    awayLogo: $scope.history.data[i].team2.duplicateLogo,
                                    matchId: $scope.history.data[i].match.matchId,
                                    starts: $scope.history.data[i].match.startingDateTime,
                                    homeScore: $scope.history.data[i].match.team1Score,
                                    awayScore: $scope.history.data[i].match.team2Score,
                                    teams: {
                                        team1: $scope.history.data[i].team1,
                                        team2: $scope.history.data[i].team2
                                    },
                                    picked: false
                                });
                            }
                            $scope.calculateViewport($scope.historyMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.toastContent = $('<span>' + $scope.history.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    
                }

            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }
        };

        /**
         * @ngdoc method
         * @name layout
         * @methodOf: tabNavigation
         * @description Tab Navigation
         * @param 
         * @returns 
         */
        $scope.setTab = function(newTab) {
            $scope.tab = newTab;
            if (newTab === "live") {
                $scope.matchLoader = true;
                $scope.getLiveMatch();
            } else if (newTab === "history") {
                $scope.matchLoader = true;
                $scope.getHistoryMatch();
            } else {
                $scope.matchLoader = true;
                $scope.getUpcomingMatch();
            }
        };

        $scope.isActiveTab = function(tabNum) {
            return $scope.tab == tabNum;
        };

        /**
         * @ngdoc method
         * @name layout
         * @methodOf: setHeight
         * @description Set Height Of Div
         * @param 
         * @returns 
         */
        $scope.calculateViewport = function(response) {
            if (response.length > 3) {
                angular.element('.sidenav-content').addClass('sidenav-content-flow');
            } else {
                angular.element('.sidenav-content').removeClass('sidenav-content-flow');
            }
        };

        /**
         * @ngdoc method
         * @name layout
         * @methodOf: redirectPage
         * @description get Redirect Page
         * @param 
         * @returns 
         */
        $scope.gotoPage = function(index, match, tabStatus, element) {
            try {
                var str;                
                if ($scope.loginStatus) {
                    if($scope.matchDetails!=undefined){
                    if($scope.matchDetails.matchId!=match.matchId) {                      
                    if ($rootScope.playerListData.length == 0) {
                        if (tabStatus === "upcoming") {                            
                            window.sessionStorage.pageName = "upcoming";
                            str = JSON.stringify(match);
                            angular.element('li.upcomingmatch').removeClass('active');
                            angular.element('#' + element.target.id).addClass('active');
                            window.sessionStorage.match = JSON.stringify(match);
                            $scope.matchDetails = JSON.parse(window.sessionStorage.match);
                            $rootScope.matchChange = match;
                            $rootScope.loader = true;
                            $scope.loadfalse=str;
                            $commons.navigate('layout.upcoming', str, false);
                        } else if (tabStatus === "live") {
                            $scope.pagename = "live";
                            str = JSON.stringify(match);
                            window.sessionStorage.pageName = "live";                            
                            angular.element('li.upcomingmatch').removeClass('active');
                            angular.element('#' + element.target.id).addClass('active');
                            window.sessionStorage.match = JSON.stringify(match);
                            $rootScope.liveChange = match;
                            $commons.navigate('layout.live', str, false);
                        } else {
                            $scope.pagename = "history";
                            str = JSON.stringify(match);
                            window.sessionStorage.pageName = "history";                           
                            angular.element('li.upcomingmatch').removeClass('active');
                            angular.element("#" + element.target.id).addClass('active');
                            window.sessionStorage.match = JSON.stringify(match);
                            $rootScope.historyChange = match;
                            $commons.navigate('layout.history', str, false);
                        }
                    } else {
                        $commons.showWarning("#warningModal", "", true);
                        $scope.redirecturl = {
                            "index": index,
                            "match": match,
                            "tabStatus": tabStatus,
                            "element": element
                        };
                    } }}else{
                if ($rootScope.playerListData.length == 0) {
                        if (tabStatus === "upcoming") {                            
                            window.sessionStorage.pageName = "upcoming";
                            str = JSON.stringify(match);
                            angular.element('li.upcomingmatch').removeClass('active');
                            angular.element('#' + element.target.id).addClass('active');
                            window.sessionStorage.match = JSON.stringify(match);
                            $scope.matchDetails = JSON.parse(window.sessionStorage.match);
                            $rootScope.matchChange = match;
                            $rootScope.loader = true;
                            $scope.loadfalse=str;
                            $commons.navigate('layout.upcoming', str, false);
                        } else if (tabStatus === "live") {
                            $scope.pagename = "live";
                            str = JSON.stringify(match);
                            window.sessionStorage.pageName = "live";                            
                            angular.element('li.upcomingmatch').removeClass('active');
                            angular.element('#' + element.target.id).addClass('active');
                            window.sessionStorage.match = JSON.stringify(match);
                            $rootScope.liveChange = match;
                            $commons.navigate('layout.live', str, false);
                        } else {
                            $scope.pagename = "history";
                            str = JSON.stringify(match);
                            window.sessionStorage.pageName = "history";                           
                            angular.element('li.upcomingmatch').removeClass('active');
                            angular.element("#" + element.target.id).addClass('active');
                            window.sessionStorage.match = JSON.stringify(match);
                            $rootScope.historyChange = match;
                            $commons.navigate('layout.history', str, false);
                        }
                    } else {
                        $commons.showWarning("#warningModal", "", true);
                        $scope.redirecturl = {
                            "index": index,
                            "match": match,
                            "tabStatus": tabStatus,
                            "element": element
                        };
                    }}
                } else {
                    window.sessionStorage.match = JSON.stringify(match);
                    $rootScope.matchChange = match;
                    $scope.redirecturl = {
                        "index": index,
                        "match": match,
                        "tabStatus": tabStatus,
                        "element": element
                    };
                    $scope.authEnable("login");
                }
            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }
        };

        /**
         * @ngdoc method
         * @name layout
         * @methodOf: dropdown
         * @description Dropdown Menu Function
         * @param 
         * @returns 
         */
        $('html').click(function(e) {
            var target = e.target.className;
            if (target == "setting-menu dropdown-button") {
                $('.setting-menu').addClass('active');
                $('ul.drop-menu').addClass('active');
            } else {
                $('.setting-menu').removeClass('active');
                $('ul.drop-menu').removeClass('active');
            }
        });

        $('.username').on('keypress', function(event) {
            var regex = new RegExp("^[a-zA-Z0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        });
        /**
         * @ngdoc method
         * @name layout
         * @methodOf: dropdownNavigation
         * @description Dropdown Menu Navigation
         * @param 
         * @returns 
         */
        $scope.gotoNavigate = function(pageName) {
            $scope.sidemenu = false;
            $scope.pagename = pageName;
            window.sessionStorage.pageName = pageName;
            if (pageName === 'profile') {
                $commons.navigate('layout.profile', '', false);
            } else if (pageName === 'store') {
                $commons.navigate('layout.store', '', false);
            } else if (pageName === 'point') {
                $commons.navigate('layout.points', '', false);
            } else if (pageName === 'rules') {
                $commons.navigate('layout.rules', '', false);
            } else if (pageName === 'contact') {
                $commons.navigate('layout.contact', '', false);
            } else if (pageName == "home") {
                $commons.navigate("layout.dashboard", '', false);
            } else {
                $commons.navigate('layout.setting', '', false);
            }
        };

        /**
         * @ngdoc method
         * @name layout
         * @methodOf: Login
         * @description Login Function
         * @param 
         * @returns 
         */
        $scope.login = function(formvalid) {
            $scope.loginSubmit = true;
            if (formvalid) {
                $rootScope.loader = true;
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.login;
                fantumnService.post(url, $scope.user).then(function(res) {
                    if (res && res.data.status == "success") {
                        $rootScope.loader = false;                        
                        window.sessionStorage.userDetail = JSON.stringify(res.data.data);
                        var now = new Date();
                        now.setDate(now.getDate() + 7);
                        $cookies.put('userInfo', window.sessionStorage.userDetail, {
                            expires: now
                        });
                        $scope.loginSubmit = false;
                        $scope.closeAuth();
                        $scope.userInfo = JSON.parse(window.sessionStorage.userDetail);                        
                        var str = JSON.stringify(window.sessionStorage.match);
                         $scope.userD = JSON.parse(window.sessionStorage.userDetail);
                          $scope.loginStatus = true;
                          $scope.lead();
                        var model2 ={
                            "_id": $scope.userD._id
                        }
                        var url1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.updateProfile;
                                 fantumnService.post(url1, model2).then(function(res1) {
                            if (res1 && res1.data.status == "success") {                       
                                $scope.name1 =res1.data.data.firstName;                                
                                if($scope.name1==null){
                                    $scope.name =res1.data.data.username;
                                }
                                else{
                                  $scope.name =res1.data.data.firstName  
                                }}
                              });
                             
                        
                        
                        if ($scope.redirecturl != "") {
                            $scope.gotoPage($scope.redirecturl.index, $scope.redirecturl.match, $scope.redirecturl.tabStatus, $scope.redirecturl.element);
                        } else {
                            $commons.navigate('layout.dashboard', {}, false);
                        }
                        
                    } else {
                        $rootScope.loader = false;
                        $scope.loginauthError = res.data.error;
                        $scope.toastContent = $scope.loginauthError;
                        Materialize.toast($scope.toastContent, 3000);
                    }
                });
                
               
            }
            
        };

        $scope.register = function(formValid) {
            $scope.registerSubmit = true;            
            if (formValid) {
                if ($scope.agreeRegister) {                    
                        $rootScope.loader = true;
                        var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.register;
                        var hash = $scope.userDetail.email.trim();
                        hash = hash.toLowerCase();
                        hash = md5.createHash(hash);
                        var avatar = 'https://www.gravatar.com/avatar/' + hash + '?s=200&d=mm';
                        $scope.userDetail.avatar = avatar;
                        var model = {
                            "username": $scope.userDetail.username,
                            "email": $scope.userDetail.email,                            
                            "password": $scope.userDetail.password,                           
                            "social_auth": false,
                            "digitalSignature": $scope.agreeRegister,
                            "facebook": {
                                "social_id": null,
                                "auth_token": null,
                                "profile": null
                            },
                            "google": {
                                "accessToken": null,
                                "idToken": null,
                                "imgUrl": null
                            }
                        };                       
                        fantumnService.post(url, model).then(function(res) {
                            $rootScope.loader = false;
                            if (res && res.data.status == "success") {
                                $scope.loginStatus = true;
                                window.sessionStorage.userDetail = JSON.stringify(res.data.data);
                                var now = new Date();
                                now.setDate(now.getDate() + 7);
                                $cookies.put('userInfo', window.sessionStorage.userDetail, {
                                    expires: now
                                });
                                $scope.userData = JSON.parse(window.sessionStorage.userDetail);                                
                                 var model2 ={
                                     "_id": $scope.userData._id
                                       }
                                var url1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.updateProfile;
                                 fantumnService.post(url1, model2).then(function(res1) {                                     
                                 if (res1 && res1.data.status == "success") {   
                                  $scope.name =res1.data.data.username;
                                }
                              });
                                $scope.userInfo = res.data.data;
                                $scope.lol();
                                $scope.closeAuth();
                                if ($scope.redirecturl != "") {
                                    $scope.gotoPage($scope.redirecturl.index, $scope.redirecturl.match, $scope.redirecturl.tabStatus, $scope.redirecturl.element);
                                } else {
                                    $commons.navigate('layout.dashboard', {}, false);
                                }
                                
                            } else {
                                $scope.error = "";
                                 if (res.data.error == '{ "username": "Invalid username" }') {
                                    $scope.error = "UserName Already taken. Please Use Another Username !";
                                } else if (res.data.error == '{"username": "Invalid username" }') {
                                    $scope.error = "UserName Already taken ";
                                } else {
                                    $scope.error = res.data.error;
                                }
                                $scope.toastContent = $scope.error ;
                                Materialize.toast($scope.toastContent, 2000);
                            }
                        });
                    

                } else {
                    $scope.toastContent = 'Please Agree the Terms of Use';
                    Materialize.toast($scope.toastContent, 3000);
                }
            }
        };

        $scope.authEnable = function(pageName) {
            $scope.sidemenu = false;
            $scope.loginEnable = true;
            angular.element('.auth-content').css({
                'opacity': '1',
                "display": 'block'
            });
            $scope.backdrop = true;
            if (pageName == "login") {
                $scope.loginEnable = true;
                $scope.registerEnable = false;
                $scope.agreeRegister = false;
                $scope.registerSubmit = false;
                $scope.userDetail = {
                    "email": "",
                    "password": "",
                    "dob": "",
                    "username": "",
                    "avatar": ""
                };
            } else {
                $scope.user = {
                    "username": "",
                    "password": ""
                };
                $scope.loginSubmit = false;
                $scope.loginEnable = false;
                $scope.registerEnable = true;
            }
        };

        $scope.closeAuth = function() {
            angular.element('.auth-content').css({
                'opacity': '0',
                "display": 'none'
            });
            $scope.user = {
                "username": "",
                "password": ""
            };
            $scope.userDetail = {
                "email": "",
                "password": "",
                "dob": "",
                "username": "",
                "avatar": ""
            };
            $scope.agree = false;
            $scope.agreeRegister = false;
            $scope.backdrop = false;
            $scope.loginSubmit = false;
            $scope.registerSubmit = false;
        };


        $scope.sucesssClose = function() {
            angular.element("#successModal").removeClass("active");
            angular.element(".circle-loader").removeClass("load-complete");
            angular.element(".checkmark").css({
                "display": "none"
            });
            $rootScope.customLoader = false;
        };
        $scope.errorClose = function() {
            angular.element("#errorModal").removeClass("active");
            $rootScope.customLoader = false;
        };

        $scope.closeWarning = function() {
            angular.element("#warningModal").removeClass("active");
            $rootScope.customLoader = false;
        };

        $scope.openSideMenu = function() {
            $scope.sidemenu = false;
            angular.element('.responsive-sidemenutab').animate({
                left: '0',
                opacity: "1"
            });
            angular.element('.responsive-sidemenutab .backdrop').css({
                "display": "block"
            });
        };
        $scope.closeSideMenu = function() {
            angular.element('.responsive-sidemenutab').animate({
                left: '-400px',
                opacity: "0"
            });
            angular.element('.responsive-sidemenutab .backdrop').css({
                "display": "none"
            });
        };

        $scope.signupWithGoogle = function(type) {
            // if ($scope.agree) {
            var signInParams = "";
            if (type == "register") {
                if ($scope.agreeRegister) {
                    signInParams = {
                        'clientid': '436866997850-hm9udard1dquu5vjd6g2i8pgvtn7h0qq.apps.googleusercontent.com',
                        'cookiepolicy': 'single_host_origin',
                        'callback': 'loginCallback',
                        'approvalprompt': 'force',
                        "requestvisibleactions": "http://schemas.google.com/AddActivity",
                        'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
                    };
                    gapi.auth.signIn(signInParams);
                } else {
                    $scope.toastContent = 'Please Agree the Terms of Use';
                    Materialize.toast($scope.toastContent, 3000);
                }
            } else {
                $scope.agreeRegister = false;
                signInParams = {
                    'clientid': '436866997850-hm9udard1dquu5vjd6g2i8pgvtn7h0qq.apps.googleusercontent.com',
                    'cookiepolicy': 'single_host_origin',
                    'callback': 'loginCallback',
                    'approvalprompt': 'force',
                    "requestvisibleactions": "http://schemas.google.com/AddActivity",
                    'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
                };
                gapi.auth.signIn(signInParams);
            }
            // } else {
            //     $scope.toastContent = $('<span>Please Agree the Terms of Use</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
            //     Materialize.toast($scope.toastContent, 3000);
            // }
        };


        window.loginCallback = function(result) {
            if (result['status']['signed_in']) {
                gapi.client.load('plus', 'v1', function() {
                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    request.execute(function(resp) {                        
                        var user = {
                            "username": resp.result.name.givenName,
                            "name": resp.result.name.givenName,
                            "lastname":resp.result.familyName,
                            "email": resp.result.emails[0].value,
                            "gender": "",
                            "dob": new Date(),
                            "profile": resp.result.image.url,
                            "google_id": resp.result.id,
                            "auth_token": result.access_token,
                            "facebook_login": false
                        };
                        $scope.socialRegister(user);
                    });
                });


            }
        };

        $scope.signupWithFacebook = function(type) {
            if (type == "register") {
                if ($scope.agreeRegister) {
                    FB.login(function(response) {
                        var auth_token = response.authResponse.accessToken;
                        if (response.authResponse) {
                            FB.api('/me', {
                                    locale: 'en_US',
                                    fields: 'id,first_name,last_name,email,link,gender,locale,picture,birthday'
                                },
                                function(response) {                                   
                                    var user = {
                                        "username": response.first_name + response.last_name,
                                        "name": response.first_name ,
                                        "lastname": response.last_name,
                                        "email": response.email,
                                        "gender": response.gender,
                                        "dob": response.birthday,
                                        "profile": response.picture.data.url,
                                        "facebook_id": response.id,
                                        "auth_token": auth_token,
                                        "facebook_login": true,
                                        "google_login": false,
                                    };
                                    $scope.socialRegister(user);
                                });
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }, {
                        scope: 'email'
                    });
                } else {
                    $scope.toastContent = 'Please Agree the Terms of Use';
                    Materialize.toast($scope.toastContent, 3000);
                }
            } else {
                $scope.agreeRegister = false;
                FB.login(function(response) {
                    var auth_token = response.authResponse.accessToken;
                    if (response.authResponse) {
                        FB.api('/me', {
                                locale: 'en_US',
                                fields: 'id,first_name,last_name,email,link,gender,locale,picture,birthday'
                            },
                            function(response) {                                
                                var user = {
                                    "username": response.first_name + response.last_name,
                                    "name": response.first_name  ,
                                    "lastname": response.last_name,
                                    "email": response.email,
                                    "gender": response.gender,
                                    "dob": response.birthday,
                                    "profile": response.picture.data.url,
                                    "facebook_id": response.id,
                                    "auth_token": auth_token,
                                    "facebook_login": true
                                };
                                $scope.socialRegister(user);
                            });
                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, {
                    scope: 'email'
                });
            }
        };

        $scope.socialRegister = function(user) {            
            if (user.email != undefined) { 
            var url3 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.socialuser+ "/" +user.email;           
            var model2 ="";
            fantumnService.get(url3).then(function(res) {               
                if(res && res.data.status == "success"){
               $scope.f= res.data.data;               
               $scope.loginEnable=false;
                 $scope.registerEnable=false;
                $scope.SocailUsername=false;
                 window.sessionStorage.userDetail = JSON.stringify(res.data.data);
                        var now = new Date();
                        now.setDate(now.getDate() + 7);
                        $cookies.put('userInfo', window.sessionStorage.userDetail, {
                            expires: now
                        }); 
                        $scope.userInfo = JSON.parse(window.sessionStorage.userDetail); 
                        $scope.loginStatus = true;
                        $scope.lead();
                         var url1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.updateProfile;
                        model2 ={
                        "_id": $scope.f._id,
                    }
                        fantumnService.post(url1, model2).then(function(res1) {
                            if (res1 && res1.data.status == "success") {
                                $scope.name =res1.data.data.firstName;
                            }
                        });
                        
                        if ($scope.redirecturl != "") {
                            $scope.gotoPage($scope.redirecturl.index, $scope.redirecturl.match, $scope.redirecturl.tabStatus, $scope.redirecturl.element);
                        } else {
                            $commons.navigate('layout.dashboard', {}, false);
                            
                        }
                        
                        $scope.closeAuth();
                        
                }
            else{
                
                $scope.registerEnable=false;
                         $scope.loginEnable=false;
                         $scope.SocailUsername=true;           
                                     
                $scope.reg =function(formValid){                           
               if(formValid){                
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.register;
                var model = "";
                var model2 ="";
                if (user.facebook_login) {
                    model = {
                        "username": $scope.userDetail.username,
                        "email": user.email,
                        "password":"",
                        "social_auth": true,
                        "digitalSignature": $scope.agreeRegister,
                        "facebook": {
                            "social_id": user.facebook_id,
                            "auth_token": user.auth_token,
                            "profile": user.profile
                        },
                        "google": {
                            "accessToken": null,
                            "idToken": null,
                            "imgUrl": null
                        }
                      
                    };
                    
                } else {
                    model = {
                        "username": $scope.userDetail.username,
                        "email": user.email,                       
                        "password":"",
                        "social_auth": true,
                        "digitalSignature": $scope.agreeRegister,
                        "facebook": {
                            "social_id": null,
                            "auth_token": null,
                            "profile": null
                        },
                        "google": {
                            "accessToken": user.auth_token,
                            "idToken": user.google_id,
                            "imgUrl": user.profile
                        }
                       
                    };
                    
                }
                fantumnService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {                  
                         $scope.loginStatus = true;
                        $scope.userInfo = res.data.data;
                        model2 ={
                        "_id": $scope.userInfo._id,
                         "firstName": user.name,
                        "lastName": user.lastname,
                         "dob": user.dob,
                        "gender": user.gender
                    };
                        window.sessionStorage.userDetail = JSON.stringify(res.data.data);
                        var now = new Date();
                        now.setDate(now.getDate() + 7);
                        $cookies.put('userInfo', window.sessionStorage.userDetail, {
                            expires: now
                        });  
                        
                        $scope.lead();
                        var url1 = $rootScope.appConfig.baseUrl + $rootScope.appConfig.updateProfile;
                        fantumnService.post(url1, model2).then(function(res1) {
                            if (res1 && res1.data.status == "success") {
                                $scope.name =res1.data.data.firstName;
                            }
                        });
                        if ($scope.redirecturl != "") {
                            $scope.gotoPage($scope.redirecturl.index, $scope.redirecturl.match, $scope.redirecturl.tabStatus, $scope.redirecturl.element);
                        } else {
                            $commons.navigate('layout.dashboard', {}, false);
                            $scope.lol();
                        }
                        $scope.getUpcomingMatch();
                        $scope.closeAuth();
                    } else {
                        $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    }
                }, function(err) {
                    $scope.toastContent = err ;
                    Materialize.toast($scope.toastContent, 3000);
                });
                 }
             else {
                $scope.toastContent = 'Select Your username';
                Materialize.toast($scope.toastContent, 3000);
            }} }
            }); 
            } else {
                $scope.toastContent = 'Email address not available in Social Login';
                Materialize.toast($scope.toastContent, 3000);
            }
        };

        $scope.logout = function() {
            $cookies.remove("userInfo");
            window.sessionStorage.clear();
            $scope.sidemenu = false;
            $scope.loginStatus = false;
            $scope.getUpcomingMatch();
            $commons.navigate('layout.dashboard', {}, false);
        };

        $scope.showTermsOfCondition = function() {
            angular.element("#termsCondition").css({
                "display": "block",
                "opacity": "1"
            });
            $rootScope.customLoader = true;
            $scope.termsLoader = true;
        };

        $scope.closeTermsOfCondition = function() {
            angular.element("#termsCondition").css({
                "display": "none",
                "opacity": "0"
            });
            $scope.termsLoader = false;
            $rootScope.customLoader = false;
        };

        $scope.forgotOpen = function() {
            angular.element('.forgot-modalpopup').addClass('active');
            $scope.forgotDrop = true;
            $scope.emailStatus = true;
        };

        $scope.forgotPassword = function(valid) {
            $scope.forgotSubmit = true;
            if (valid) {
                $rootScope.loader = true;
                $scope.forgotSubmit = false;
                var model = {
                    "email": $scope.forgotEmail
                };
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.forgotPassword;
                fantumnService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.forgotEmail = "";
                        $scope.otpStatus = true;
                        $scope.emailStatus = false;
                        $scope.forgotError = false;
                        $scope.toastContent = 'OTP Send your Email id please check';
                        Materialize.toast($scope.toastContent, 3000);
                    } else {
                        if (res.data.error == "user not found") {
                            $scope.toastContent = $('<span>Email not found</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                            $scope.forgotError = true;
                            Materialize.toast($scope.toastContent, 3000);
                        } else {
                            $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    }
                }, function(err) {
                    $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                    Materialize.toast($scope.toastContent, 3000);
                });
                // $scope.forgotClose();
            }
        };
        $scope.getToken = function(valid) {
            $scope.otpForm = true;
            if (valid) {
                $rootScope.loader = true;
                $scope.otpForm = false;
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getResetToken + "/" + $scope.otp;
                fantumnService.get(url).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.userOtp = $scope.otp;
                        $scope.otp = "";
                        $scope.otpStatus = false;
                        $scope.passwordStatus = true;
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

        $scope.submitForgotPassword = function(valid) {
            $scope.submitForgotForm = true;
            if (valid) {
                $rootScope.loader = true;
                $scope.submitForgotForm = false;
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.resetPassword;
                var model = {
                    "token": $scope.userOtp,
                    "password": $scope.forgotPassCode
                };
                fantumnService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.otp = "";
                        $scope.otpStatus = false;
                        $scope.passwordStatus = true;
                        $scope.forgotClose();
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
        $scope.forgotClose = function() {
            angular.element('.forgot-modalpopup').removeClass('active');
            $scope.forgotDrop = false;
            $scope.emailStatus = true;
            $scope.otpStatus = false;
            $scope.passwordStatus = false;
            $scope.forgotEmail = "";
            $scope.otp = "";
            $scope.forgotPassCode = "";
            $scope.submitForgotForm = false;
            $scope.otpForm = false;
        };

        $scope.redirectCustom = function() {
            $rootScope.playerListData = [];
            $scope.gotoPage($scope.redirecturl.index, $scope.redirecturl.match, $scope.redirecturl.tabStatus, $scope.redirecturl.element);
            $scope.closeWarning();
        };

        $(document).on('click', '#toast-container .toast button', function() {
            var element = $(this).parent();
            $(element).fadeOut();
        });

        $scope.getViewportWidth = function() {
            var documetPort = $(window).width();
            if (documetPort <= 1023) {
                $scope.mobile = true;
            } else {
                $scope.mobile = false;
            }
        };
        $scope.$watch("pagename", function() {
            if (window.sessionStorage.pageName == "upcoming") {
                $scope.footerHide = true;
            } else if (window.sessionStorage.pageName == "setting") {
                $scope.footerHide = true;
            } else {
                $scope.footerHide = false;
            }
        });

        $scope.initFunction();

    }
}(window, angular);
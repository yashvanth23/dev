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
        .module("fandom")
        .registerCtrl('layoutController', layoutController);
    layoutController.$inject = ["$scope", "$rootScope", "$commons", "$logger", "$cookies", "fandomService", "exceptionService", "$q", "$interval", "md5", "$filter"];


    function layoutController($scope, $rootScope, $commons, $logger, $cookies, fandomService, exceptionService, $q, $interval, md5, $filter) {

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

                var userInfo = $cookies.get('userInfo');
                if (userInfo != undefined) {
                    window.sessionStorage.userDetail = userInfo;
                }
                if (window.sessionStorage.userDetail != undefined) {
                    if (window.sessionStorage.userDetail != "") {
                        $scope.userInfo = JSON.parse(window.sessionStorage.userDetail);
                        $scope.loginStatus = true;
                    }
                }
                if (window.sessionStorage.pageName == "upcoming") {
                    $scope.footerHide = true;
                } else if (window.sessionStorage.pageName == "setting") {
                    $scope.footerHide = true;
                } else {
                    $scope.footerHide = false;
                }

                $scope.getUpcomingMatch();

                setInterval(function() {
                    $scope.getUpcomingMatch();
                }, 60000);

                $scope.ageError = false;
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
        $scope.getUpcomingMatch = function() {
            try {
                if ($scope.loginStatus) {
                    var upcomingUrl = $rootScope.appConfig.baseUrl + $rootScope.appConfig.upcoming,
                        leaderboardUrl = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getLeaderBoard + "/" + $scope.userInfo.username;
                    var upcomingPromise = "",
                        leaderBoardPromise = "";
                    $q.all([
                        leaderBoardPromise = fandomService.get(leaderboardUrl),
                        upcomingPromise = fandomService.get(upcomingUrl)
                    ]).then(function() {
                        leaderBoardPromise.then(function(leaderboard) {
                            if (leaderboard && leaderboard.data.status == "success") {
                                $scope.matchCard = leaderboard.data.data.matchCards;

                            }
                        });
                        upcomingPromise.then(function(res) {
                            if (res && res.data.status == "success") {
                                $scope.upcomingMatch = [];
                                for (var i = 0; i < res.data.data.length; i++) {
                                    $scope.upcomingMatch.push({
                                        competition: res.data.data[i].season.competition.name,
                                        home: res.data.data[i].team1.name,
                                        away: res.data.data[i].team2.name,
                                        homeLogo: res.data.data[i].team1.logo,
                                        awayLogo: res.data.data[i].team2.logo,
                                        matchId: res.data.data[i].match.matchId,
                                        starts: res.data.data[i].match.startingDateTime,
                                        _id: res.data.data[i].match._id,
                                        picked: $scope.matchCard.indexOf(res.data.data[i].match._id) != -1,
                                        teams: {
                                            team1: res.data.data[i].team1,
                                            team2: res.data.data[i].team2
                                        },
                                        match: {
                                            lineup: res.data.data[i].match.lineup
                                        }
                                    });
                                }
                                $scope.calculateViewport($scope.upcomingMatch);
                                $scope.matchLoader = false;
                            } else {
                                $scope.upcomingMatch = res.data.error;
                            }
                        });
                    });
                } else {
                    var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.upcoming;
                    fandomService.get(url).then(function(res) {
                        if (res && res.data.status == "success") {
                            $scope.upcomingMatch = [];
                            for (var i = 0; i < res.data.data.length; i++) {
                                $scope.upcomingMatch.push({
                                    competition: res.data.data[i].season.competition.name,
                                    home: res.data.data[i].team1.name,
                                    away: res.data.data[i].team2.name,
                                    homeLogo: res.data.data[i].team1.logo,
                                    awayLogo: res.data.data[i].team2.logo,
                                    matchId: res.data.data[i].match.matchId,
                                    starts: res.data.data[i].match.startingDateTime,
                                    _id: res.data.data[i].match._id,
                                    picked: false,
                                    teams: {
                                        team1: res.data.data[i].team1,
                                        team2: res.data.data[i].team2
                                    },
                                    match: {
                                        lineup: res.data.data[i].match.lineup
                                    }
                                });
                            }
                            $scope.calculateViewport($scope.upcomingMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.upcomingMatch = res.data.error;
                        }
                    });
                }
            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }
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
                    fandomService.get(url).then(function(res) {
                        if (res && res.data.status == "success") {
                            $scope.liveMatch = [];
                            for (var i = 0; i < res.data.data.length; i++) {
                                $scope.liveMatch.push({
                                    competition: res.data.data[i].season.competition.name,
                                    home: res.data.data[i].team1.name,
                                    away: res.data.data[i].team2.name,
                                    homeLogo: res.data.data[i].team1.logo,
                                    awayLogo: res.data.data[i].team2.logo,
                                    matchId: res.data.data[i].match.matchId,
                                    starts: res.data.data[i].match.startingDateTime,
                                    teams: {
                                        team1: res.data.data[i].team1,
                                        team2: res.data.data[i].team2
                                    },
                                    picked: $scope.matchCard.indexOf(res.data.data[i].match._id) != -1
                                });
                            }
                            $scope.calculateViewport($scope.liveMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    }, function(err) {
                        $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    });
                } else {
                    fandomService.get(url).then(function(res) {
                        if (res && res.data.status == "success") {
                            $scope.liveMatch = [];
                            for (var i = 0; i < res.data.data.length; i++) {
                                $scope.liveMatch.push({
                                    competition: res.data.data[i].season.competition.name,
                                    home: res.data.data[i].team1.name,
                                    away: res.data.data[i].team2.name,
                                    homeLogo: res.data.data[i].team1.logo,
                                    awayLogo: res.data.data[i].team2.logo,
                                    matchId: res.data.data[i].match.matchId,
                                    starts: res.data.data[i].match.startingDateTime,
                                    teams: {
                                        team1: res.data.data[i].team1,
                                        team2: res.data.data[i].team2
                                    },
                                    picked: false
                                });
                            }
                            $scope.calculateViewport($scope.liveMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    }, function(err) {
                        $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    });
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
                    fandomService.get(url).then(function(res) {
                        if (res && res.data.status == "success") {
                            $scope.historyMatch = [];
                            for (var i = 0; i < res.data.data.length; i++) {
                                $scope.historyMatch.push({
                                    competition: res.data.data[i].season.competition.name,
                                    home: res.data.data[i].team1.name,
                                    away: res.data.data[i].team2.name,
                                    homeLogo: res.data.data[i].team1.logo,
                                    awayLogo: res.data.data[i].team2.logo,
                                    matchId: res.data.data[i].match.matchId,
                                    starts: res.data.data[i].match.startingDateTime,
                                    homeScore: res.data.data[i].match.team1Score,
                                    awayScore: res.data.data[i].match.team2Score,
                                    teams: {
                                        team1: res.data.data[i].team1,
                                        team2: res.data.data[i].team2
                                    },
                                    picked: $scope.matchCard.indexOf(res.data.data[i].match._id) != -1
                                });
                            }
                            $scope.calculateViewport($scope.historyMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    }, function(err) {
                        $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    });
                } else {
                    fandomService.get(url).then(function(res) {
                        if (res && res.data.status == "success") {
                            $scope.historyMatch = [];
                            for (var i = 0; i < res.data.data.length; i++) {
                                $scope.historyMatch.push({
                                    competition: res.data.data[i].season.competition.name,
                                    home: res.data.data[i].team1.name,
                                    away: res.data.data[i].team2.name,
                                    homeLogo: res.data.data[i].team1.logo,
                                    awayLogo: res.data.data[i].team2.logo,
                                    matchId: res.data.data[i].match.matchId,
                                    starts: res.data.data[i].match.startingDateTime,
                                    homeScore: res.data.data[i].match.team1Score,
                                    awayScore: res.data.data[i].match.team2Score,
                                    teams: {
                                        team1: res.data.data[i].team1,
                                        team2: res.data.data[i].team2
                                    },
                                    picked: false
                                });
                            }
                            $scope.calculateViewport($scope.historyMatch);
                            $scope.matchLoader = false;
                        } else {
                            $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    }, function(err) {
                        $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    });
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
                    if (tabStatus === "upcoming") {
                        $scope.pagename = "upcoming";
                        window.sessionStorage.pageName = "upcoming";
                        str = JSON.stringify(match);
                        angular.element('li.upcomingmatch').removeClass('active');
                        angular.element('#' + element.target.id).addClass('active');
                        window.sessionStorage.match = JSON.stringify(match);
                        $rootScope.matchChange = match;
                        $rootScope.loader = true;
                        $commons.navigate('layout.upcoming', str, false);
                    } else if (tabStatus === "live") {
                        $scope.pagename = "live";
                        window.sessionStorage.pageName = "live";
                        str = JSON.stringify(match);
                        angular.element('li.upcomingmatch').removeClass('active');
                        angular.element('#' + element.target.id).addClass('active');
                        window.sessionStorage.match = JSON.stringify(match);
                        $rootScope.liveChange = match;
                        $commons.navigate('layout.live', str, false);
                    } else {
                        $scope.pagename = "history";
                        window.sessionStorage.pageName = "history";
                        str = JSON.stringify(match);
                        angular.element('li.upcomingmatch').removeClass('active');
                        angular.element("#" + element.target.id).addClass('active');
                        window.sessionStorage.match = JSON.stringify(match);
                        $rootScope.historyChange = match;
                        $commons.navigate('layout.history', str, false);
                    }
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
                fandomService.post(url, $scope.user).then(function(res) {
                    if (res && res.data.status == "success") {
                        $rootScope.loader = false;
                        $scope.loginStatus = true;
                        window.sessionStorage.userDetail = JSON.stringify(res.data.data);
                        $cookies.put('userInfo', window.sessionStorage.userDetail);
                        $scope.closeAuth();
                        $scope.userInfo = res.data.data;
                        var str = JSON.stringify(window.sessionStorage.match);
                        if ($scope.redirecturl) {
                            $scope.gotoPage($scope.redirecturl.index, $scope.redirecturl.match, $scope.redirecturl.tabStatus, $scope.redirecturl.element);
                        } else {
                            $commons.navigate('layout.dashboard', {}, false);
                        }
                        $scope.getUpcomingMatch();
                    } else {
                        $rootScope.loader = false;
                        $scope.loginauthError = res.data.error;
                        $scope.toastContent = $('<span>' + $scope.loginauthError + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    }
                });
            }
        };

        $scope.register = function(formValid) {
            $scope.registerSubmit = true;
            if (formValid) {
                if ($scope.agreeRegister) {
                    var currentDate = new Date($scope.userDetail.dob);
                    var ageLimit = $filter("date")(currentDate, "yyyy");
                    // if (ageLimit "2004") {
                    $scope.ageError = false;
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
                        "dob": Date.now($scope.userDetail.dob),
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
                    console.log(model);
                    fandomService.post(url, model).then(function(res) {
                        $rootScope.loader = false;
                        if (res && res.data.status == "success") {
                            $scope.loginStatus = true;
                            window.sessionStorage.userDetail = JSON.stringify(res.data.data);
                            $cookies.put('userInfo', window.sessionStorage.userDetail);
                            $scope.userInfo = res.data.data;
                            $scope.closeAuth();
                            if ($scope.redirecturl) {
                                $scope.gotoPage($scope.redirecturl.index, $scope.redirecturl.match, $scope.redirecturl.tabStatus, $scope.redirecturl.element);
                            } else {
                                $commons.navigate('layout.dashboard', {}, false);
                            }
                            $scope.getUpcomingMatch();
                        } else {
                            $scope.error = "";
                            if (res.data.error == {
                                    "dob": "Invalid dob"
                                }) {
                                $scope.error = "Invalid Date Of Birth. Please Select Valid Date Of Birth !";
                            } else if (res.data.error == '{ "username": "Invalid username" }') {
                                $scope.error = "UserName Already taken. Please Use Another Username !";
                            } else if (res.data.error == '{ "dob": "Invalid dob", "username": "Invalid username" }') {
                                $scope.error = "UserName Already taken And Invalid Date Of Birth !";
                            } else {
                                $scope.error = res.data.error;
                            }
                            $scope.toastContent = $('<span>' + $scope.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    });
                    // } else {
                    //     $scope.ageError = true;
                    // }

                } else {
                    $scope.toastContent = $('<span>Please Agree the Terms of Use</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
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
            } else {
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
            $scope.registerSubmit = false;
            $scope.loginSubmit = false;
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

        $scope.signupWithGoogle = function() {
            if ($scope.agree) {
                var signInParams = {
                    'clientid': '436866997850-hm9udard1dquu5vjd6g2i8pgvtn7h0qq.apps.googleusercontent.com',
                    'cookiepolicy': 'single_host_origin',
                    'callback': 'loginCallback',
                    'approvalprompt': 'force',
                    "requestvisibleactions": "http://schemas.google.com/AddActivity",
                    'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
                };
                gapi.auth.signIn(signInParams);
            } else {
                $scope.toastContent = $('<span>Please Agree the Terms of Use</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                Materialize.toast($scope.toastContent, 3000);
            }
        };


        window.loginCallback = function(result) {
            console.log(result);
            if (result['status']['signed_in']) {
                gapi.client.load('plus', 'v1', function() {
                    var request = gapi.client.plus.people.get({
                        'userId': 'me'
                    });
                    request.execute(function(resp) {
                        console.log(resp);
                    });
                });


            }
        }




        // function onLoadCallback() {
        //     gapi.client.setApiKey('PUT_YOUR_KEY');
        //     gapi.client.load('plus', 'v1', function() {});
        // }

        $scope.signupWithFacebook = function(type) {
            if (type == "register") {
                if ($scope.agreeRegister) {
                    FB.login(function(response) {
                        console.log(response);
                        var auth_token = response.authResponse.accessToken;
                        if (response.authResponse) {
                            FB.api('/me', {
                                    locale: 'en_US',
                                    fields: 'id,first_name,last_name,email,link,gender,locale,picture,birthday'
                                },
                                function(response) {
                                    console.log(response);
                                    var user = {
                                        "username": response.first_name + response.last_name,
                                        "name": response.first_name + response.last_name,
                                        "email": response.email,
                                        "gender": response.gender,
                                        "dob": response.birthday,
                                        "profile": response.picture.data.url,
                                        "facebook_id": response.id,
                                        "auth_token": auth_token,
                                        "facebook_login": true
                                    };
                                    console.log(user);
                                    $scope.socialRegister(user);
                                });
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }, {
                        scope: 'email'
                    });
                } else {
                    $scope.toastContent = $('<span>Please Agree the Terms of Use</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                    Materialize.toast($scope.toastContent, 3000);
                }
            } else {
                $scope.agreeRegister = false;
                FB.login(function(response) {
                    console.log(response);
                    var auth_token = response.authResponse.accessToken;
                    if (response.authResponse) {
                        FB.api('/me', {
                                locale: 'en_US',
                                fields: 'id,first_name,last_name,email,link,gender,locale,picture,birthday'
                            },
                            function(response) {
                                console.log(response);
                                var user = {
                                    "username": response.first_name + response.last_name,
                                    "name": response.first_name + response.last_name,
                                    "email": response.email,
                                    "gender": response.gender,
                                    "dob": response.birthday,
                                    "profile": response.picture.data.url,
                                    "facebook_id": response.id,
                                    "auth_token": auth_token,
                                    "facebook_login": true
                                };
                                console.log(user);
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
                $rootScope.loader = true;
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.register;
                var model = "";
                if (user.facebook_login) {
                    model = {
                        "username": user.name,
                        "email": user.email,
                        "dob": user.dob,
                        "password": "",
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
                        },
                        "name": user.name,
                        "gender": user.gender
                    };
                } else {
                    model = {
                        "username": user.name,
                        "email": user.email,
                        "dob": user.dob,
                        "password": "",
                        "social_auth": true,
                        "digitalSignature": $scope.agreeRegister,
                        "facebook": {
                            "social_id": "",
                            "auth_token": "",
                            "profile": ""
                        },
                        "google": {
                            "accessToken": user.accessToken,
                            "idToken": user.idToken,
                            "imgUrl": user.imgUrl
                        },
                        "name": user.name,
                        "gender": user.gender
                    };
                }
                console.log(model);
                fandomService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.loginStatus = true;
                        $scope.userInfo = res.data.data;
                        window.sessionStorage.userDetail = JSON.stringify(res.data.data);
                        $cookies.put('userInfo', window.sessionStorage.userDetail);
                        if ($scope.redirecturl) {
                            $scope.gotoPage($scope.redirecturl.index, $scope.redirecturl.match, $scope.redirecturl.tabStatus.$scope.redirecturl.element);
                        } else {
                            $commons.navigate('layout.dashboard', {}, false);
                        }
                        $scope.getUpcomingMatch();
                        $scope.closeAuth();
                    } else {
                        $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    }
                }, function(err) {
                    $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                    Materialize.toast($scope.toastContent, 3000);
                });
            } else {
                $scope.toastContent = $('<span>Email address not available in Social Login</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                Materialize.toast($scope.toastContent, 3000);
            }
        };

        $scope.logout = function() {
            $cookies.remove("userInfo");
            window.sessionStorage.clear();
            $scope.sidemenu = false;
            $scope.loginStatus = false;
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
                fandomService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.forgotEmail = "";
                        $scope.otpStatus = true;
                        $scope.emailStatus = false;
                        $scope.toastContent = $('<span>OTP Send your Email id please check</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    } else {
                        if (res.data.error == "user not found") {
                            $scope.toastContent = $('<span>Email not found</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        } else {
                            $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                            Materialize.toast($scope.toastContent, 3000);
                        }
                    }
                }, function(err) {
                    $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
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
                fandomService.get(url).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.userOtp = $scope.otp;
                        $scope.otp = "";
                        $scope.otpStatus = false;
                        $scope.passwordStatus = true;
                    } else {
                        $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    }
                }, function(err) {
                    $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
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
                fandomService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.otp = "";
                        $scope.otpStatus = false;
                        $scope.passwordStatus = true;
                        $scope.forgotClose();
                    } else {
                        $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
                        Materialize.toast($scope.toastContent, 3000);
                    }
                }, function(err) {
                    $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action" onclick="closeToast()">OK</button>'));
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

        function closeToast() {
            var toastElement = $('.toast').first()[0];
            var toastInstance = toastElement.M_Toast;
            toastInstance.remove();
        }

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
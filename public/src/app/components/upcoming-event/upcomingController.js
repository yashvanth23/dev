/**
 * @Filename : upcomingController.js
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
 * @name upcomingController
 * @description
 * 
 */

+(function(window, angular) {
    "use strict";
    angular.module("fantumn").registerCtrl("upcomingCtrl", upcomingCtrl);
    upcomingCtrl.$inject = ["$scope", "$rootScope", "$commons", "$logger", "fantumnService", "exceptionService", "$window", "$filter", "$q"];

    function upcomingCtrl($scope, $rootScope, $commons, $logger, fantumnService, exceptionService, $window, $filter,$timeout, $q) {
        if (window.sessionStorage.userDetail != undefined) {
                    if (window.sessionStorage.userDetail != "") {
                        //start up fuction loads when screen loads
        $scope.initFunction = function() {
            $scope.matchDetails = JSON.parse(window.sessionStorage.match);
            $scope.userDetailInfo = JSON.parse(window.sessionStorage.userDetail);
           // $scope.countdown = $scope.matchDetails.starts;
            setInterval(function() {
                    $scope.countdown1 = $scope.matchDetails.starts;
                     var countDownDate = new Date($scope.countdown1).getTime();
                     var now = new Date().getTime();  
                     var distance = countDownDate - now;
                     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                     
                           if(minutes.length==1)
                               minutes="0" +minutes; 
                   if(days==0){                         
                      if(hours==0){
                      $scope.countdown2 = minutes + ":" + seconds; 
                                   }else{
                                       if(hours.length ==1)
                                         hours="0" +hours;
                                         $scope.countdown2 = hours+ ":" + minutes + ":" + seconds;
                                     }
                              }else
                               $scope.countdown2 = days + "D:" + hours+ ":" + minutes + ":" + seconds; 
                           
                    }, 1000);
            $scope.home = {
                id: $scope.matchDetails.teams.team1.teamId,
                name: $scope.matchDetails.teams.team1.name
            };
            $scope.away = {
                id: $scope.matchDetails.teams.team2.teamId,
                name: $scope.matchDetails.teams.team2.name
            };
            $scope.playerTab = "all";
            $scope.playType = {
                def: true,
                mid: true,
                fk: true,
                gk: true
            };
            setInterval(function(){
            if($scope.colo=='yellow'){
             $scope.colo='';             
             $scope.mov='-40px';
         } else{
             $scope.colo='yellow';             
              $scope.mov='-20px';
         }
         angular.element('.chat1').css({
                "border-color": $scope.colo,
                "color":'white',
                "top":$scope.mov
            });
           },500);
           $scope.backdrop=false;
           setInterval(function(){
            if($scope.color=='yellow'){
             $scope.color='';             
             $scope.move='-70px';
         } else{
             $scope.color='yellow';             
              $scope.move='-50px';
         }
         angular.element('.chat2').css({
                "border-color": $scope.color,
                "color":'white',
                "top":$scope.move
            });
           },500);
            $scope.defcheck=[];
            $scope.midcheck=[];
            $scope.fwdcheck=[];
            $scope.gkcheck=[];
            $scope.guideupcoming=false;
            $scope.guidereview=false;            
            $scope.defcontent="Select Four defender ";
            $scope.reviewcontent="Review Your Team";
              setInterval(function() {
            Materialize.Toast.removeAll();            
                },3000);
                $scope.check();
            $scope.goalKeep = 1,
                $scope.defPlayer = 1,
                $scope.midPlayer = 1,
                $scope.fwdPlayer = 1;
            $scope.userInfo = JSON.parse(window.sessionStorage.userDetail);
            $scope.playerList = [];
            $scope.reviewList = [];
            $scope.show_toast="";
            $scope.logic = "Logic : Show everything Line by line.";
            $scope.teamJerSey = [{
                    teamId: "52",
                    jersey: "assets/images/jersey/AFC_Bournemouth.png",
                    position: "all"
                },
                {
                    teamId: "19",
                    jersey: "assets/images/jersey/Arsenal.png",
                    position: "all"
                },
                {
                    teamId: "78",
                    jersey: "assets/images/jersey/Brighton&_Hove_Albion.png",
                    position: "all"
                },
                {
                    teamId: "27",
                    jersey: "assets/images/jersey/Burnley.png",
                    position: "all"
                },
                {
                    teamId: "18",
                    jersey: "assets/images/jersey/Chelsea.png",
                    position: "all"
                },
                {
                    teamId: "51",
                    jersey: "assets/images/jersey/Crystal_Palace.png",
                    position: "all"
                },
                {
                    teamId: "13",
                    jersey: "assets/images/jersey/Everton.png",
                    position: "all"
                },
                {
                    teamId: "251",
                    jersey: "assets/images/jersey/Huddersfield_Town.png",
                    position: "all"
                },
                {
                    teamId: "42",
                    jersey: "assets/images/jersey/Leicester_City.png",
                    position: "all"
                },
                {
                    teamId: "8",
                    jersey: "assets/images/jersey/Liverpool.png",
                    position: "all"
                },
                {
                    teamId: "9",
                    jersey: "assets/images/jersey/Manchester_City.png",
                    position: "all"
                },
                {
                    teamId: "14",
                    jersey: "assets/images/jersey/Manchester_United.png",
                    position: "all"
                },
                {
                    teamId: "20",
                    jersey: "assets/images/jersey/Newcastle_United.png",
                    position: "all"
                },
                {
                    teamId: "65",
                    jersey: "assets/images/jersey/Southampton.png",
                    position: "all"
                },
                {
                    teamId: "26",
                    jersey: "assets/images/jersey/Stoke_City.png",
                    position: "all"
                },
                {
                    teamId: "30",
                    jersey: "assets/images/jersey/Swansea_City.png",
                    position: "all"
                },
                {
                    teamId: "6",
                    jersey: "assets/images/jersey/Tottenham_Hotspur.png",
                    position: "all"
                },
                {
                    teamId: "25",
                    jersey: "assets/images/jersey/Watford.png",
                    position: "all"
                },
                {
                    teamId: "10",
                    jersey: "assets/images/jersey/West_Bromwich_Albion.png",
                    position: "all"
                },
                {
                    teamId: "1",
                    jersey: "assets/images/jersey/West_Ham_United.png",
                    position: "all"
                },
                {
                    teamId: "9876",
                    jersey: "assets/images/jersey/ATK.svg",
                    position: "all"
                },
                {
                    teamId: "2358",
                    jersey: "assets/images/jersey/Delhi_Dynamos.svg",
                    position: "all"
                },
                {
                    teamId: "7271",
                    jersey: "assets/images/jersey/Chennaiyin_FC.svg",
                    position: "all"
                },
                {
                    teamId: "3416",
                    jersey: "assets/images/jersey/MumbaiCity_Fc.svg",
                    position: "all"
                },
                {
                    teamId: "492",
                    jersey: "assets/images/jersey/Bengaluru_FC.svg",
                    position: "all"
                },
                {
                    teamId: "426",
                    jersey: "assets/images/jersey/PuneCity_FC.svg",
                    position: "all"
                },
                {
                    teamId: "2768",
                    jersey: "assets/images/jersey/North_EastUnited.svg",
                    position: "all"
                },
                {
                    teamId: "435",
                    jersey: "assets/images/jersey/FC_Goa.svg",
                    position: "all"
                },
                {
                    teamId: "780",
                    jersey: "assets/images/jersey/Kerala_Blasters.svg",
                    position: "all"
                },
                {
                    teamId: "134418",
                    jersey: "assets/images/jersey/Jamshedpur_Fc.svg",
                    position: "all"
                }
            ];

            $scope.goalKeeJersey = [{
                    teamId: "52",
                    jersey: "assets/images/jersey/keeper/afc.png",
                    position: "GK"
                },
                {
                    teamId: "19",
                    jersey: "assets/images/jersey/keeper/Arsenal.png",
                    position: "GK"
                },
                {
                    teamId: "78",
                    jersey: "assets/images/jersey/keeper/Brighton_Hove_Albion.png",
                    position: "GK"
                },
                {
                    teamId: "27",
                    jersey: "assets/images/jersey/keeper/Burnley.png",
                    position: "GK"
                },
                {
                    teamId: "18",
                    jersey: "assets/images/jersey/keeper/Chelsea.png",
                    position: "GK"
                },
                {
                    teamId: "51",
                    jersey: "assets/images/jersey/keeper/Crystal_Palace.png",
                    position: "GK"
                },
                {
                    teamId: "13",
                    jersey: "assets/images/jersey/keeper/Everton.png",
                    position: "GK"
                },
                {
                    teamId: "251",
                    jersey: "assets/images/jersey/keeper/Huddersfield_Town.png",
                    position: "GK"
                },
                {
                    teamId: "42",
                    jersey: "assets/images/jersey/keeper/Leicester.png",
                    position: "GK"
                },
                {
                    teamId: "8",
                    jersey: "assets/images/jersey/keeper/Liverpool.png",
                    position: "GK"
                },
                {
                    teamId: "9",
                    jersey: "assets/images/jersey/keeper/Manchester_City.png",
                    position: "GK"
                },
                {
                    teamId: "14",
                    jersey: "assets/images/jersey/keeper/Manchester_United.png",
                    position: "GK"
                },
                {
                    teamId: "20",
                    jersey: "assets/images/jersey/keeper/Newcastle.png",
                    position: "GK"
                },
                {
                    teamId: "65",
                    jersey: "assets/images/jersey/keeper/Southampton.png",
                    position: "GK"
                },
                {
                    teamId: "26",
                    jersey: "assets/images/jersey/keeper/Stoke_City.png",
                    position: "GK"
                },
                {
                    teamId: "30",
                    jersey: "assets/images/jersey/keeper/Swansea_City.png",
                    position: "GK"
                },
                {
                    teamId: "6",
                    jersey: "assets/images/jersey/keeper/Tottenham_Hotspur.png",
                    position: "GK"
                },
                {
                    teamId: "25",
                    jersey: "assets/images/jersey/keeper/Watford.png",
                    position: "GK"
                },
                {
                    teamId: "10",
                    jersey: "assets/images/jersey/keeper/West_Bromwich.png",
                    position: "GK"
                },
                {
                    teamId: "1",
                    jersey: "assets/images/jersey/keeper/West_Ham_United.png",
                    position: "GK"
                },
                {
                    teamId: "426",
                    jersey: "assets/images/jersey/keeper/Pune_City.svg",
                    position: "GK"
                },
                {
                    teamId: "2768",
                    jersey: "assets/images/jersey/keeper/North_East_United_1.svg",
                    position: "GK"
                },{
                    teamId: "435",
                    jersey: "assets/images/jersey/keeper/Goa_1.svg",
                    position: "GK"
                },{
                    teamId: "780",
                    jersey: "assets/images/jersey/keeper/Kerala_Blasters_1.svg",
                    position: "GK"
                },{
                    teamId: "134418",
                    jersey: "assets/images/jersey/keeper/Jamshedpur_FC.svg",
                    position: "GK"
                },
                {
                    teamId: "9876",
                    jersey: "assets/images/jersey/keeper/ATK_1.svg",
                    position: "GK"
                },
                {
                    teamId: "2358",
                    jersey: "assets/images/jersey/keeper/Delhi_Dynamos_1.svg",
                    position: "GK"
                },{
                    teamId: "7271",
                    jersey: "assets/images/jersey/keeper/Chennaiyin_FC_1.svg",
                    position: "GK"
                },{
                    teamId: "3416",
                    jersey: "assets/images/jersey/keeper/MumbaiCity_FC.svg",
                    position: "GK"
                },{
                    teamId: "492",
                    jersey: "assets/images/jersey/keeper/Bengaluru_Fc.svg",
                    position: "GK"
                }
            ];
            $scope.review = false;
            $scope.toastContent = "";
            
            if ($scope.matchDetails.picked) {
                $scope.getLeaderBoard();
            } else {
                $scope.getPlayers();
            }
        };
        //guideline check
        $scope.check = function(){
         var leaderboardUrl = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getLeaderBoard + "/" + $rootScope.name;
              fantumnService.get(leaderboardUrl).then(function(leaderboard){                 
                                  if(leaderboard && leaderboard.data.status == "success"){
                                 $scope.matchCard = leaderboard.data.data.matchCards;   
                                
                             if($scope.matchCard.length==0){
                                 $scope.guideupcoming=true;
                                  $scope.backdrop=true;                             
                                 $scope.shouldcheck=true;
                                 angular.element('.upcoming-scheduleEvent').css({
                                  "margin-top": '-30px'
                                  
                            });
                           
                             }else{
                                  $scope.guideupcoming=false;
                              $scope.shouldcheck=false;
                              $scope.backdrop=false;
                               angular.element('ul.match-custom-btn').css({
                                  "margin-top": ''                                
                            }); 
                          }
                          } 
                         });
                     };
       //getting players for roster screen
        $scope.getPlayers = function() {
            try {
                $rootScope.loader =true;
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getPlayersInfo + "/" + $scope.matchDetails.matchId;
                fantumnService.get(url).then(function(res) {
                        if (res && res.data.status == "success") {
                            $scope.allPlayers = res.data.data;
                            
                            for (var i = 0; i < $scope.allPlayers.length; i++) {
                                $scope.allPlayers[i]["status"] = false;
                                if ($scope.allPlayers[i].playerPositionId == 1) {
                                    $scope.allPlayers[i]["positionPlay"] = "GK";
                                    $scope.allPlayers[i]["position"] = "1";
                                } else if ($scope.allPlayers[i].playerPositionId == 2) {
                                    $scope.allPlayers[i]["positionPlay"] = "DEF";
                                    $scope.allPlayers[i]["position"] = "2";
                                } else if ($scope.allPlayers[i].playerPositionId == 3) {
                                    $scope.allPlayers[i]["positionPlay"] = "MID";
                                    $scope.allPlayers[i]["position"] = "3";
                                } else {
                                    $scope.allPlayers[i]["positionPlay"] = "FW";
                                    $scope.allPlayers[i]["position"] = "4";
                                }
                            }                            
                            $scope.allhome=[];
                            $scope.allaway=[];
                            
                            for (var i = 0; i < $scope.allPlayers.length; i++){
                                $scope.d=[];
                            if($scope.allPlayers[i].playerDetails.teamId==$scope.home.id){
                                $scope.allhome.push({
                                    playerName:$scope.allPlayers[i].playerName,
                                    positionPlay:$scope.allPlayers[i].positionPlay,
                                    playerId :$scope.allPlayers[i].playerId,
                                    teamId:$scope.allPlayers[i].playerDetails.teamId,
                                    position:$scope.allPlayers[i].position,
                                    status:$scope.allPlayers[i].status
                                });
                            }else{                     
                                $scope.allaway.push({
                                    playerName:$scope.allPlayers[i].playerName,
                                    positionPlay:$scope.allPlayers[i].positionPlay,
                                     playerId :$scope.allPlayers[i].playerId,
                                     teamId:$scope.allPlayers[i].playerDetails.teamId,
                                     position:$scope.allPlayers[i].position,
                                     status:$scope.allPlayers[i].status
                                });
                            }
                            }
                            
                            $rootScope.loader = false;
                            $scope.matchStatus = false;
                            if ($scope.allPlayers.length >= 9) {
                                angular.element(".allplay").addClass("cus-scroll");
                            } else {
                                angular.element(".allplay").removeClass("cus-scroll");
                            }
                        } else {
                            $scope.historyMatch = res.data.error;
                        }
                    },
                    function(err) {
                        $scope.toastContent = 'Something went wrong';
                        Materialize.toast($scope.toastContent, 3000,'rounded');
                    }
                );
            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }
        };
//for history of the players
        $scope.getLeaderBoard = function() {
            $rootScope.loader = true;
            var leaderboardUrl = $rootScope.appConfig.baseUrl + $rootScope.appConfig.rosterPlayer + "/" + $scope.userDetailInfo._id + "/" + $scope.matchDetails.matchId,
                getPlayerUrl = $rootScope.appConfig.baseUrl + $rootScope.appConfig.getPlayersInfo + "/" + $scope.matchDetails.matchId;  
        
                     fantumnService.get(leaderboardUrl).then(function(res) {
                        if (res && res.data.status == "success") {
                            $scope.allLineup = res.data.data.match.lineup;
                            $scope.matchInfo = res.data.data.players;
                            $scope.playerList = [];
                            $scope.reviewList = [];
                            for (var k = 0; k < $scope.matchInfo.length; k++) {
                                for (var lineup = 0; lineup < $scope.allLineup.length; lineup++) {
                                    if ($scope.allLineup[lineup].playerId == $scope.matchInfo[k].playerId) {
                                        $scope.playerList.push({
                                            colorCode: "",
                                            iconId: "",
                                            playerId: $scope.matchInfo[k].playerId,
                                            id: $scope.matchInfo[k].playerId,
                                            playerName: $scope.matchInfo[k].name,
                                            positionId: $scope.matchInfo[k].positionId,
                                            position: $scope.matchInfo[k].position,
                                            teamId: $scope.allLineup[lineup].teamId,
                                            status: true
                                        });
                                        $scope.reviewList.push({
                                            colorCode: "",
                                            iconId: "",
                                            playerId: $scope.matchInfo[k].playerId,
                                            playerName: $scope.matchInfo[k].name,
                                            positionId: $scope.matchInfo[k].positionId,
                                            position: $scope.matchInfo[k].position,
                                            teamId: $scope.allLineup[lineup].teamId,
                                            status: true
                                        });
                                        if ($scope.playerList[k].positionId == 1) {
                                            $scope.reviewList[k]["positionPlay"] = "GK";
                                            $scope.playerList[k]["positionPlay"] = "GK";
                                        } else if ($scope.playerList[k].positionId == 2) {
                                            $scope.reviewList[k]["positionPlay"] = "DEF";
                                            $scope.playerList[k]["positionPlay"] = "DEF";
                                        } else if ($scope.playerList[k].positionId == 3) {
                                            $scope.reviewList[k]["positionPlay"] = "MID";
                                            $scope.playerList[k]["positionPlay"] = "MID";
                                        } else {
                                            $scope.reviewList[k]["positionPlay"] = "FW";
                                            $scope.playerList[k]["positionPlay"] = "FW";
                                        }
                                    }
                                }
                            }
                        }
                        $scope.matchStatus = true;
                        $scope.goalKeep = 2,
                            $scope.defPlayer = 5,
                            $scope.midPlayer = 4,
                            $scope.fwdPlayer = 4;
                        for (var playerList = 0; playerList < $scope.reviewList.length; playerList++) {
                            if ($scope.reviewList[playerList].positionPlay === "GK") {
                                for (var j = 0; j < $scope.goalKeeJersey.length; j++) {
                                    if ($scope.reviewList[playerList].teamId == $scope.goalKeeJersey[j].teamId) {
                                        $scope.reviewList[playerList]["image"] = $scope.goalKeeJersey[j].jersey;
                                    }
                                }
                            } else {
                                for (var i = 0; i < $scope.teamJerSey.length; i++) {
                                    if ($scope.reviewList[playerList].teamId == $scope.teamJerSey[i].teamId) {
                                        $scope.reviewList[playerList]["image"] =
                                            $scope.teamJerSey[i].jersey;
                                    }
                                }
                            }
                        }
                    });
                   fantumnService.get(getPlayerUrl).then(function(res) {
                        if (res && res.data.status == "success") {
                            $scope.allPlayers = res.data.data;
                            $rootScope.loader = false;                           
                            for (var i = 0; i < $scope.allPlayers.length; i++) {
                                 for (var j = 0; j < $scope.playerList.length; j++){
                                 if($scope.allPlayers[i].playerId == $scope.playerList[j].playerId) {                                
                                     $scope.allPlayers[i]["status"] = true;
                                 
                             }else{
                                     $scope.allPlayers[i]["status1"] = false;
                                 }
                                 }
                                if ($scope.allPlayers[i].playerPositionId == 1) {
                                    $scope.allPlayers[i]["positionPlay"] = "GK";
                                    $scope.allPlayers[i]["position"] = "1";
                                } else if ($scope.allPlayers[i].playerPositionId == 2) {
                                    $scope.allPlayers[i]["positionPlay"] = "DEF";
                                    $scope.allPlayers[i]["position"] = "2";
                                } else if ($scope.allPlayers[i].playerPositionId == 3) {
                                    $scope.allPlayers[i]["positionPlay"] = "MID";
                                    $scope.allPlayers[i]["position"] = "3";
                                } else {
                                    $scope.allPlayers[i]["positionPlay"] = "FW";
                                    $scope.allPlayers[i]["position"] = "4";
                                }
                            }
                            //spliting up screen into for home and away
                            $scope.allhome=[];
                            $scope.allaway=[];                            
                            for (var i = 0; i < $scope.allPlayers.length; i++){ 
                               
                            if($scope.allPlayers[i].playerDetails.teamId==$scope.home.id){
                               
                                $scope.allhome.push({
                                    playerName:$scope.allPlayers[i].playerName,
                                    positionPlay:$scope.allPlayers[i].positionPlay,
                                    playerId :$scope.allPlayers[i].playerId,
                                    teamId:$scope.allPlayers[i].playerDetails.teamId,
                                    position:$scope.allPlayers[i].position,
                                    status:$scope.allPlayers[i].status
                                });
                            }else{                     
                                $scope.allaway.push({
                                    playerName:$scope.allPlayers[i].playerName,
                                    positionPlay:$scope.allPlayers[i].positionPlay,
                                     playerId :$scope.allPlayers[i].playerId,
                                     teamId:$scope.allPlayers[i].playerDetails.teamId,
                                     position:$scope.allPlayers[i].position,
                                     status:$scope.allPlayers[i].status
                                });
                            }
                            }
                            
                            if ($scope.allPlayers.length >= 9) {
                                angular.element(".allplay").addClass("cus-scroll");
                            } else {
                                angular.element(".allplay").removeClass("cus-scroll");
                            }
                            filterArray($scope.allPlayers, $scope.playerList);
                        }
                    });
                
        };
        $scope.navigateTab = function(tabName) {
            try {
                $scope.playerTab = tabName;
            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }
        };

        $scope.navigateActiveTab = function(tab) {
            return $scope.playerTab === tab;
        };
        //slide changing button
        $scope.slider = function(slideName) {
            if (slideName === "prev") {
                if ($scope.playerTab === "all") {
                    $scope.navigateTab("gk");
                } else if ($scope.playerTab === "def") {
                    $scope.navigateTab("all");
                } else if ($scope.playerTab === "mid") {
                    $scope.navigateTab("def");
                } else if ($scope.playerTab === "fk") {
                    $scope.navigateTab("mid");
                } else if ($scope.playerTab === "gk") {
                    $scope.navigateTab("fk");
                }
            } else {
                if ($scope.playerTab === "all") {
                    $scope.navigateTab("def");
                } else if ($scope.playerTab === "def") {
                    $scope.navigateTab("mid");
                } else if ($scope.playerTab === "mid") {
                    $scope.navigateTab("fk");
                } else if ($scope.playerTab === "fk") {
                    $scope.navigateTab("gk");
                } else if ($scope.playerTab === "gk") {
                    $scope.navigateTab("all");
                }
            }
        };
        
        // adding player from rosterscreeen
        $scope.addPlayer = function(player, index, sec) {
            var defTeam = [],
                midTeam = [],
                fkTeam = [];
            if (!player.status) {
                if ($scope.playerList.length < 11) {
                    if (player.position === "1") {
                        if ($scope.goalKeep == 1) {
                            $scope.playerList.push(player);
                            $scope.reviewPush(player);
                             $scope.gkcheck.push(player);
                            $scope.findStatus(player.playerId,sec);
                            $scope.goalKeep++;
                        } else {
                            $scope.toastContent = 'Already selected goal keeper';                         
                             Materialize.toast($scope.toastContent, 3000,'rounded');

                        }
                    } else if (player.position === "2") {
                        if ($scope.defPlayer <= 4) {
                            if ($scope.defPlayer == 4) {
                                for (var i = 0; i < $scope.playerList.length; i++) {
                                    if ($scope.playerList[i].position == "2") {
                                        if (player.teamId == $scope.playerList[i].teamId) {
                                            defTeam.push($scope.playerList[i].teamId);
                                        }
                                    }
                                }
                                if (defTeam.length == 3) {
                                    $scope.defPlayer--;
                                    $scope.toastContent = 'Cannot select 4 defenders same team';
                                    Materialize.toast($scope.toastContent,3000,'rounded');
                                } else {
                                    $scope.playerList.push(player);
                                    $scope.reviewPush(player);
                                    $scope.defcheck.push(player);
                                    $scope.findStatus(player.playerId,sec);
                                    $rootScope.playerListData = $scope.playerList;
                                }
                            } else {
                                $scope.playerList.push(player);
                                $scope.reviewPush(player);
                                $scope.defcheck.push(player);
                                $scope.findStatus(player.playerId,sec);
                                $rootScope.playerListData = $scope.playerList;
                            }
                            $scope.defPlayer++;
                        } else {
                            $scope.toastContent = 'Selected 4 defenders already';
                            Materialize.toast($scope.toastContent, 3000,'rounded');
                        }
                    } else if (player.position === "3") {
                        if ($scope.midPlayer <= 3) {
                            if ($scope.midPlayer == 3) {
                                for (var mid = 0; mid < $scope.playerList.length; mid++) {
                                    if ($scope.playerList[mid].position == "3") {                                       
                                        if (player.teamId == $scope.playerList[mid].teamId) {
                                            midTeam.push($scope.playerList[mid].teamId);
                                            
                                        }
                                    }
                                }
                                if (midTeam.length == 2) {
                                    $scope.midPlayer--;
                                    $scope.toastContent = 'Cannot select 3 midFielders same team';
                                    Materialize.toast($scope.toastContent, 3000,'rounded');
                                } else {
                                    $scope.playerList.push(player);
                                    $scope.reviewPush(player);
                                    $scope.midcheck.push(player);
                                    $scope.findStatus(player.playerId,sec);
                                    $rootScope.playerListData = $scope.playerList;
                                }
                            } else {
                                $scope.playerList.push(player);
                                $scope.reviewPush(player);
                                $scope.midcheck.push(player);
                                $scope.findStatus(player.playerId,sec);
                                $rootScope.playerListData = $scope.playerList;
                            }
                            $scope.midPlayer++;
                        } else {
                            $scope.toastContent = 'Selected 3 midfielders already';
                            Materialize.toast($scope.toastContent, 3000,'rounded');
                        }
                    } else {
                        if ($scope.fwdPlayer <= 3) {
                            if ($scope.fwdPlayer == 3) {
                                for (var fw = 0; fw < $scope.playerList.length; fw++) {
                                    if ($scope.playerList[fw].position == "4") {
                                        if (player.teamId == $scope.playerList[fw].teamId) {
                                            fkTeam.push($scope.playerList[fw].teamId);
                                        }
                                    }
                                }
                                if (fkTeam.length == 2) {
                                    $scope.fwdPlayer--;
                                    $scope.toastContent = 'Cannot select 3 forward players same team';
                                    Materialize.toast($scope.toastContent, 3000,'rounded');
                                } else {
                                    $scope.playerList.push(player);
                                    $scope.reviewPush(player);
                                    $scope.fwdcheck.push(player);
                                    $scope.findStatus(player.playerId,sec);
                                    $rootScope.playerListData = $scope.playerList;
                                }
                            } else {
                                $scope.playerList.push(player);
                                $scope.reviewPush(player);
                                $scope.fwdcheck.push(player);
                                $scope.findStatus(player.playerId,sec);
                                $rootScope.playerListData = $scope.playerList;
                            }
                            $scope.fwdPlayer++;
                        } else {
                            $scope.toastContent = 'Selected 3 forward already';
                            Materialize.toast($scope.toastContent, 3000,'rounded');
                        }
                    }
                } else {
                    $scope.toastContent = 'Selected 11 players already';
                    Materialize.toast($scope.toastContent, 3000,'rounded');
                }
            } else {
                 if(sec=='alla'){                
            for (var j = 0; j < $scope.allaway.length; j++) {
                if (player.playerId == $scope.allaway[j].playerId) {
                    $scope.allaway[j].status = false;                    
                }
            }
        }else{
            for (var statusArray = 0; statusArray < $scope.allhome.length; statusArray++) {
                if (player.playerId == $scope.allhome[statusArray].playerId) {
                    $scope.allhome[statusArray].status = false;
                }
            }
        }
                if (player.position == 1) {
                    $scope.goalKeep--; 
                    for (var e = 0; e < $scope.gkcheck.length; e++) {
                    if ($scope.gkcheck[e].playerId == player.playerId) {
                        $scope.gkcheck.splice(e, 1);                        
                    }
                }
                } else if (player.position == 2) {
                    $scope.defPlayer--;
                   for (var e = 0; e < $scope.defcheck.length; e++) {
                    if ($scope.defcheck[e].playerId == player.playerId) {
                        $scope.defcheck.splice(e, 1);                        
                    }
                }
                } else if (player.position == 3) {
                    $scope.midPlayer--;
                  for (var e = 0; e < $scope.midcheck.length; e++) {
                    if ($scope.midcheck[e].playerId == player.playerId) {
                        $scope.midcheck.splice(e, 1);                        
                    }
                }
                } else {
                    $scope.fwdPlayer--;
                    for (var e = 0; e < $scope.fwdcheck.length; e++) {
                    if ($scope.fwdcheck[e].playerId == player.playerId) {
                        $scope.fwdcheck.splice(e, 1);                        
                    }
                }
                }
                for (var playerLength = 0; playerLength < $scope.playerList.length; playerLength++) {
                    if ($scope.playerList[playerLength].playerId == player.playerId) {
                        $scope.playerList.splice(playerLength, 1);
                        $scope.reviewList.splice(playerLength, 1);
                    }
                }
            }
            if($scope.shouldcheck){
           if($scope.defcheck.length>=4) 
           {  angular.element('.chat1').css({
                                  "left": '40%'                                
                            });
               if($scope.midcheck.length>=3){
                   angular.element('.chat1').css({
                                  "left": '58%'                                
                            });
                   if($scope.fwdcheck.length>=3){
                       angular.element('.chat1').css({
                                  "left": '76%'                                
                            });
                   if($scope.gkcheck.length==1){
                   $scope.guideupcoming=false;
                   angular.element('.upcoming-scheduleEvent').css({
                                  "margin-top": '20px'                                
                            });
                             $scope.guidereview=true;
                            angular.element('ul.match-custom-btn').css({
                                  "margin-top": '-4%'                                
                            }); 
               }else{
               $scope.defcontent="Select one GoalKeeper ";
           }
               }else{
               $scope.defcontent="Select three Forward players";
           }
               }else{
               $scope.defcontent="Select three Midfielder ";
           }
               
           }else{
               angular.element('.chat1').css({
                                  "left": '23%'                                
                            });
               $scope.defcontent="Select Four defender ";               
           }
            }
        };

        $scope.addTeam = function() {
            if ($scope.playerList.length == 11) {                
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.createMatch;
                var players = [];
                for (var i = 0; i < $scope.playerList.length; i++) {
                    players.push($scope.playerList[i].playerId);
                }
                var model = {
                    username: $scope.userInfo.username,
                    matchId: $scope.matchDetails.matchId,
                    players: players
                };
                $rootScope.loader = true;
                fantumnService.post(url, model).then(function(res) {
                        if (res && res.data.status == "success") {
                            $rootScope.loader = false;
                             $scope.guidereview=false;
                             $scope.check();
                            angular.element('upcoming-scheduleEvent').css({
                                  "margin-top": '20px'                                
                            }); 
                            if (res.data.error == "") {
                                $rootScope.playerListData = [];
                                $scope.lead();                                
                                if (!$scope.matchStatus) {
                                    $commons.showSuccess("#successModal", "Successfully Create New team !", true);
                                    $scope.matchStatus = true;
                                } else {
                                    $commons.showSuccess("#successModal", "Successfully Update team !", true);
                                }
                                $scope.matchStatus = true;
                            } else {
                                $scope.toastContent = res.data.error;
                                Materialize.toast($scope.toastContent, 3000);
                            }
                            $scope.getLeaderBoard();
                        } else {}
                    },
                    function(err) {
                        $commons.showError("#errorModal", err, true);
                    }
                );
            } else {
                $scope.toastContent = 'Please Select 11 Players in Team';
                Materialize.toast($scope.toastContent, 2000,'rounded');
            }
        };

        $scope.findStatus = function(player,data) {           
            if(data=='alla'){               
            for (var statusArray = 0; statusArray < $scope.allaway.length; statusArray++) {
                if (player == $scope.allaway[statusArray].playerId) {
                    $scope.allaway[statusArray].status = true;
                }
            }
        }else{
            for (var statusArray = 0; statusArray < $scope.allhome.length; statusArray++) {
                if (player == $scope.allhome[statusArray].playerId) {
                    $scope.allhome[statusArray].status = true;
                }
            }
        }
        };

        $scope.reviewPush = function(player) {
           
            if (player.positionPlay === "GK") {
                for (var j = 0; j < $scope.goalKeeJersey.length; j++) {
                    if (player.teamId == $scope.goalKeeJersey[j].teamId) {
                        $scope.reviewList.push(player);
                        $scope.reviewList[$scope.reviewList.length - 1]["image"] = $scope.goalKeeJersey[j].jersey;
                        $scope.reviewList[$scope.reviewList.length - 1]["name"] = $scope.reviewList[$scope.reviewList.length - 1].playerName;
                    }
                }
            } else {
                for (var i = 0; i < $scope.teamJerSey.length; i++) {
                    if (player.teamId == $scope.teamJerSey[i].teamId) {
                        $scope.reviewList.push(player);                       
                        $scope.reviewList[$scope.reviewList.length - 1]["image"] = $scope.teamJerSey[i].jersey;
                        $scope.reviewList[$scope.reviewList.length - 1]["name"] = $scope.reviewList[$scope.reviewList.length - 1].playerName;
                    }
                }
            }
            
            return $scope.reviewList;
        };

        $scope.reviewTeam = function() {
            if ($scope.playerList.length > 0) {
                $scope.reviewcontent="Submit Your Team";    
                 angular.element('.chat2').css({
                                  "left": '54%'                                
                            }); 
                $scope.review = true;
                $scope.defReview = $filter("filter")($scope.reviewList, "DEF");
                $scope.midReview = $filter("filter")($scope.reviewList, "MID");
                $scope.fwReview = $filter("filter")($scope.reviewList, "FW");
                $scope.gkReview = $filter("filter")($scope.reviewList, "GK");
            } else {
                $scope.review = false;
                $scope.toastContent = 'Please select players';
                Materialize.toast($scope.toastContent, 3000,'rounded');
            }
            
        };

        $scope.reviewClose = function() {
            $scope.review = false;
        };

        function filterArray(array, filter) {
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < filter.length; j++) {
                    if (array[i].playerId === filter[j].playerId && array[i].playerId === filter[j].playerId) {
                        $scope.allPlayers[i]["status"] = true;
                    }
                }
            }
            return $scope.allPlayers;
        }

        $scope.socialShare = function(social) {
            var element = angular.element("#snapshot");
            element.css({ display: "block" });
            var getCanvas;
            html2canvas(element, {
                onrendered: function(canvas) {
                    $("#img-out").append(canvas);
                    getCanvas = canvas;
                    var imgageData = getCanvas.toDataURL("image/png");
                    $("#img-out").html("");
                    if (social === "facebook") {
                        // var metaField = '<meta og:image content="' + imgageData + '"/>';
                        // $("#fbShare").attr('socialshare-text', "My Fantumn XI line up for the match. Match details" + $scope.matchDetails.home + " VS " + $scope.matchDetails.away);
                        // $("#fbShare").attr("socialshare-media", metaField);
                        // $("#fbShare").attr('socialshare-url', "http://www.fantumn.com");
                        FB.ui({
                                method: "feed",
                                name: "Name you want to show",
                                link: "http://link-you-want-to-show",
                                picture: '<meta og:image content="' + imgageData + '"/>',
                                caption: "Caption you want to show",
                                description: "My Fantumn XI line up for the match. Match details" +
                                    $scope.matchDetails.home +
                                    " VS " +
                                    $scope.matchDetails.away,
                                message: "Message you want to show"
                            },
                            function(res) {
                                console.log(res);
                            },
                            function(error) {
                                console.log(error);
                            }
                        );
                        // document.getElementById('fbShare').click();
                    } else if (social === "twitter") {
                        // $("#twitterShare").attr("socialshare-text", "My Fantumn XI line up for the match. Match details" + $scope.matchDetails.home + " VS " + $scope.matchDetails.away);
                        // $("#twitterShare").attr("socialshare-url", imgageData);
                        // document.getElementById("twitterShare").click();
                    } else if (social == "download") {
                        
                        $rootScope.loader = true;
                        $scope.downloaUri = imgageData;
                        $("#downloadPitch").attr("href", imgageData);
                        $("#downloadPitch").attr("download", $scope.matchDetails.home + " VS " + $scope.matchDetails.away);
                        document.getElementById("downloadPitch").click();
                        $("#downloadPitch").attr("href", "");
                        $("#downloadPitch").attr("download", "");
                    } else {
                        // Socialshare.share({
                        //     'provider': 'facebook',
                        //     'attrs': {
                        //         'socialshareUrl': 'http://720kb.net'
                        //     }
                        // });
                    }
                    element.css({
                        display: "none"
                    });
                    $rootScope.loader = false;
                }
            });
            console.log("coming");
        };

       

        $scope.playerSort = function(event) {
            if (angular.element(".playerSort").hasClass("active")) {
                angular.element(".playerSort").removeClass("active");
                angular.element(".playerSort").find("img").css({
                    transform: "rotate(180deg)"
                });
                $scope.orderAll = "-playerName";
            } else {
                angular.element(".playerSort").addClass("active");
                angular.element(".playerSort").find("img").css({
                    transform: "rotate(0deg)"
                });
                $scope.orderAll = "playerName";
            }
        };


        $scope.$watch("matchChange", function() {
           
            if (window.sessionStorage.match != $scope.matchDetails) {
                $scope.matchDetails = JSON.parse(window.sessionStorage.match);
              setInterval(function() {
                    $scope.countdown1 = $scope.matchDetails.starts;
                     var countDownDate = new Date($scope.countdown1).getTime();
                     var now = new Date().getTime();  
                     var distance = countDownDate - now;
                     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                       var seconds = Math.floor((distance % (1000 * 60)) / 1000);                       
                           
                           if(hours.length ==1){
                               hours="0" +hours;
                               console.log("yup")
                           }
                           if(minutes.length==1)
                               minutes="0" +minutes;
                       if(days==0){                         
                      if(hours==0){
                      $scope.countdown2 = minutes + ":" + seconds; 
                                   }else
                                         $scope.countdown2 = hours+ ":" + minutes + ":" + seconds;
                              }else
                               $scope.countdown2 = days + "D:" + hours+ ":" + minutes + ":" + seconds; 
                          
                       }, 1000);
                $scope.home = {
                    id: $scope.matchDetails.teams.team1.teamId,
                    name: $scope.matchDetails.teams.team1.name
                };
                $scope.away = {
                    id: $scope.matchDetails.teams.team2.teamId,
                    name: $scope.matchDetails.teams.team2.name
                };
                $scope.playerTab = "all";
                $scope.goalKeep = 1,
                    $scope.defPlayer = 1,
                    $scope.midPlayer = 1,
                    $scope.fwdPlayer = 1;
                $scope.playerList = [],
                    $scope.reviewList = [];
                $scope.review = false;
                if ($scope.matchDetails.picked) {
                        $scope.getLeaderBoard();
                } else {
                    $scope.getPlayers();
                }
            }
            
        });

        $scope.initFunction();
        }else        
         $commons.navigate('layout.dashboard', '', false);
             }else{                
                 $commons.navigate('layout.dashboard', '', false);
             }
    }
})(window, angular);
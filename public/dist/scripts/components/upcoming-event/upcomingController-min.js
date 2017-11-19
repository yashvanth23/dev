+function(e,a){"use strict";function t(t,s,i,l,r,o,n,p,y){function d(e,a){for(var s=0;s<e.length;s++)for(var i=0;i<a.length;i++)e[s].playerId===a[i].playerId&&e[s].playerId===a[i].playerId&&(t.allPlayers[s].status=!0);return t.allPlayers}t.initFunction=function(){t.matchDetails=JSON.parse(e.sessionStorage.match),t.userDetailInfo=JSON.parse(e.sessionStorage.userDetail),t.countdown=t.matchDetails.starts,t.home={id:t.matchDetails.teams.team1.teamId,name:t.matchDetails.teams.team1.name},t.away={id:t.matchDetails.teams.team2.teamId,name:t.matchDetails.teams.team2.name},t.playerTab="all",t.playType={def:!0,mid:!0,fk:!0,gk:!0},t.goalKeep=1,t.defPlayer=1,t.midPlayer=1,t.fwdPlayer=1,t.userInfo=JSON.parse(e.sessionStorage.userDetail),t.playerList=[],t.reviewList=[],t.logic="Logic : Show everything Line by line.",t.teamJerSey=[{teamId:"52",jersey:"assets/images/jersey/AFC_Bournemouth.png",position:"all"},{teamId:"19",jersey:"assets/images/jersey/Arsenal.png",position:"all"},{teamId:"78",jersey:"assets/images/jersey/Brighton&_Hove_Albion.png",position:"all"},{teamId:"27",jersey:"assets/images/jersey/Burnley.png",position:"all"},{teamId:"18",jersey:"assets/images/jersey/Chelsea.png",position:"all"},{teamId:"51",jersey:"assets/images/jersey/Crystal_Palace.png",position:"all"},{teamId:"13",jersey:"assets/images/jersey/Everton.png",position:"all"},{teamId:"251",jersey:"assets/images/jersey/Huddersfield_Town.png",position:"all"},{teamId:"42",jersey:"assets/images/jersey/Leicester_City.png",position:"all"},{teamId:"8",jersey:"assets/images/jersey/Liverpool.png",position:"all"},{teamId:"9",jersey:"assets/images/jersey/Manchester_City.png",position:"all"},{teamId:"14",jersey:"assets/images/jersey/Manchester_United.png",position:"all"},{teamId:"20",jersey:"assets/images/jersey/Newcastle_United.png",position:"all"},{teamId:"65",jersey:"assets/images/jersey/Southampton.png",position:"all"},{teamId:"26",jersey:"assets/images/jersey/Stoke_City.png",position:"all"},{teamId:"30",jersey:"assets/images/jersey/Swansea_City.png",position:"all"},{teamId:"6",jersey:"assets/images/jersey/Tottenham_Hotspur.png",position:"all"},{teamId:"25",jersey:"assets/images/jersey/Watford.png",position:"all"},{teamId:"10",jersey:"assets/images/jersey/West_Bromwich_Albion.png",position:"all"},{teamId:"1",jersey:"assets/images/jersey/West_Ham_United.png",position:"all"}],t.goalKeeJersey=[{teamId:"52",jersey:"assets/images/jersey/keeper/afc.png",position:"GK"},{teamId:"19",jersey:"assets/images/jersey/keeper/Arsenal.png",position:"GK"},{teamId:"78",jersey:"assets/images/jersey/keeper/Brighton_Hove_Albion.png",position:"GK"},{teamId:"27",jersey:"assets/images/jersey/keeper/Burnley.png",position:"GK"},{teamId:"18",jersey:"assets/images/jersey/keeper/Chelsea.png",position:"GK"},{teamId:"51",jersey:"assets/images/jersey/keeper/Crystal_Palace.png",position:"GK"},{teamId:"13",jersey:"assets/images/jersey/keeper/Everton.png",position:"GK"},{teamId:"251",jersey:"assets/images/jersey/keeper/Huddersfield_Town.png",position:"GK"},{teamId:"42",jersey:"assets/images/jersey/keeper/Leicester.png",position:"GK"},{teamId:"8",jersey:"assets/images/jersey/keeper/Liverpool.png",position:"GK"},{teamId:"9",jersey:"assets/images/jersey/keeper/Manchester_City.png",position:"GK"},{teamId:"14",jersey:"assets/images/jersey/keeper/Manchester_United.png",position:"GK"},{teamId:"20",jersey:"assets/images/jersey/keeper/Newcastle.png",position:"GK"},{teamId:"65",jersey:"assets/images/jersey/keeper/Southampton.png",position:"GK"},{teamId:"26",jersey:"assets/images/jersey/keeper/Stoke_City.png",position:"GK"},{teamId:"30",jersey:"assets/images/jersey/keeper/Swansea_City.png",position:"GK"},{teamId:"6",jersey:"assets/images/jersey/keeper/Tottenham_Hotspur.png",position:"GK"},{teamId:"25",jersey:"assets/images/jersey/keeper/Watford.png",position:"GK"},{teamId:"10",jersey:"assets/images/jersey/keeper/West_Bromwich.png",position:"GK"},{teamId:"1",jersey:"assets/images/jersey/keeper/West_Ham_United.png",position:"GK"}],t.review=!1,t.toastContent="",t.matchDetails.picked?t.getLeaderBoard():t.getPlayers()},t.getPlayers=function(){try{var e=s.appConfig.baseUrl+s.appConfig.getPlayersInfo+"/"+t.matchDetails.matchId;r.get(e).then(function(e){if(e&&"success"==e.data.status){t.allPlayers=e.data.data;for(var i=0;i<t.allPlayers.length;i++)t.allPlayers[i].status=!1,1==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="GK",t.allPlayers[i].position="1"):2==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="DEF",t.allPlayers[i].position="2"):3==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="MID",t.allPlayers[i].position="3"):(t.allPlayers[i].positionPlay="FW",t.allPlayers[i].position="4");s.loader=!1,t.matchStatus=!1,t.allPlayers.length>=9?a.element(".allplay").addClass("cus-scroll"):a.element(".allplay").removeClass("cus-scroll")}else t.historyMatch=e.data.error},function(e){t.toastContent=$("<span>Something went wrong</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3)})}catch(e){o.promiseRejectsAfterAWhile(e)}},t.getLeaderBoard=function(){s.loader=!0;var e=s.appConfig.baseUrl+s.appConfig.rosterPlayer+"/"+t.userDetailInfo._id+"/"+t.matchDetails.matchId,i=s.appConfig.baseUrl+s.appConfig.getPlayersInfo+"/"+t.matchDetails.matchId,l="",o="";y.all([l=r.get(e),o=r.get(i)]).then(function(){l.then(function(e){if(e&&"success"==e.data.status){t.allLineup=e.data.data.match.lineup,t.matchInfo=e.data.data.players,t.playerList=[],t.reviewList=[];for(var a=0;a<t.matchInfo.length;a++)for(var s=0;s<t.allLineup.length;s++)t.allLineup[s].playerId==t.matchInfo[a].playerId&&(t.playerList.push({colorCode:"",iconId:"",playerId:t.matchInfo[a].playerId,id:t.matchInfo[a].playerId,name:t.matchInfo[a].name,positionId:t.matchInfo[a].positionId,position:t.matchInfo[a].position,teamId:t.allLineup[s].teamId,status:!0}),t.reviewList.push({colorCode:"",iconId:"",playerId:t.matchInfo[a].playerId,name:t.matchInfo[a].name,positionId:t.matchInfo[a].positionId,position:t.matchInfo[a].position,teamId:t.allLineup[s].teamId,status:!0}),1==t.playerList[a].positionId?(t.reviewList[a].positionPlay="GK",t.playerList[a].positionPlay="GK"):2==t.playerList[a].positionId?(t.reviewList[a].positionPlay="DEF",t.playerList[a].positionPlay="DEF"):3==t.playerList[a].positionId?(t.reviewList[a].positionPlay="MID",t.playerList[a].positionPlay="MID"):(t.reviewList[a].positionPlay="FW",t.playerList[a].positionPlay="FW"))}t.matchStatus=!0,t.goalKeep=2,t.defPlayer=5,t.midPlayer=4,t.fwdPlayer=4;for(var i=0;i<t.reviewList.length;i++)if("GK"===t.reviewList[i].positionPlay)for(var l=0;l<t.goalKeeJersey.length;l++)t.reviewList[i].teamId==t.goalKeeJersey[l].teamId&&(t.reviewList[i].image=t.goalKeeJersey[l].jersey);else for(var r=0;r<t.teamJerSey.length;r++)t.reviewList[i].teamId==t.teamJerSey[r].teamId&&(t.reviewList[i].image=t.teamJerSey[r].jersey)}),o.then(function(e){if(e&&"success"==e.data.status){t.allPlayers=e.data.data,s.loader=!1;for(var i=0;i<t.allPlayers.length;i++)1==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="GK",t.allPlayers[i].position="1"):2==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="DEF",t.allPlayers[i].position="2"):3==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="MID",t.allPlayers[i].position="3"):(t.allPlayers[i].positionPlay="FW",t.allPlayers[i].position="4");t.allPlayers.length>=9?a.element(".allplay").addClass("cus-scroll"):a.element(".allplay").removeClass("cus-scroll"),d(t.allPlayers,t.playerList)}})})},t.navigateTab=function(e){try{t.playerTab=e}catch(e){o.promiseRejectsAfterAWhile(e)}},t.navigateActiveTab=function(e){return t.playerTab===e},t.slider=function(e){"prev"===e?"all"===t.playerTab?t.navigateTab("gk"):"def"===t.playerTab?t.navigateTab("all"):"mid"===t.playerTab?t.navigateTab("def"):"fk"===t.playerTab?t.navigateTab("mid"):"gk"===t.playerTab&&t.navigateTab("fk"):"all"===t.playerTab?t.navigateTab("def"):"def"===t.playerTab?t.navigateTab("mid"):"mid"===t.playerTab?t.navigateTab("fk"):"fk"===t.playerTab?t.navigateTab("gk"):"gk"===t.playerTab&&t.navigateTab("all")},t.addPlayer=function(e,a,i){var l=[],r=[],o=[];if(e.status){for(var n=0;n<t.allPlayers.length;n++)e.playerId==t.allPlayers[n].playerId&&(t.allPlayers[n].status=!1);1==e.position?t.goalKeep--:2==e.position?t.defPlayer--:3==e.position?t.midPlayer--:t.fwdPlayer--;for(var p=0;p<t.playerList.length;p++)t.playerList[p].playerId==e.playerId&&(t.playerList.splice(p,1),t.reviewList.splice(p,1))}else if(t.playerList.length<11)if("1"===e.position)1==t.goalKeep?(t.playerList.push(e),t.reviewPush(e),t.findStatus(e.playerId),t.goalKeep++):(t.toastContent=$('<span>Selected one Goal keeper already</span><button class="btn-flat toast-action">OK</button>'),Materialize.toast(t.toastContent,3e3));else if("2"===e.position)if(t.defPlayer<=4){if(4==t.defPlayer){for(var y=0;y<t.playerList.length;y++)"2"==t.playerList[y].position&&e.playerDetails.teamId==t.playerList[y].playerDetails.teamId&&l.push(t.playerList[y].playerDetails.teamId);3==l.length?(t.defPlayer--,t.toastContent=$("<span>Cannot select 4 defenders same team</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3)):(t.playerList.push(e),t.reviewPush(e),t.findStatus(e.playerId),s.playerListData=t.playerList)}else t.playerList.push(e),t.reviewPush(e),t.findStatus(e.playerId),s.playerListData=t.playerList;t.defPlayer++}else t.toastContent=$("<span>Selected 4 defenders already</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3);else if("3"===e.position)if(t.midPlayer<=3){if(3==t.midPlayer){for(var d=0;d<t.playerList.length;d++)"3"==t.playerList[d].position&&e.playerDetails.teamId==t.playerList[d].playerDetails.teamId&&r.push(t.playerList[d].playerDetails.teamId);2==r.length?(t.midPlayer--,t.toastContent=$("<span>Cannot select 3 midFielders same team</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3)):(t.playerList.push(e),t.reviewPush(e),t.findStatus(e.playerId),s.playerListData=t.playerList)}else t.playerList.push(e),t.reviewPush(e),t.findStatus(e.playerId),s.playerListData=t.playerList;t.midPlayer++}else t.toastContent=$("<span>Selected 3 midfielders already</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3);else if(t.fwdPlayer<=3){if(3==t.fwdPlayer){for(var m=0;m<t.playerList.length;m++)"4"==t.playerList[m].position&&e.playerDetails.teamId==t.playerList[m].playerDetails.teamId&&o.push(t.playerList[m].playerDetails.teamId);2==o.length?(t.fwdPlayer--,t.toastContent=$("<span>Cannot select 3 forward players same team</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3)):(t.playerList.push(e),t.reviewPush(e),t.findStatus(e.playerId),s.playerListData=t.playerList)}else t.playerList.push(e),t.reviewPush(e),t.findStatus(e.playerId),s.playerListData=t.playerList;t.fwdPlayer++}else t.toastContent=$("<span>Selected 3 forward already</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3);else t.toastContent=$("<span>Selected 11 players already</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3)},t.addTeam=function(){if(11==t.playerList.length){s.loader=!0;for(var e=s.appConfig.baseUrl+s.appConfig.createMatch,a=[],l=0;l<t.playerList.length;l++)a.push(t.playerList[l].playerId);var o={username:t.userInfo.username,matchId:t.matchDetails.matchId,players:a};r.post(e,o).then(function(e){e&&"success"==e.data.status&&(s.loader=!1,""==e.data.error?(s.playerListData=[],t.getUpcomingMatch(),t.matchStatus?i.showSuccess("#successModal","Successfully Update team !",!0):(i.showSuccess("#successModal","Successfully Create New team !",!0),t.matchStatus=!0),t.matchStatus=!0):(t.toastContent=$("<span>"+e.data.error+"</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3)))},function(e){i.showError("#errorModal",e,!0)})}else t.toastContent=$("<span> Please Select 11 Players in Team</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3)},t.findStatus=function(e){for(var a=0;a<t.allPlayers.length;a++)e==t.allPlayers[a].playerId&&(t.allPlayers[a].status=!0)},t.reviewPush=function(e){if("GK"===e.positionPlay)for(var a=0;a<t.goalKeeJersey.length;a++)e.playerDetails.teamId==t.goalKeeJersey[a].teamId&&(t.reviewList.push(e),t.reviewList[t.reviewList.length-1].image=t.goalKeeJersey[a].jersey,t.reviewList[t.reviewList.length-1].name=t.reviewList[t.reviewList.length-1].playerName);else for(var s=0;s<t.teamJerSey.length;s++)e.playerDetails.teamId==t.teamJerSey[s].teamId&&(t.reviewList.push(e),t.reviewList[t.reviewList.length-1].image=t.teamJerSey[s].jersey,t.reviewList[t.reviewList.length-1].name=t.reviewList[t.reviewList.length-1].playerName);return t.reviewList},t.reviewTeam=function(){t.playerList.length>0?(t.review=!0,t.defReview=p("filter")(t.reviewList,"DEF"),t.midReview=p("filter")(t.reviewList,"MID"),t.fwReview=p("filter")(t.reviewList,"FW"),t.gkReview=p("filter")(t.reviewList,"GK")):(t.review=!1,t.toastContent=$("<span>Please select players</span>").add($('<button class="btn-flat toast-action">OK</button>')),Materialize.toast(t.toastContent,3e3))},t.reviewClose=function(){t.review=!1},t.socialShare=function(e){var i=a.element("#snapshot");i.css({display:"block"});var l;html2canvas(i,{onrendered:function(a){$("#img-out").append(a);var r=(l=a).toDataURL("image/png");$("#img-out").html(""),"facebook"===e?FB.ui({method:"feed",name:"Name you want to show",link:"http://link-you-want-to-show",picture:'<meta og:image content="'+r+'"/>',caption:"Caption you want to show",description:"My Fantumn XI line up for the match. Match details"+t.matchDetails.home+" VS "+t.matchDetails.away,message:"Message you want to show"},function(e){console.log(e)},function(e){console.log(e)}):"twitter"===e||"download"==e&&(s.loader=!0,t.downloaUri=r,$("#downloadPitch").attr("href",r),$("#downloadPitch").attr("download",t.matchDetails.home+" VS "+t.matchDetails.away),document.getElementById("downloadPitch").click(),$("#downloadPitch").attr("href",""),$("#downloadPitch").attr("download","")),i.css({display:"none"}),s.loader=!1}})},t.teamSort=function(e){a.element(".sort").hasClass("active")?(a.element(".sort").removeClass("active"),a.element(".sort").find("img").css({transform:"rotate(180deg)"}),t.orderAll="-playerDetails.teamId"):(a.element(".sort").addClass("active"),a.element(".sort").find("img").css({transform:"rotate(0deg)"}),t.orderAll="playerDetails.teamId")},t.playerSort=function(e){a.element(".playerSort").hasClass("active")?(a.element(".playerSort").removeClass("active"),a.element(".playerSort").find("img").css({transform:"rotate(180deg)"}),t.orderAll="-playerName"):(a.element(".playerSort").addClass("active"),a.element(".playerSort").find("img").css({transform:"rotate(0deg)"}),t.orderAll="playerName")},t.$watch("matchChange",function(){e.sessionStorage.match!==t.matchDetails&&(t.matchDetails=JSON.parse(e.sessionStorage.match),t.countdown=t.matchDetails.starts,t.home={id:t.matchDetails.teams.team1.teamId,name:t.matchDetails.teams.team1.name},t.away={id:t.matchDetails.teams.team2.teamId,name:t.matchDetails.teams.team2.name},t.playerTab="all",t.goalKeep=1,t.defPlayer=1,t.midPlayer=1,t.fwdPlayer=1,t.playerList=[],t.reviewList=[],t.review=!1,t.matchDetails.picked?t.getLeaderBoard():t.getPlayers())}),t.initFunction()}a.module("fantumn").registerCtrl("upcomingCtrl",t),t.$inject=["$scope","$rootScope","$commons","$logger","fantumnService","exceptionService","$window","$filter","$q"]}(window,angular);
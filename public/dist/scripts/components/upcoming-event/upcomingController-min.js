+function(e,a){"use strict";function t(t,s,l,i,r,o,n,y,p,d){if(void 0!=e.sessionStorage.userDetail)if(""!=e.sessionStorage.userDetail){t.initFunction=function(){t.matchDetails=JSON.parse(e.sessionStorage.match),t.userDetailInfo=JSON.parse(e.sessionStorage.userDetail),setInterval(function(){t.countdown1=t.matchDetails.starts;var e=new Date(t.countdown1).getTime()-(new Date).getTime(),a=Math.floor(e/864e5),s=Math.floor(e%864e5/36e5),l=Math.floor(e%36e5/6e4),i=Math.floor(e%6e4/1e3);1==l.length&&(l="0"+l),0==a?0==s?t.countdown2=l+":"+i:(1==s.length&&(s="0"+s),t.countdown2=s+":"+l+":"+i):t.countdown2=a+"D:"+s+":"+l+":"+i},1e3),t.home={id:t.matchDetails.teams.team1.teamId,name:t.matchDetails.teams.team1.name},t.away={id:t.matchDetails.teams.team2.teamId,name:t.matchDetails.teams.team2.name},t.playerTab="all",t.playType={def:!0,mid:!0,fk:!0,gk:!0},setInterval(function(){"yellow"==t.colo?(t.colo="",t.mov="-40px"):(t.colo="yellow",t.mov="-20px"),a.element(".chat1").css({"border-color":t.colo,color:"white",top:t.mov})},500),t.backdrop=!1,setInterval(function(){"yellow"==t.color?(t.color="",t.move="-70px"):(t.color="yellow",t.move="-50px"),a.element(".chat2").css({"border-color":t.color,color:"white",top:t.move})},500),t.defcheck=[],t.midcheck=[],t.fwdcheck=[],t.gkcheck=[],t.guideupcoming=!1,t.guidereview=!1,t.defcontent="Select Four defender ",t.reviewcontent="Review Your Team",setInterval(function(){Materialize.Toast.removeAll()},3e3),t.check(),t.goalKeep=1,t.defPlayer=1,t.midPlayer=1,t.fwdPlayer=1,t.userInfo=JSON.parse(e.sessionStorage.userDetail),t.playerList=[],t.reviewList=[],t.show_toast="",t.logic="Logic : Show everything Line by line.",t.teamJerSey=[{teamId:"52",jersey:"assets/images/jersey/AFC_Bournemouth.png",position:"all"},{teamId:"19",jersey:"assets/images/jersey/Arsenal.png",position:"all"},{teamId:"78",jersey:"assets/images/jersey/Brighton&_Hove_Albion.png",position:"all"},{teamId:"27",jersey:"assets/images/jersey/Burnley.png",position:"all"},{teamId:"18",jersey:"assets/images/jersey/Chelsea.png",position:"all"},{teamId:"51",jersey:"assets/images/jersey/Crystal_Palace.png",position:"all"},{teamId:"13",jersey:"assets/images/jersey/Everton.png",position:"all"},{teamId:"251",jersey:"assets/images/jersey/Huddersfield_Town.png",position:"all"},{teamId:"42",jersey:"assets/images/jersey/Leicester_City.png",position:"all"},{teamId:"8",jersey:"assets/images/jersey/Liverpool.png",position:"all"},{teamId:"9",jersey:"assets/images/jersey/Manchester_City.png",position:"all"},{teamId:"14",jersey:"assets/images/jersey/Manchester_United.png",position:"all"},{teamId:"20",jersey:"assets/images/jersey/Newcastle_United.png",position:"all"},{teamId:"65",jersey:"assets/images/jersey/Southampton.png",position:"all"},{teamId:"26",jersey:"assets/images/jersey/Stoke_City.png",position:"all"},{teamId:"30",jersey:"assets/images/jersey/Swansea_City.png",position:"all"},{teamId:"6",jersey:"assets/images/jersey/Tottenham_Hotspur.png",position:"all"},{teamId:"25",jersey:"assets/images/jersey/Watford.png",position:"all"},{teamId:"10",jersey:"assets/images/jersey/West_Bromwich_Albion.png",position:"all"},{teamId:"1",jersey:"assets/images/jersey/West_Ham_United.png",position:"all"},{teamId:"9876",jersey:"assets/images/jersey/ATK.svg",position:"all"},{teamId:"2358",jersey:"assets/images/jersey/Delhi_Dynamos.svg",position:"all"},{teamId:"7271",jersey:"assets/images/jersey/Chennaiyin_FC.svg",position:"all"},{teamId:"3416",jersey:"assets/images/jersey/MumbaiCity_Fc.svg",position:"all"},{teamId:"492",jersey:"assets/images/jersey/Bengaluru_FC.svg",position:"all"},{teamId:"426",jersey:"assets/images/jersey/PuneCity_FC.svg",position:"all"},{teamId:"2768",jersey:"assets/images/jersey/North_EastUnited.svg",position:"all"},{teamId:"435",jersey:"assets/images/jersey/FC_Goa.svg",position:"all"},{teamId:"780",jersey:"assets/images/jersey/Kerala_Blasters.svg",position:"all"},{teamId:"134418",jersey:"assets/images/jersey/Jamshedpur_Fc.svg",position:"all"}],t.goalKeeJersey=[{teamId:"52",jersey:"assets/images/jersey/keeper/afc.png",position:"GK"},{teamId:"19",jersey:"assets/images/jersey/keeper/Arsenal.png",position:"GK"},{teamId:"78",jersey:"assets/images/jersey/keeper/Brighton_Hove_Albion.png",position:"GK"},{teamId:"27",jersey:"assets/images/jersey/keeper/Burnley.png",position:"GK"},{teamId:"18",jersey:"assets/images/jersey/keeper/Chelsea.png",position:"GK"},{teamId:"51",jersey:"assets/images/jersey/keeper/Crystal_Palace.png",position:"GK"},{teamId:"13",jersey:"assets/images/jersey/keeper/Everton.png",position:"GK"},{teamId:"251",jersey:"assets/images/jersey/keeper/Huddersfield_Town.png",position:"GK"},{teamId:"42",jersey:"assets/images/jersey/keeper/Leicester.png",position:"GK"},{teamId:"8",jersey:"assets/images/jersey/keeper/Liverpool.png",position:"GK"},{teamId:"9",jersey:"assets/images/jersey/keeper/Manchester_City.png",position:"GK"},{teamId:"14",jersey:"assets/images/jersey/keeper/Manchester_United.png",position:"GK"},{teamId:"20",jersey:"assets/images/jersey/keeper/Newcastle.png",position:"GK"},{teamId:"65",jersey:"assets/images/jersey/keeper/Southampton.png",position:"GK"},{teamId:"26",jersey:"assets/images/jersey/keeper/Stoke_City.png",position:"GK"},{teamId:"30",jersey:"assets/images/jersey/keeper/Swansea_City.png",position:"GK"},{teamId:"6",jersey:"assets/images/jersey/keeper/Tottenham_Hotspur.png",position:"GK"},{teamId:"25",jersey:"assets/images/jersey/keeper/Watford.png",position:"GK"},{teamId:"10",jersey:"assets/images/jersey/keeper/West_Bromwich.png",position:"GK"},{teamId:"1",jersey:"assets/images/jersey/keeper/West_Ham_United.png",position:"GK"},{teamId:"426",jersey:"assets/images/jersey/keeper/Pune_City.svg",position:"GK"},{teamId:"2768",jersey:"assets/images/jersey/keeper/North_East_United_1.svg",position:"GK"},{teamId:"435",jersey:"assets/images/jersey/keeper/Goa_1.svg",position:"GK"},{teamId:"780",jersey:"assets/images/jersey/keeper/Kerala_Blasters_1.svg",position:"GK"},{teamId:"134418",jersey:"assets/images/jersey/keeper/Jamshedpur_FC.svg",position:"GK"},{teamId:"9876",jersey:"assets/images/jersey/keeper/ATK_1.svg",position:"GK"},{teamId:"2358",jersey:"assets/images/jersey/keeper/Delhi_Dynamos_1.svg",position:"GK"},{teamId:"7271",jersey:"assets/images/jersey/keeper/Chennaiyin_FC_1.svg",position:"GK"},{teamId:"3416",jersey:"assets/images/jersey/keeper/MumbaiCity_FC.svg",position:"GK"},{teamId:"492",jersey:"assets/images/jersey/keeper/Bengaluru_Fc.svg",position:"GK"}],t.review=!1,t.toastContent="",t.matchDetails.picked?t.getLeaderBoard():t.getPlayers()},t.check=function(){var e=s.appConfig.baseUrl+s.appConfig.getLeaderBoard+"/"+s.name;r.get(e).then(function(e){e&&"success"==e.data.status&&(t.matchCard=e.data.data.matchCards,0==t.matchCard.length?(t.guideupcoming=!0,t.backdrop=!0,t.shouldcheck=!0,a.element(".upcoming-scheduleEvent").css({"margin-top":"-30px"})):(t.guideupcoming=!1,t.shouldcheck=!1,t.backdrop=!1,a.element("ul.match-custom-btn").css({"margin-top":""})))})},t.getPlayers=function(){try{s.loader=!0;var e=s.appConfig.baseUrl+s.appConfig.getPlayersInfo+"/"+t.matchDetails.matchId;r.get(e).then(function(e){if(e&&"success"==e.data.status){t.allPlayers=e.data.data;for(l=0;l<t.allPlayers.length;l++)t.allPlayers[l].status=!1,1==t.allPlayers[l].playerPositionId?(t.allPlayers[l].positionPlay="GK",t.allPlayers[l].position="1"):2==t.allPlayers[l].playerPositionId?(t.allPlayers[l].positionPlay="DEF",t.allPlayers[l].position="2"):3==t.allPlayers[l].playerPositionId?(t.allPlayers[l].positionPlay="MID",t.allPlayers[l].position="3"):(t.allPlayers[l].positionPlay="FW",t.allPlayers[l].position="4");t.allhome=[],t.allaway=[];for(var l=0;l<t.allPlayers.length;l++)t.d=[],t.allPlayers[l].playerDetails.teamId==t.home.id?t.allhome.push({playerName:t.allPlayers[l].playerName,positionPlay:t.allPlayers[l].positionPlay,playerId:t.allPlayers[l].playerId,teamId:t.allPlayers[l].playerDetails.teamId,position:t.allPlayers[l].position,status:t.allPlayers[l].status}):t.allaway.push({playerName:t.allPlayers[l].playerName,positionPlay:t.allPlayers[l].positionPlay,playerId:t.allPlayers[l].playerId,teamId:t.allPlayers[l].playerDetails.teamId,position:t.allPlayers[l].position,status:t.allPlayers[l].status});s.loader=!1,t.matchStatus=!1,t.allPlayers.length>=9?a.element(".allplay").addClass("cus-scroll"):a.element(".allplay").removeClass("cus-scroll")}else t.historyMatch=e.data.error},function(e){t.toastContent="Something went wrong",Materialize.toast(t.toastContent,3e3,"rounded")})}catch(e){o.promiseRejectsAfterAWhile(e)}},t.getLeaderBoard=function(){s.loader=!0;var e=s.appConfig.baseUrl+s.appConfig.rosterPlayer+"/"+t.userDetailInfo._id+"/"+t.matchDetails.matchId,l=s.appConfig.baseUrl+s.appConfig.getPlayersInfo+"/"+t.matchDetails.matchId;r.get(e).then(function(e){if(e&&"success"==e.data.status){t.allLineup=e.data.data.match.lineup,t.matchInfo=e.data.data.players,t.playerList=[],t.reviewList=[];for(var a=0;a<t.matchInfo.length;a++)for(var s=0;s<t.allLineup.length;s++)t.allLineup[s].playerId==t.matchInfo[a].playerId&&(t.playerList.push({colorCode:"",iconId:"",playerId:t.matchInfo[a].playerId,id:t.matchInfo[a].playerId,playerName:t.matchInfo[a].name,positionId:t.matchInfo[a].positionId,position:t.matchInfo[a].position,teamId:t.allLineup[s].teamId,status:!0}),t.reviewList.push({colorCode:"",iconId:"",playerId:t.matchInfo[a].playerId,playerName:t.matchInfo[a].name,positionId:t.matchInfo[a].positionId,position:t.matchInfo[a].position,teamId:t.allLineup[s].teamId,status:!0}),1==t.playerList[a].positionId?(t.reviewList[a].positionPlay="GK",t.playerList[a].positionPlay="GK"):2==t.playerList[a].positionId?(t.reviewList[a].positionPlay="DEF",t.playerList[a].positionPlay="DEF"):3==t.playerList[a].positionId?(t.reviewList[a].positionPlay="MID",t.playerList[a].positionPlay="MID"):(t.reviewList[a].positionPlay="FW",t.playerList[a].positionPlay="FW"))}t.matchStatus=!0,t.goalKeep=2,t.defPlayer=5,t.midPlayer=4,t.fwdPlayer=4;for(var l=0;l<t.reviewList.length;l++)if("GK"===t.reviewList[l].positionPlay)for(var i=0;i<t.goalKeeJersey.length;i++)t.reviewList[l].teamId==t.goalKeeJersey[i].teamId&&(t.reviewList[l].image=t.goalKeeJersey[i].jersey);else for(var r=0;r<t.teamJerSey.length;r++)t.reviewList[l].teamId==t.teamJerSey[r].teamId&&(t.reviewList[l].image=t.teamJerSey[r].jersey)}),r.get(l).then(function(e){if(e&&"success"==e.data.status){t.allPlayers=e.data.data,s.loader=!1;for(i=0;i<t.allPlayers.length;i++){for(var l=0;l<t.playerList.length;l++)t.allPlayers[i].playerId==t.playerList[l].playerId?t.allPlayers[i].status=!0:t.allPlayers[i].status1=!1;1==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="GK",t.allPlayers[i].position="1"):2==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="DEF",t.allPlayers[i].position="2"):3==t.allPlayers[i].playerPositionId?(t.allPlayers[i].positionPlay="MID",t.allPlayers[i].position="3"):(t.allPlayers[i].positionPlay="FW",t.allPlayers[i].position="4")}t.allhome=[],t.allaway=[];for(var i=0;i<t.allPlayers.length;i++)t.allPlayers[i].playerDetails.teamId==t.home.id?t.allhome.push({playerName:t.allPlayers[i].playerName,positionPlay:t.allPlayers[i].positionPlay,playerId:t.allPlayers[i].playerId,teamId:t.allPlayers[i].playerDetails.teamId,position:t.allPlayers[i].position,status:t.allPlayers[i].status}):t.allaway.push({playerName:t.allPlayers[i].playerName,positionPlay:t.allPlayers[i].positionPlay,playerId:t.allPlayers[i].playerId,teamId:t.allPlayers[i].playerDetails.teamId,position:t.allPlayers[i].position,status:t.allPlayers[i].status});t.allPlayers.length>=9?a.element(".allplay").addClass("cus-scroll"):a.element(".allplay").removeClass("cus-scroll"),function(e,a){for(var s=0;s<e.length;s++)for(var l=0;l<a.length;l++)e[s].playerId===a[l].playerId&&e[s].playerId===a[l].playerId&&(t.allPlayers[s].status=!0);t.allPlayers}(t.allPlayers,t.playerList)}})},t.navigateTab=function(e){try{t.playerTab=e}catch(e){o.promiseRejectsAfterAWhile(e)}},t.navigateActiveTab=function(e){return t.playerTab===e},t.slider=function(e){"prev"===e?"all"===t.playerTab?t.navigateTab("gk"):"def"===t.playerTab?t.navigateTab("all"):"mid"===t.playerTab?t.navigateTab("def"):"fk"===t.playerTab?t.navigateTab("mid"):"gk"===t.playerTab&&t.navigateTab("fk"):"all"===t.playerTab?t.navigateTab("def"):"def"===t.playerTab?t.navigateTab("mid"):"mid"===t.playerTab?t.navigateTab("fk"):"fk"===t.playerTab?t.navigateTab("gk"):"gk"===t.playerTab&&t.navigateTab("all")},t.addPlayer=function(e,l,i){var r=[],o=[],n=[];if(e.status){if("alla"==i)for(var y=0;y<t.allaway.length;y++)e.playerId==t.allaway[y].playerId&&(t.allaway[y].status=!1);else for(var p=0;p<t.allhome.length;p++)e.playerId==t.allhome[p].playerId&&(t.allhome[p].status=!1);if(1==e.position){t.goalKeep--;for(d=0;d<t.gkcheck.length;d++)t.gkcheck[d].playerId==e.playerId&&t.gkcheck.splice(d,1)}else if(2==e.position){t.defPlayer--;for(d=0;d<t.defcheck.length;d++)t.defcheck[d].playerId==e.playerId&&t.defcheck.splice(d,1)}else if(3==e.position){t.midPlayer--;for(d=0;d<t.midcheck.length;d++)t.midcheck[d].playerId==e.playerId&&t.midcheck.splice(d,1)}else{t.fwdPlayer--;for(var d=0;d<t.fwdcheck.length;d++)t.fwdcheck[d].playerId==e.playerId&&t.fwdcheck.splice(d,1)}for(var m=0;m<t.playerList.length;m++)t.playerList[m].playerId==e.playerId&&(t.playerList.splice(m,1),t.reviewList.splice(m,1))}else if(t.playerList.length<11)if("1"===e.position)1==t.goalKeep?(t.playerList.push(e),t.reviewPush(e),t.gkcheck.push(e),t.findStatus(e.playerId,i),t.goalKeep++):(t.toastContent="Already selected goal keeper",Materialize.toast(t.toastContent,3e3,"rounded"));else if("2"===e.position)if(t.defPlayer<=4){if(4==t.defPlayer){for(var c=0;c<t.playerList.length;c++)"2"==t.playerList[c].position&&e.teamId==t.playerList[c].teamId&&r.push(t.playerList[c].teamId);3==r.length?(t.defPlayer--,t.toastContent="Cannot select 4 defenders same team",Materialize.toast(t.toastContent,3e3,"rounded")):(t.playerList.push(e),t.reviewPush(e),t.defcheck.push(e),t.findStatus(e.playerId,i),s.playerListData=t.playerList)}else t.playerList.push(e),t.reviewPush(e),t.defcheck.push(e),t.findStatus(e.playerId,i),s.playerListData=t.playerList;t.defPlayer++}else t.toastContent="Selected 4 defenders already",Materialize.toast(t.toastContent,3e3,"rounded");else if("3"===e.position)if(t.midPlayer<=3){if(3==t.midPlayer){for(var g=0;g<t.playerList.length;g++)"3"==t.playerList[g].position&&e.teamId==t.playerList[g].teamId&&o.push(t.playerList[g].teamId);2==o.length?(t.midPlayer--,t.toastContent="Cannot select 3 midFielders same team",Materialize.toast(t.toastContent,3e3,"rounded")):(t.playerList.push(e),t.reviewPush(e),t.midcheck.push(e),t.findStatus(e.playerId,i),s.playerListData=t.playerList)}else t.playerList.push(e),t.reviewPush(e),t.midcheck.push(e),t.findStatus(e.playerId,i),s.playerListData=t.playerList;t.midPlayer++}else t.toastContent="Selected 3 midfielders already",Materialize.toast(t.toastContent,3e3,"rounded");else if(t.fwdPlayer<=3){if(3==t.fwdPlayer){for(var h=0;h<t.playerList.length;h++)"4"==t.playerList[h].position&&e.teamId==t.playerList[h].teamId&&n.push(t.playerList[h].teamId);2==n.length?(t.fwdPlayer--,t.toastContent="Cannot select 3 forward players same team",Materialize.toast(t.toastContent,3e3,"rounded")):(t.playerList.push(e),t.reviewPush(e),t.fwdcheck.push(e),t.findStatus(e.playerId,i),s.playerListData=t.playerList)}else t.playerList.push(e),t.reviewPush(e),t.fwdcheck.push(e),t.findStatus(e.playerId,i),s.playerListData=t.playerList;t.fwdPlayer++}else t.toastContent="Selected 3 forward already",Materialize.toast(t.toastContent,3e3,"rounded");else t.toastContent="Selected 11 players already",Materialize.toast(t.toastContent,3e3,"rounded");t.shouldcheck&&(t.defcheck.length>=4?(a.element(".chat1").css({left:"40%"}),t.midcheck.length>=3?(a.element(".chat1").css({left:"58%"}),t.fwdcheck.length>=3?(a.element(".chat1").css({left:"76%"}),1==t.gkcheck.length?(t.guideupcoming=!1,a.element(".upcoming-scheduleEvent").css({"margin-top":"20px"}),t.guidereview=!0,a.element("ul.match-custom-btn").css({"margin-top":"-4%"})):t.defcontent="Select one GoalKeeper "):t.defcontent="Select three Forward players"):t.defcontent="Select three Midfielder "):(a.element(".chat1").css({left:"23%"}),t.defcontent="Select Four defender "))},t.addTeam=function(){if(11==t.playerList.length){for(var e=s.appConfig.baseUrl+s.appConfig.createMatch,i=[],o=0;o<t.playerList.length;o++)i.push(t.playerList[o].playerId);var n={username:t.userInfo.username,matchId:t.matchDetails.matchId,players:i};s.loader=!0,r.post(e,n).then(function(e){e&&"success"==e.data.status&&(s.loader=!1,t.guidereview=!1,t.check(),a.element("upcoming-scheduleEvent").css({"margin-top":"20px"}),""==e.data.error?(s.playerListData=[],t.lead(),t.matchStatus?l.showSuccess("#successModal","Successfully Update team !",!0):(l.showSuccess("#successModal","Successfully Create New team !",!0),t.matchStatus=!0),t.matchStatus=!0):(t.toastContent=e.data.error,Materialize.toast(t.toastContent,3e3)),t.getLeaderBoard())},function(e){l.showError("#errorModal",e,!0)})}else t.toastContent="Please Select 11 Players in Team",Materialize.toast(t.toastContent,2e3,"rounded")},t.findStatus=function(e,a){if("alla"==a)for(s=0;s<t.allaway.length;s++)e==t.allaway[s].playerId&&(t.allaway[s].status=!0);else for(var s=0;s<t.allhome.length;s++)e==t.allhome[s].playerId&&(t.allhome[s].status=!0)},t.reviewPush=function(e){if("GK"===e.positionPlay)for(var a=0;a<t.goalKeeJersey.length;a++)e.teamId==t.goalKeeJersey[a].teamId&&(t.reviewList.push(e),t.reviewList[t.reviewList.length-1].image=t.goalKeeJersey[a].jersey,t.reviewList[t.reviewList.length-1].name=t.reviewList[t.reviewList.length-1].playerName);else for(var s=0;s<t.teamJerSey.length;s++)e.teamId==t.teamJerSey[s].teamId&&(t.reviewList.push(e),t.reviewList[t.reviewList.length-1].image=t.teamJerSey[s].jersey,t.reviewList[t.reviewList.length-1].name=t.reviewList[t.reviewList.length-1].playerName);return t.reviewList},t.reviewTeam=function(){t.playerList.length>0?(t.reviewcontent="Submit Your Team",a.element(".chat2").css({left:"54%"}),t.review=!0,t.defReview=y("filter")(t.reviewList,"DEF"),t.midReview=y("filter")(t.reviewList,"MID"),t.fwReview=y("filter")(t.reviewList,"FW"),t.gkReview=y("filter")(t.reviewList,"GK")):(t.review=!1,t.toastContent="Please select players",Materialize.toast(t.toastContent,3e3,"rounded"))},t.reviewClose=function(){t.review=!1};t.socialShare=function(e){var l=a.element("#snapshot");l.css({display:"block"});var i;html2canvas(l,{onrendered:function(a){$("#img-out").append(a);var r=(i=a).toDataURL("image/png");$("#img-out").html(""),"facebook"===e?FB.ui({method:"feed",name:"Name you want to show",link:"http://link-you-want-to-show",picture:'<meta og:image content="'+r+'"/>',caption:"Caption you want to show",description:"My Fantumn XI line up for the match. Match details"+t.matchDetails.home+" VS "+t.matchDetails.away,message:"Message you want to show"},function(e){console.log(e)},function(e){console.log(e)}):"twitter"===e||"download"==e&&(s.loader=!0,t.downloaUri=r,$("#downloadPitch").attr("href",r),$("#downloadPitch").attr("download",t.matchDetails.home+" VS "+t.matchDetails.away),document.getElementById("downloadPitch").click(),$("#downloadPitch").attr("href",""),$("#downloadPitch").attr("download","")),l.css({display:"none"}),s.loader=!1}}),console.log("coming")},t.playerSort=function(e){a.element(".playerSort").hasClass("active")?(a.element(".playerSort").removeClass("active"),a.element(".playerSort").find("img").css({transform:"rotate(180deg)"}),t.orderAll="-playerName"):(a.element(".playerSort").addClass("active"),a.element(".playerSort").find("img").css({transform:"rotate(0deg)"}),t.orderAll="playerName")},t.$watch("matchChange",function(){e.sessionStorage.match!=t.matchDetails&&(t.matchDetails=JSON.parse(e.sessionStorage.match),setInterval(function(){t.countdown1=t.matchDetails.starts;var e=new Date(t.countdown1).getTime()-(new Date).getTime(),a=Math.floor(e/864e5),s=Math.floor(e%864e5/36e5),l=Math.floor(e%36e5/6e4),i=Math.floor(e%6e4/1e3);1==s.length&&(s="0"+s,console.log("yup")),1==l.length&&(l="0"+l),t.countdown2=0==a?0==s?l+":"+i:s+":"+l+":"+i:a+"D:"+s+":"+l+":"+i},1e3),t.home={id:t.matchDetails.teams.team1.teamId,name:t.matchDetails.teams.team1.name},t.away={id:t.matchDetails.teams.team2.teamId,name:t.matchDetails.teams.team2.name},t.playerTab="all",t.goalKeep=1,t.defPlayer=1,t.midPlayer=1,t.fwdPlayer=1,t.playerList=[],t.reviewList=[],t.review=!1,t.matchDetails.picked?t.getLeaderBoard():t.getPlayers())}),t.initFunction()}else l.navigate("layout.dashboard","",!1);else l.navigate("layout.dashboard","",!1)}a.module("fantumn").registerCtrl("upcomingCtrl",t),t.$inject=["$scope","$rootScope","$commons","$logger","fantumnService","exceptionService","$window","$filter","$q"]}(window,angular);
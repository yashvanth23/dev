/**
 * @Filename : contactController.js
 * @Description : 
 * @Author : Patharraj
 * @Date : Oct 28, 2017 
 * 
 * @History
 *  Version     Date        Author        Remarks
 *  1.0         28-10-17    Patharraj     File Created         
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
        .registerCtrl('settingCtrl', settingCtrl);
    settingCtrl.$inject = ["$scope", "$rootScope", "$commons", "$logger", "fantumnService", "exceptionService", "$http"];

    function settingCtrl($scope, $rootScope, $commons, $logger, fantumnService, exceptionService, $http,$filter) {
        if (window.sessionStorage.userDetail != undefined) {
                    if (window.sessionStorage.userDetail != "") {
        
        $scope.initFunction = function() {
            $scope.userData = JSON.parse(window.sessionStorage.userDetail);
            $scope.settingDrop = false;
            $scope.genderError = false;
            $scope.profileEdit = false;
            $scope.changePass = {
                "oldPass": "",
                "newPass": ""
            };
            setInterval(function() {
            Materialize.Toast.removeAll();            
                },3000);
            $rootScope.loader = true;
            $scope.profileInfo = {
                "name": "",
                "email": "",
                "notification": false,
                "mobile": "",
                "gender": "",
                "dob":"",
                "address": "",
                "city": "",
                "state": "",
                "pincode": "",
                "country": "",
                "avatar": ""
            };
            $scope.file = "";
            if ($scope.userData.social_auth) {
                if ($scope.userData.facebook.social_id != null) {
                    $scope.profileInfo.avatar = $scope.userData.facebook.profile;
                } else {
                    $scope.profileInfo.avatar = $scope.userData.google.imgUrl;
                }
            } else {
                $scope.profileInfo.avatar = $scope.userData.avatar;
            }

            $scope.profileUpload = false;
            $scope.customError = false;
            $scope.getProfileInformation();
        };


        $scope.getProfileInformation = function() {
            var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.profile + "/" + $scope.userData._id;
             var url2=$rootScope.appConfig.baseUrl+ $rootScope.appConfig.user;            
            var br ={
                _id:$scope.userData._id
            }            
            fantumnService.get(url).then(function(res) {
                $rootScope.loader = false;
                if (res && res.data.status == "success") {
                    $scope.profile = res.data.data;
                    
                    $scope.profileInfo.name = $scope.profile.firstName;
                    $scope.profileInfo.lastname = $scope.profile.lastName;
                   // $scope.profileInfo.email = $scope.profile.email;
                    $scope.profileInfo.mobile = $scope.profile.mobileNumber;
                    $scope.profileInfo.gender = $scope.profile.gender;
                    var t=$scope.profile.dob; 
                      var a = t.split('T');
                      
                     
                     $scope.profileInfo.dob = a[0];
                    $scope.profileInfo.address = $scope.profile.address.line1;
                    $scope.profileInfo.city = $scope.profile.address.city;
                    $scope.profileInfo.state = $scope.profile.address.state;
                    $scope.profileInfo.pincode = $scope.profile.address.pincode;
                    $scope.profileInfo.country = $scope.profile.address.country;
                    $scope.profileInfo.notification = $scope.profile.pushNotification;
                } else {
                   // $scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                    $scope.toastContent=res.data.error;
                   Materialize.toast($scope.toastContent, 1500,'rounded');
                }
            }, function(err) {
                $scope.toastContent = err ;
                Materialize.toast($scope.toastContent, 1500);
            });                      
             fantumnService.post(url2,br).then(function(res) {           
           $scope.profile1 = res.data.data;
           console.log()
           $scope.profileInfo.email=$scope.profile1.email;
           
           });
       
        };

        $scope.updateProfile = function(valid) {
           
            $scope.submitForm = true;
            var controlSubmit = false;
            if ($scope.profileInfo.gender == "") {
                $scope.genderError = true;
                controlSubmit = false;
            } else if ($scope.profileInfo.gender == undefined) {
                $scope.genderError = true;
                controlSubmit = false;
            } else {
                $scope.genderError = false;
                controlSubmit = true;
            }

            if (valid && controlSubmit) {
                $rootScope.loader = true;
                var t=$scope.profileInfo.dob; 
               var a = t.split(" ");
                 var date = a[0];
               var time = a[1];
                console.log(date);
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.updateProfile;
                var model = {
                    "_id": $scope.userData._id,
                    "firstName": $scope.profileInfo.name,
                    "lastName": $scope.profileInfo.lastname,
                    "gender": $scope.profileInfo.gender,
                    "dob":$scope.profileInfo.dob,
                    "mobileNumber": $scope.profileInfo.mobile,                    
                    "address": {
                        "line1": $scope.profileInfo.address,
                        "city": $scope.profileInfo.city,
                        "state": $scope.profileInfo.state,
                        "pincode": $scope.profileInfo.pincode,
                        "country": $scope.profileInfo.country
                    },
                    "pushNotification": $scope.profileInfo.notification
                };
                fantumnService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.profile = res.data.data;
                        $scope.submitForm = false;
                        $scope.name=$scope.profile.firstName;
                        $commons.showError('#successModal', "Profile Updated Successfully", true);
                        $scope.getProfileInformation();
                        $scope.enableProfile();
                    } else {
                        //$scope.toastContent = $('<span>' + res.data.error + '</span>').add($('<button class="btn-flat toast-action">OK</button>'));
                     $scope.toastContent=res.data.error;
                        Materialize.toast($scope.toastContent, 1500,'rounded');
                    }
                }, function(err) {
                    $scope.toastContent =  err ;
                    Materialize.toast($scope.toastContent, 1500,'rounded');
                });
            }
        };

        $scope.changePasswordOpen = function() {
            angular.element('.setting-modal').addClass('active');
            $scope.settingDrop = true;
        };
        $scope.changePasswordClose = function() {
            angular.element('.setting-modal').removeClass('active');
            $scope.settingDrop = false;
        };

        $scope.uploadAvatar = function(upload) {
            if ($scope.file != "") {
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.uploadProfileImage;
                var file = [];
                file.push($scope.file);
                var model = {
                    "file": file,
                    "username": $scope.userData.username,
                    "type": "image",
                    "viewport": "desktop"
                };
                console.log(model);
                fantumnService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $commons.showSuccess('#successModal', "Profile Picture Uploaded Successfully", true);
                        $scope.profileUpload = false;
                    } else {
                        $scope.toastContent = res.data.error;
                        Materialize.toast($scope.toastContent, 1500,'rounded');
                    }
                }, function(err) {
                    $scope.toastContent = $('<span>' + err + '</span>').add($('<button class="btn-flat toast-action"  >OK</button>'));
                    Materialize.toast($scope.toastContent, 1500,'rounded');
                });
            } else {
                $scope.toastContent = 'Please Upload Profile Picture';
                 Materialize.toast($scope.toastContent, 1500,'rounded');
            }
        };
        $scope.addProfile = function() {
            if ($scope.profileEdit) {
                document.getElementById('avatar').click();
            }
        };

        $("#avatar").change(function() {
            readURL(this);
        });

        function readURL(input) {
            alert("wewew");
            console.log(input);
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $scope.file = input.files[0];
                    angular.element("#proPic").css({ "background-image": "url(" + e.target.result + ")" });
                    $scope.picture = e.target.result;
                    $scope.profileInfo.avatar = e.target.result;
                    $scope.profileUpload = true;
                }

                reader.readAsDataURL(input.files[0]);
            }
        };




        $scope.onLoad = function(e, reader, file, fileList, fileOjects, fileObj) {
            try {
                if (e == "unsupported") {
                    $commons.showError("Sorry, the uploaded file type is not supported. Please choose a JPEG (or) PNG type image.");

                } else {
                    if (fileObj && fileObj.filetype && fileObj.filetype.split("/")[0] == "image") {
                        alert($scope.profilePic);
                        $scope.file = $scope.profilePic;
                        $scope.picture = fileObj.base64;
                        $scope.profileBase = fileObj.base64;
                        $scope.profileInfo.avatar = $scope.profileBase;
                        $scope.profileUpload = true;
                        // $scope.inlineStyle = {
                        //     background: url($scope.profileBase)
                        // };
                    }
                }
            } catch (err) {
                exceptionService.promiseRejectsAfterAWhile(err);
            }


        };

        $scope.changePassword = function(valid) {
            $scope.passwordChange = true;
            if (valid) {
                $rootScope.loader = true;
                var url = $rootScope.appConfig.baseUrl + $rootScope.appConfig.changePassword;
                var model = {
                    "username": $scope.userData.username,
                    "oldPassword": $scope.changePass.oldPass,
                    "newPassword": $scope.changePass.newPass
                };
                fantumnService.post(url, model).then(function(res) {
                    $rootScope.loader = false;
                    if (res && res.data.status == "success") {
                        $scope.passwordChange = false;
                        console.log(res.data.data);
                        $commons.showSuccess('#successModal', "Password Changed Successfully", true);
                    } else {
                        $scope.toastContent =  res.data.error 
                         Materialize.toast($scope.toastContent, 1500,'rounded');
                    }
                }, function(err) {
                    $scope.toastContent =  err ;
                     Materialize.toast($scope.toastContent, 1500,'rounded');
                });
            }
        };

        $scope.enableProfile = function() {
            if ($scope.profileEdit) {
                $scope.profileEdit = false;
                angular.element('.setting-profile').removeClass('edit');
            } else {
                $scope.profileEdit = true;
                angular.element('.setting-profile').addClass('edit');
            }
        };

        $scope.initFunction();
   }else        
         $commons.navigate('layout.dashboard', '', false);
             }else
                 $commons.navigate('layout.dashboard', '', false);
    }
}(window, angular);
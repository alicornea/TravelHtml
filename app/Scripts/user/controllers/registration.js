(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name travelHtmlApp.controller:RegistrationCtrl
     * @description
     * # RegistrationCtrl
     * Controller of user details
     */
    angular.module('travelHtmlApp').controller('RegistrationCtrl', ['$rootScope', '$scope', 'userService', '$window', 'Convert', 'SHA1', '$location',
        function ($rootScope, $scope, userService, $window, Convert, SHA1, $location) {
            $scope.errorMessage = '';
            $scope.register = function (isValid) {
                $scope.errorMessage = '';
                if (!isValid) {
                    return;
                }

                var user = angular.copy($scope.user);
                //hash user password
                user.password = SHA1.hash($scope.user.password);
                userService.saveUser(user).then(function (data) {
                    if (data.errorCode) {
                        if (data.errorCode == "2") //error code for duplicate user
                            $scope.registrationForm.txtUsername.$setValidity('duplicateUser', false);

                        $scope.errorMessage = 'Technical error. Please try again later!';
                    }
                    else {//user is registered and we need to perform autologin
                        var encodedProfile = data.token.split('.')[1];
                        var profile = JSON.parse(Convert.urlBase64Decode(encodedProfile));

                        $window.localStorage.token = data.token;
                        $window.localStorage.profileId = profile.id;

                        $location.path("/");
                    }
                })
            }

            $scope.validateUsername = function () {
                $scope.registrationForm.txtUsername.$setValidity('duplicateUser', true);
            }
        }]);
})();
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
            $scope.register = function () {
                //hash user password
                $scope.password = SHA1.hash($scope.password);
                userService.saveUser($scope.user).then(function (data) {
                    console.log(data);
                    if (data.errorCode) {
                        alert(data.errorCode);
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
        }]);
})();
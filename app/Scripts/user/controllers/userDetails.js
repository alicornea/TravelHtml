(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name travelHtmlApp.controller:UserDetailsCtrl
     * @description
     * # UserDetailsCtrl
     * Controller of user details
     */
    angular.module('travelHtmlApp').controller('UserDetailsCtrl', ['$rootScope', '$scope', 'userService', '$window', function ($rootScope, $scope, userService, $window) {
        $scope.errorMessage = '';
        $scope.message = '';
        if ($window.localStorage.profileId) {
            userService.getUser($window.localStorage.profileId).then(function (userDetails) {
                $scope.userDetails = userDetails;

                $scope.updateUser = function (isValid) {
                    $scope.errorMessage = '';
                    $scope.message = '';

                    if (!isValid) {
                        return;
                    }

                    userService.updateUser($scope.userDetails).then(function (response) {
                        if (data.errorCode)
                            $scope.errorMessage = 'Error while updating user, please try again later!';
                        else
                            $scope.message = 'Update successfull!';
                    });
                };
            });
        }
    }]);
})();
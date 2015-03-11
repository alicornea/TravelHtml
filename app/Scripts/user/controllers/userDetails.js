(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name travelHtmlApp.controller:UserDetailsCtrl
     * @description
     * # UserDetailsCtrl
     * Controller of user details
     */
    angular.module('travelHtmlApp').controller('UserDetailsCtrl', ['$rootScope', '$scope', 'userService', '$window', function($rootScope, $scope, userService, $window) {
        if ($window.localStorage.profileId) {
            userService.getUser($window.localStorage.profileId).then(function(userDetails) {
                $scope.userDetails = userDetails;

                $scope.updateUser = function() {
                    userService.updateUser($scope.userDetails).then(function(response) {
                        
                    })
                };
            });
        }
    }]);
})();
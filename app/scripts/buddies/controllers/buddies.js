(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name travelHtmlApp.controller:BuddiesctrlCtrl
     * @description
     * # BuddiesctrlCtrl
     * Controller of the travelHtmlApp
     */
    angular.module('travelHtmlApp')
      .controller('BuddiesCtrl', ['$scope', 'usersService', '$timeout', function($scope, usersService, $timeout) {

          $scope.users = usersService.getUsers();

          $scope.searchFriendsSuggestions = function () {
              console.log("model changed");
          };

      }]);
})();

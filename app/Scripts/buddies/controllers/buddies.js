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
      .controller('BuddiesCtrl', ['$scope', 'buddiesFactory', '$timeout', function ($scope, buddiesFactory, $timeout) {

          $scope.users = [];
          $scope.showSuggestions = false;

          $scope.searchFriendsSuggestions = function () {
              if ($scope.friendToSearch === undefined || $scope.friendToSearch.length === 0) {
                  $scope.users = [];
              } else {
                  $scope.showSuggestions = true;
                  $scope.users = buddiesFactory.getBuddiesSuggestions($scope.friendToSearch);
              }              
          };

          $scope.addBuddy = function (newBuddy) {
              newBuddy.isNewBuddy = false;

              if (buddiesFactory.addBuddy(newBuddy)) {
                  newBuddy.isBuddy = true;
                  newBuddy.isNewBuddy = true;
              }
          }

          $scope.removeBuddy = function (buddy) {
              if (buddiesFactory.removeBuddy(buddy)) {
                  buddy.isBuddy = false;
                  buddy.isNewBuddy = false;
              }
          }

          $scope.clearSearch = function () {
              $scope.friendToSearch = "";
              $scope.users = [];
              $scope.showSuggestions = false;
          }

      }]);
})();

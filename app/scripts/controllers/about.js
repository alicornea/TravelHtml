'use strict';

/**
 * @ngdoc function
 * @name travelHtmlApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the travelHtmlApp
 */
angular.module('travelHtmlApp')
  .controller('AboutCtrl', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
  });

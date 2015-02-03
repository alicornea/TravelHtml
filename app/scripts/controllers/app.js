'use strict';

/**
 * @ngdoc function
 * @name travelHtmlApp.controller:AppJsCtrl
 * @description
 * # AppJsCtrl
 * Controller of the travelHtmlApp
 */
angular.module('travelHtmlApp')
  .controller('AppJsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'ui.bootstrap.datetimepicker'
    ];
  });

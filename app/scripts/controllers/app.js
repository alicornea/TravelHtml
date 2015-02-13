'use strict';

/**
 * @ngdoc function
 * @name travelHtmlApp.controller:AppJsCtrl
 * @description
 * # AppJsCtrl
 * Controller of the travelHtmlApp
 */
angular.module('travelHtmlApp')
  .controller('AppJsCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $rootScope.isPopupEnabled = false;
  }]);

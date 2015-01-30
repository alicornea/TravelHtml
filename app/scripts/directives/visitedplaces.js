'use strict';

/**
 * @ngdoc directive
 * @name travelHtmlApp.directive:AddTravel
 * @description
 * # AddTravel
 */
angular.module('travelHtmlApp')
  .directive('visitedPlaces', ['$compile', function($compile) {
    return {
      restrict: 'E',
      templateUrl: 'views/travel/visitedplaces.html',
      link: function(scope, element, attrs) {
        
      }
    };
  }]);

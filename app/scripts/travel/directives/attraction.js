(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name travelHtmlApp.directive:addattraction
   * @description
   * # addattraction
   */
  angular.module('travelHtmlApp')
    .directive('attraction', ['$compile', function($compile) {
      return {
        restrict: 'E',
        templateUrl: 'views/travel/directives/attraction.html',
        link: function(scope, element, attrs) {}
      };
    }]);
})();

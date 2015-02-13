(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name travelHtmlApp.directive:travelRating
   * @description
   * # travelRating
   */
  angular.module('travelHtmlApp')
    .directive('travelRating', ['$compile', function($compile) {
      return {
        restrict: 'E',
        templateUrl: 'views/travel/directives/travelrating.html',
        link: function(scope, element, attrs) {}
      };
    }]);
})();

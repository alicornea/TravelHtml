(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name travelHtmlApp.directive:attractionRating
   * @description
   * # attractionRating
   */
  angular.module('travelHtmlApp')
    .directive('attractionRating', ['$compile', function($compile) {
      return {
        restrict: 'E',
        templateUrl: 'views/travel/directives/attractionrating.html',
        link: function(scope, element, attrs) {}
      };
    }])
})();

(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name travelHtmlApp.directive:addattraction
   * @description
   * # addattraction
   */
  angular.module('travelHtmlApp')
    .directive('addAttraction', ['$compile', function($compile) {
      return {
        restrict: 'E',
        templateUrl: 'views/travel/directives/addattraction.html',
        link: function(scope, element, attrs) {}
      };
    }]);
})();

'use strict';

/**
 * @ngdoc directive
 * @name travelHtmlApp.directive:datetimeFormat
 * @description
 * # datetimeFormat
 */
angular.module('travelHtmlApp')
  .directive('datetimeFormat', ['$filter', function($filter) {
    return {
      require: 'ngModel',
      transclude: true,
      link: function(scope, element, attrs, ngModelCtrl) {
        
        function dateTimeFormat(value) {
          var filteredDatetime = $filter('date')(value, 'MM/dd/yyyy');

          ngModelCtrl.$setViewValue(filteredDatetime);
          ngModelCtrl.$render();

          return filteredDatetime;
        }

        ngModelCtrl.$parsers.push(dateTimeFormat);
      }
    };
  }]);

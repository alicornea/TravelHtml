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
          var filteredDatetime = $filter('date')(value, 'MMM dd, yyyy');

          ngModelCtrl.$setViewValue(filteredDatetime);

          return filteredDatetime;
        }

        ngModelCtrl.$parsers.unshift(dateTimeFormat);
      }
    };
  }]);

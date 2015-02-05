'use strict';

/**
 * @ngdoc directive
 * @name travelHtmlApp.directive:lessThan
 * @description
 * # lessThan
 */
angular.module('travelHtmlApp')
  .directive('dateGreaterThan', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        
        function validateGreaterThan(value) {
          var valid = (Date.parse(value) > Date.parse(scope.$eval(attrs.dateGreaterThan)));

          ngModelCtrl.$setValidity('greater', valid);
          
          if(!valid){
            return undefined;
          }
          
          return value;
        }
        
        ngModelCtrl.$parsers.unshift(validateGreaterThan);
      }
    };
  });

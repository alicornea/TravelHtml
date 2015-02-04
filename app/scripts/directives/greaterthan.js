'use strict';

/**
 * @ngdoc directive
 * @name travelHtmlApp.directive:lessThan
 * @description
 * # lessThan
 */
angular.module('travelHtmlApp')
  .directive('greaterThan', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelCrtl) {
        
        /*function validateGreaterThan(value) {
          var valid = (Date.parse(value) > Date.parse(scope.$eval(attrs.greaterThan)));

          ngModelCrtl.$setValidity('greater', valid);
          if(!valid){
            return undefined;  
          }
        }
        */
        function logsomething(){
          console.log('greaterthanexecuted');
        }
        
        ngModelCrtl.$parsers.push(logsomething);
      }
    };
  });

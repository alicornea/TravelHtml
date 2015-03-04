(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name travelHtmlApp.directive:addNgAutocomplete
   * @description
   * # addNgAutocomplete
   */
  angular.module('travelHtmlApp')
    .directive('addNgAutocompleteAttr', ['$rootScope', '$compile', function($rootScope, $compile) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, el, attrs, ngModelCtrl) {
          
          scope.addNgAutocompleteAttr = function() {
            el.removeAttr('data-add-ng-autocomplete-attr');
            el.attr('data-ng-autocomplete','');
            $compile(el)(scope);
          };
          
          if($rootScope.googleMapsApi.isLoaded){
            scope.addNgAutocompleteAttr();
          }

          $rootScope.$on("GoogleMapsApiLoaded", scope.addNgAutocompleteAttr);
        }
      };
    }]);
})();

(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name travelHtmlApp.GoogleMapsInitializer
   * @description
   * # GoogleMapsInitializer
   * Factory in the travelHtmlApp.
   */
  angular.module('travelHtmlApp')
    .factory('googleMapsInitializer', ['$window', '$q', function($window, $q) {
      // Service logic
      // ...

      var googleMapApi = 'https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&callback=';
      var mapsDefer = $q.defer();

      $window.googleMapsInitialized = mapsDefer.resolve;

      var asyncLoad = function(asyncUrl, callbackName) {
        console.log('google api called.. ');
        var script = document.createElement('script');
        //script.type = 'text/javascript';
        script.src = asyncUrl + callbackName;
        document.head.appendChild(script);
      };

      asyncLoad(googleMapApi, 'googleMapsInitialized');

      return {
        mapsInitialized: mapsDefer.promise
      };
    }]);
})();

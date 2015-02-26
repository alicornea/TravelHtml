(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name travelHtmlApp.directive:geoLocation
   * @description
   * # geoLocation
   */
  angular.module('travelHtmlApp')
    .directive('geoLocation', ['$rootScope', function($rootScope) {
      return {
        template: '<div id="map-canvas"></div>',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
          var map;

          function initialize() {
            var mapOptions = {
              zoom: 8,
            };

            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var infoWindow = new google.maps.InfoWindow({
                  map: map,
                  position: pos,
                  content: 'Your current location'
                });

                map.setCenter(pos);
              }, function() {
                handleNoGeolocation(true);
              });
            }
            else {
              handleNoGeolocation(false);
            }
          }

          function handleNoGeolocation(errorFlag) {
            var content = 'Error: Your browser doesn\'t support geolocation.';

            if (errorFlag) {
              content = 'Error: The Geolocation service failed.';
            }
            else {

            }

            var options = {
              map: map,
              position: new google.maps.LatLng(60, 105),
              content: content
            };

            var infoWindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);
          }

          $rootScope.$on("GoogleMapsApiLoaded", initialize);
        }
      };
    }]);
})();

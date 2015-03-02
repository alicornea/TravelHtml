(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name travelHtmlApp.travelService
   * @description
   * # travelService
   * Factory in the travelHtmlApp.
   */
  angular.module('travelHtmlApp')
    .factory('travelService', ['$resource', 'ServiceApi', '$rootScope', '$q', 'googleMapsInitializer', '$window', function($resource, ServiceApi, $rootScope, $q, googleMapsInitializer, $window) {
      // Service logic
      // ...
      
      var api = ServiceApi.url + '/api/travels';
      
      var initializeGoogleMapsApi = function(){
        var deferred = $q.defer();
        
        if(!$rootScope.googleMapsApi.isLoaded){
          googleMapsInitializer.mapsInitialized().then(function(googleMaps){
            console.log('google maps api loaded..');
            deferred.resolve(googleMaps);
            $rootScope.googleMapsApi.isLoaded = true;
            $rootScope.$broadcast("GoogleMapsApiLoaded");
          });
        }
        
        return deferred.promise;
      };

      var getUsersTravels = function() {
        var travelResource = $resource(api + '/getTravelsByProfileId/:profileId', {
          profileId: '@profileId'
        }, {
          'query': {
            method: 'GET',
            isArray: true
          }
        });
        var deferred = $q.defer();

        travelResource.query({
            profileId: $window.localStorage.profileId
          }, function(travels) {
            deferred.resolve(travels);
          }),
          function(err) {
            deferred.reject(err);
          };

        return deferred.promise;
      };

      var save = function(travel) {
        var travelResource = $resource(api);
        var deferred = $q.defer();

        travelResource.save(travel).$promise.then(function(res) {
            deferred.resolve(true);
          }),
          function(err) {
            console.log(err);
            deferred.resolve(false);
          };

        return deferred.promise;
      };

      var remove = function(travelId) {
        var travelResource = $resource(api + '/:travelId');
        var deferred = $q.defer();

        deferred.resolve(travelResource.delete({
          travelId: travelId
        }, function(res) {
          if (res.hasError !== undefined && res.hasError) {
            return false;
          }
          else {
            return true;
          }
        }));

        return deferred.promise;
      };

      var update = function(travel) {
        var travelResource = $resource(api + '/:travelId', {
          travelId: '@travelId'
        }, {
          'update': {
            method: 'PUT'
          }
        });
        var deferred = $q.defer();

        travelResource.update({
          travelId: travel._id
        }, travel, function(res) {
          if (res.hasError !== undefined && res.hasError) {
            deferred.resolve({
              updatedSuccessfully: false
            });
          }
          else {
            deferred.resolve({
              updatedSuccessfully: true
            });
          }
        });

        return deferred.promise;
      };

      // Public API here
      return {
        getUsersTravels: getUsersTravels,
        save: save,
        remove: remove,
        update: update,
        initializeGoogleMapsApi: initializeGoogleMapsApi
      };

    }]);
})();

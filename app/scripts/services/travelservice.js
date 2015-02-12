'use strict';

/**
 * @ngdoc service
 * @name travelHtmlApp.travelService
 * @description
 * # travelService
 * Factory in the travelHtmlApp.
 */
angular.module('travelHtmlApp')
  .factory('travelService', ['$resource', 'ServiceApi', '$q', function($resource, ServiceApi, $q) {
    // Service logic
    // ...
    var api = ServiceApi.url + '/travels';
    
    var getUsersTravels = function() {
      var travelResource = $resource(api);
      var deferred = $q.defer();

      travelResource.query(function(travels) {
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

      travelResource.delete({
        travelId: travelId
      }, function(res) {
        if (res.hasError === undefined || res.hasError) {
          deferred.resolve({
            removedSuccessfully: false
          });
        }

        deferred.resolve({
          removedSuccessfully: true
        });
      });
      
      return deferred.promise;
    };

    // Public API here
    return {
      getUsersTravels: getUsersTravels,
      save: save,
      remove: remove,
    };

  }]);

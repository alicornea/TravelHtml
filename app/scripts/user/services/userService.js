(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name travelHtmlApp.userService
     * @description
     * # userService
     * Factory in the travelHtmlApp.
     */
    angular.module('travelHtmlApp').service('userService', ['$resource', 'ServiceApi', '$q', 'Restangular', function($resource, ServiceApi, $q, Restangular) {

        var api = ServiceApi.url + '/api/users';

        return {

            getUser: function(userId) {
                var userResource = $resource(api + '/:userId', null, {
                    'query': {
                        method: 'GET',
                        isArray: false
                    }
                });
                var deferred = $q.defer();

                userResource.query({
                        userId: userId
                    }, function(user) {
                        deferred.resolve(user);
                    }),
                    function(err) {
                        deferred.reject(err);
                    };

                return deferred.promise;
            },

            getUsers: function () {
                var deffered = $q.defer();

                Restangular.all('api/users').getList().then(function (users) {
                    deffered.resolve(users);
                });
                  
                return deffered.promise;
            },

            updateUser: function(user) {
                var userResource = $resource(api + '/:userId', {
                    userId: '@userId'
                }, {
                    'update': {
                        method: 'PUT'
                    }
                });
                var deferred = $q.defer();

                userResource.update({
                    userId: user._id
                }, user, function(res) {
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
            }

            /*var save = function(travel) {
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
                    if (res.hasError !== undefined && res.hasError) {
                        deferred.resolve({
                            removedSuccessfully: false
                        });
                    }
                    else {
                        deferred.resolve({
                            removedSuccessfully: true
                        });
                    }
                });

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
            };*/

        }
    }]);
})();

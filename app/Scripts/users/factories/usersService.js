(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name travelHtmlApp.users
     * @description
     * # users
     * Factory in the travelHtmlApp.
     */
    angular.module('travelHtmlApp')
      .factory('usersService', ['ServiceApi', 'Restangular', '$q', function (ServiceApi, Restangular, $q) {

          //var api = ServiceApi.url + '/api/users';
          var usersList = Restangular.all('api/users');

          var getUsers = function () {
              var users = usersList.getList().$object;
              return users;
          };

          // Public API here
          return {
              getUsers: getUsers
          };
      }]);

})();

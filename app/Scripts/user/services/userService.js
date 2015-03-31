(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name travelHtmlApp.userService
     * @description
     * # userService
     * Factory in the travelHtmlApp.
     */

    angular.module('travelHtmlApp').service('userService', ['Restangular', '$q', function (Restangular, $q) {
        var api = 'api/users';

        return {

            getUser: function (userId) {
                var deffered = $q.defer();

                Restangular.one(api, userId).get().then(function (user) {
                    deffered.resolve(user);
                });

                return deffered.promise;
            },

            getUsers: function () {
                var deffered = $q.defer();

                Restangular.all(api).getList().then(function (users) {
                    deffered.resolve(users);
                });

                return deffered.promise;
            },

            updateUser: function (user) {
                var deffered = $q.defer();

                user.put().then(function (user) {
                    deffered.resolve(user);
                });

                return deffered.promise;
            },

            saveUser: function (user) {
                var deffered = $q.defer();

                Restangular.service("register").post({
                    username: user.username,
                    password: user.password,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }).then(function (data) {
                    deffered.resolve(data);
                });

                return deffered.promise;
            },

            changePassword: function (userId, currentPassword, newPassword) {
                var deffered = $q.defer();

                var userChangePassword = Restangular.service(api + '/changePassword');
                userChangePassword.post({
                    userId: userId,
                    currentPassword: currentPassword,
                    newPassword: newPassword
                }).then(function (data) {
                    deffered.resolve(data);
                });

                return deffered.promise;
            }
        }
    }]);
})();
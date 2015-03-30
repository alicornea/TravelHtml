(function () {
    'use strict';
    /**
     * @ngdoc directive
     * @name travelHtmlApp.directive:login
     * @description
     * # Login
     */
    angular.module('travelHtmlApp')
        .directive('authentication', ['$http', '$window', '$rootScope', 'ServiceApi', 'Convert', 'facebookService', 'twitterService', '$location', 'SHA1',
            function ($http, $window, $rootScope, ServiceApi, Convert, facebookService, twitterService, $location, SHA1) {
                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: 'views/directives/authentication.html',
                    link: function (scope) {
                        twitterService.initialize(); //initialize twitter service (oAuth)

                        scope.isLoggedIn = $window.localStorage != null && $window.localStorage.token != null;

                        scope.login = function (credentials) {
                            //hash password before sending it to the server
                            $http.post(ServiceApi.url + '/authenticate', { username: credentials.username, password: SHA1.hash(credentials.password) })
                                .success(function (data, status, headers, config) {
                                    loginResponseHandler(data);
                                })
                                .error(function (data, status, headers, config) {
                                    loginErrorResponseHandler();
                                });
                        };

                        scope.logout = function () {
                            facebookService.getLoginStatus(function (response) {
                                if (response && response.status === 'connected') { //user logged in with FB
                                    facebookService.logout(function () {
                                        logoutHandler();
                                    });
                                }
                                else {
                                    twitterService.clearCache();
                                    logoutHandler();
                                }
                            });
                        };

                        scope.twitterLogin = function () {
                            twitterService.connectTwitter().then(function () {
                                if (twitterService.isReady()) {
                                    twitterService.getUserDetails().then(function (response) {
                                        $http.post(ServiceApi.url + '/authenticateviatwitter', parseUserDataFromTwitter(response))
                                            .success(function (data, status, headers, config) {
                                                loginResponseHandler(data);
                                            })
                                            .error(function (data, status, headers, config) {
                                                loginErrorResponseHandler();
                                            });
                                    });
                                }
                            });
                        };

                        scope.fbLogin = function () {
                            //if logged in in FB, auto login in app
                            facebookService.getLoginStatus(function (response) {
                                if (response && response.status === 'connected') { //user logged in with FB
                                    connectWithFacebook();
                                }
                                else
                                    facebookService.login();
                            });
                        }

                        $rootScope.$on("fb_connected", function (event, args) {
                            connectWithFacebook();
                        });

                        function userLoggedIn() {
                            return $window.localStorage != null && $window.localStorage.token != null;
                        }

                        function connectWithFacebook() {
                            facebookService.getUserInfo(function (response) {
                                $http.post(ServiceApi.url + '/authenticateViaFacebook', response)
                                    .success(function (data, status, headers, config) {
                                        loginResponseHandler(data);
                                    })
                                    .error(function (data, status, headers, config) {
                                        loginErrorResponseHandler();
                                    });
                            });
                        }

                        function loginResponseHandler(data) {
                            var encodedProfile = data.token.split('.')[1];
                            var profile = JSON.parse(Convert.urlBase64Decode(encodedProfile));

                            $window.localStorage.token = data.token;
                            $window.localStorage.profileId = profile.id;

                            scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
                            scope.isLoggedIn = true;
                        }

                        function loginErrorResponseHandler() {
                            // Erase the token if the user fails to log in
                            delete $window.localStorage.token;
                            delete $window.localStorage.profileId;

                            // Handle login errors here
                            scope.error = 'Error: Invalid user or password';
                            scope.welcome = '';
                            scope.isLoggedIn = false;

                            if (!scope.$$phase)
                                scope.$apply();
                        }

                        function parseUserDataFromTwitter(data) {
                            var names = data.name.split(' ');

                            return {
                                id: data.id,
                                first_name: names ? names[0] : '',
                                last_name: names.length > 1 ? names[1] : '',
                                email: ''
                            };
                        }

                        function logoutHandler() {
                            delete $window.localStorage.token;
                            delete $window.localStorage.profileId;

                            scope.welcome = '';
                            scope.message = '';
                            scope.isLoggedIn = false;

                            if (!scope.$$phase)
                                scope.$apply();

                            $location.path("/");
                        }
                    }
                };
            }
        ]);
}());
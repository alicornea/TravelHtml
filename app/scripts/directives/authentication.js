(function() {
    'use strict';
    /**
     * @ngdoc directive
     * @name travelHtmlApp.directive:login
     * @description
     * # Login
     */
    angular.module('travelHtmlApp')
        .directive('authentication', ['$http', '$window', '$rootScope', 'ServiceApi', 'Convert', 'facebookService', 'twitterService',
            function($http, $window, $rootScope, ServiceApi, Convert, facebookService, twitterService) {
                return {
                    restrict: 'E',
                    replace: true,
                    templateUrl: 'views/directives/authentication.html',
                    link: function(scope) {
                        twitterService.initialize(); //initialize twitter service (oAuth)

                        scope.login = function(credentials) {
                            $http.post(ServiceApi.url + '/authenticate', credentials)
                                .success(function(data, status, headers, config) {
                                    loginResponseHandler(data);
                                })
                                .error(function(data, status, headers, config) {
                                    loginErrorResponseHandler();
                                });
                        };

                        scope.logout = function() {
                            facebookService.getLoginStatus(function(response) {
                                if (response && response.status === 'connected') { //user logged in with FB
                                    facebookService.logout(function() {
                                        logoutHandler();
                                    });
                                }
                                else {
                                    twitterService.clearCache();
                                    logoutHandler();
                                }
                            });
                        };

                        scope.isLoggedIn = function() {
                            return $window.localStorage != null && $window.localStorage.token != null;
                        };

                        scope.twitterLogin = function() {
                            twitterService.connectTwitter().then(function() {
                                if (twitterService.isReady()) {
                                    //if the authorization is successful, hide the connect button and display the tweets
                                    twitterService.getUserDetails().then(function(response) {
                                        $http.post(ServiceApi.url + '/authenticateViaTwitter', parseUserDataFromTwitter(response))
                                            .success(function(data, status, headers, config) {
                                                loginResponseHandler(data);
                                            })
                                            .error(function(data, status, headers, config) {
                                                loginErrorResponseHandler();
                                            });
                                    })
                                }
                            });
                        }

                        $rootScope.$on("fb_connected", function(event, args) {
                            facebookService.getUserInfo(function(response) {
                                $http.post(ServiceApi.url + '/authenticateViaFacebook', response)
                                    .success(function(data, status, headers, config) {
                                        loginResponseHandler(data);
                                    })
                                    .error(function(data, status, headers, config) {
                                        loginErrorResponseHandler();
                                    });
                            });
                        });

                        function loginResponseHandler(data) {
                            $window.localStorage.token = data.token;
                            var encodedProfile = data.token.split('.')[1];
                            var profile = JSON.parse(Convert.urlBase64Decode(encodedProfile));
                            scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
                        }

                        function loginErrorResponseHandler() {
                            // Erase the token if the user fails to log in
                            delete $window.localStorage.token;

                            // Handle login errors here
                            scope.error = 'Error: Invalid user or password';
                            scope.welcome = '';
                        }

                        function logoutHandler() {
                            scope.welcome = '';
                            scope.message = '';
                            delete $window.localStorage.token;
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
                    }
                }
            }
        ])
}());
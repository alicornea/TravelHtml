'use strict';

/**
 * @ngdoc overview
 * @name travelHtmlApp
 * @description
 * # travelHtmlApp
 *
 * Main module of the application.
 */
angular.module('travelHtmlApp', [
        'ngAnimate',
        'ngMessages',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'gridster',
        'ui.bootstrap.datetimepicker',
        'restangular',
        'angulike',
        'ngAnimate',
        'ngTouch',
        'swipe',
        'ngAutocomplete',
        'angularFileUpload'
])
    .config(['$routeProvider', 'RestangularProvider', 'ServiceApi', function ($routeProvider, RestangularProvider, ServiceApi) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/dashboard/:editEnabled', {
                templateUrl: 'views/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/addtravel', {
                templateUrl: 'views/travel/addtravel.html',
                controller: 'TravelsCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/travel/addtravel.html',
                controller: 'DashboardCtrl'
            })
            .when('/mytravels', {
                templateUrl: 'views/travel/mytravels.html',
                controller: 'TravelsCtrl',
            })
            .when('/attractions', {
                templateUrl: 'views/attractions/attractions.html',
                controller: 'AttractionsCtrl',
                        })
            .when('/test', {
                templateUrl: 'swipe.html',
                controller: 'TestCtrl'
            })
            .when('/user', {
                templateUrl: 'views/user/user.html',
                controller: 'UserDetailsCtrl'
            })
            .when('/changepassword', {
                templateUrl: 'views/user/changepassword.html',
                controller: 'ChangePasswordCtrl'
            })
            .when('/registration', {
                templateUrl: 'views/user/registration.html',
                controller: 'RegistrationCtrl'
            })
            .when('/gallery', {
                templateUrl: 'views/gallery/gallery.html',
                controller: 'GalleryCtrl'
            }).when('/buddies', {
                templateUrl: 'views/buddies/buddies.html',
                controller: 'BuddiesCtrl'
            })

          .otherwise({
              redirectTo: '/'
          });

        RestangularProvider.setBaseUrl(ServiceApi.url);
        RestangularProvider.setRestangularFields({
            id: "_id"
        });
    }]);


angular.module('travelHtmlApp').run(['$window', 'facebookService', 'ServiceApi', 'Restangular', '$rootScope', '$templateCache', '$http',
    function ($window, facebookService, ServiceApi, Restangular, $rootScope, $templateCache, $http) {

        FB.init({
            appId: '1013215985358490',
            channelUrl: 'app/channel.html',
            status: true, //Set if you want to check the authentication statusat the start up of the app
            cookie: true, //Enable cookies to allow the server to access the session
            xfbml: true /* Parse XFBML */
        });

        FB.Event.subscribe('auth.authResponseChange', facebookService.statusChangeCallback);

        $rootScope.$on('$routeChangeStart', function (next, current) {
            $rootScope.disableAddAttractionPopup();
            $rootScope.disableEditAttractionPopup();
        });

        $http.get('views/errorMessages.html').then(function (response) {
            $templateCache.put('errorMessages', response.data);
        });
    }
]);

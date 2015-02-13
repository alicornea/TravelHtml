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
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'gridster',
    'ui.bootstrap.datetimepicker',
    'ngAutocomplete',
    'restangular'
  ])
  .config(function($routeProvider) {
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

      .when('/mytravels', {
        templateUrl: 'views/travel/mytravels.html',
        controller: 'TravelsCtrl',

      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      })
      
      .otherwise({
        redirectTo: '/'
      });
  });


angular.module('travelHtmlApp').run(['$window', 'facebookService','ServiceApi', 'Restangular', function($window, facebookService, ServiceApi, Restangular) {


  Restangular.setBaseUrl(ServiceApi.url);


  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({
      appId: '1013215985358490',
      channelUrl: 'app/channel.html',
      status: true, //Set if you want to check the authentication statusat the start up of the app
      cookie: true, //Enable cookies to allow the server to access the session
      xfbml: true /* Parse XFBML */
    });

    FB.Event.subscribe('auth.authResponseChange', facebookService.statusChangeCallback);
  };

  // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

  (function(d) {
    // load the Facebook javascript SDK

    var js,
      id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];

    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";

    ref.parentNode.insertBefore(js, ref);

  }(document));
}]);

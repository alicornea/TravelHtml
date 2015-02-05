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
    'ngTouch'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
        controller: 'AddTravelCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


angular.module('travelHtmlApp').run(['$window', 'Facebook', function($window, Facebook) {

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({
      appId: '1013215985358490',
      channelUrl: 'app/channel.html',
      status: true, //Set if you want to check the authentication statusat the start up of the app
      cookie: true, //Enable cookies to allow the server to access the session
      xfbml: true /* Parse XFBML */
    });

    FB.Event.subscribe('auth.authResponseChange', Facebook.statusChangeCallback);
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

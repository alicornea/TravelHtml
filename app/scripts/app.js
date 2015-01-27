'use strict';

/**
 * @ngdoc overview
 * @name travelHtmlApp
 * @description
 * # travelHtmlApp
 *
 * Main module of the application.
 */
angular
  .module('travelHtmlApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
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

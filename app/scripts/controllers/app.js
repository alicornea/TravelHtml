'use strict';

/**
 * @ngdoc function
 * @name travelHtmlApp.controller:AppJsCtrl
 * @description
 * # AppJsCtrl
 * Controller of the travelHtmlApp
 */
angular.module('travelHtmlApp')
  .controller('AppJsCtrl', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window) {

      $rootScope.isPopupEnabled = false;

      $rootScope.disablePopup = function () {
          $rootScope.isPopupEnabled = false;
      };

      $rootScope.enablePopup = function () {
          $rootScope.isPopupEnabled = true;
      };

      $rootScope.addAttractionPopup = {
          isEnabled: false,
          initialLoad: true
      };

      $rootScope.editAttractionPopup = {
          isEnabled: false,
          initialLoad: true
      };

      $rootScope.googleMapsApi = {
          isLoaded: false
      };

      $rootScope.disableAddAttractionPopup = function () {
          $rootScope.addAttractionPopup.isEnabled = false;
          $scope.isPopupEnabled = false;
      };

      $rootScope.enableAddAttractionPopup = function () {
          $rootScope.addAttractionPopup.isEnabled = true;
          $scope.isPopupEnabled = true;
      };

      $rootScope.disableEditAttractionPopup = function () {
          $rootScope.editAttractionPopup.isEnabled = false;
          $scope.isPopupEnabled = false;
      };

      $rootScope.enableEditAttractionPopup = function () {
          $rootScope.editAttractionPopup.isEnabled = true;
          $scope.isPopupEnabled = true;
      };

      $rootScope.isUserAuthenticated = function () {
          return $window.localStorage != null && $window.localStorage.token != null;
      };
  }]);

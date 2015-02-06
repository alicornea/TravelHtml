'use strict';

/**
 * @ngdoc function
 * @name travelHtmlApp.controller:TravelAddtravelctrlCtrl
 * @description
 * # TravelAddtravelctrlCtrl
 * Controller of the travelHtmlApp
 */
angular.module('travelHtmlApp')
  .controller('TravelsCtrl', ['$scope', '$resource', '$filter', function($scope, $resource, $filter) {

    $scope.visitedPlaces = [];
    $scope.tripSaved = false;

    var TravelService = $resource("https://travelserver-andrei-murgu.c9.io/travels");

    $scope.addNewVisitedPlace = function(visitedPlace) {
      if (visitedPlace !== undefined) {
        pushVisitedPlace(visitedPlace);

        visitedPlace.name = null;
        visitedPlace.review = null;
        visitedPlace.rating = null;
        $scope.newVisitedPlaceSubmitted = false;
      }
    };

    $scope.submit = function() {
      if ($scope.visitedPlace !== undefined) {
        pushVisitedPlace($scope.visitedPlace);
      }

      var travel = createTravelModel();

      TravelService.save(travel).$promise.then(function() {
        console.log("Your travel has been saved with success");

        $scope.tripSaved = true;

        resetTravelModel();

        $scope.submitted = false;
        $scope.newVisitedPlaceSubmitted = false;
      });
    };

    /* Private Methods */

    var pushVisitedPlace = function(visitedPlace) {
      $scope.visitedPlaces.push({
        name: visitedPlace.name,
        review: visitedPlace.review,
        rating: visitedPlace.rating
      });
    };

    var createTravelModel = function() {
      return {
        leavingFrom: $scope.leavingFrom,
        destination: $scope.destination,
        startDate: $scope.startDate,
        endDate: $scope.endDate,
        flight: $scope.flight,
        review: $scope.travelReview,
        rating: $scope.travelRating,
        visitedPlaces: $scope.visitedPlaces
      };
    };

    var resetTravelModel = function() {
      $scope.leavingFrom = null;
      $scope.destination = null;
      $scope.startDate = null;
      $scope.endDate = null;
      $scope.flight = null;
      $scope.travelReview = null;
      $scope.travelRating = null;
      if ($scope.visitedPlace != null) {
        $scope.visitedPlace.name = null;
        $scope.visitedPlace.review = null;
        $scope.visitedPlace.rating = null;
      }
      
      $scope.visitedPlaces = [];
    };
  }]);

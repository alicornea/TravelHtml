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

    var TravelService = $resource("https://travelserver-andrei-murgu.c9.io/travels", { query : { methog: 'GET'}});
    
    $scope.loadTravels = function(){
      var myTravels = TravelService.query(function(travels){
        $scope.travel = travels[0];
      });
    };

    $scope.addNewVisitedPlace = function(visitedPlace) {
      if (visitedPlace !== undefined) {
        visitedPlace.date = new Date();
        pushVisitedPlace(visitedPlace);

        visitedPlace.name = null;
        visitedPlace.title = null;
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
        title: visitedPlace.title,
        review: visitedPlace.review,
        rating: visitedPlace.rating,
        date: new Date()
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
        $scope.visitedPlace.title = null;
        $scope.visitedPlace.review = null;
        $scope.visitedPlace.rating = null;
      }
      
      $scope.visitedPlaces = [];
    };
  }]);

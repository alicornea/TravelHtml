'use strict';

/**
 * @ngdoc function
 * @name travelHtmlApp.controller:TravelAddtravelctrlCtrl
 * @description
 * # TravelAddtravelctrlCtrl
 * Controller of the travelHtmlApp
 */
angular.module('travelHtmlApp')
  .controller('AddTravelCtrl', ['$scope', '$resource', function($scope, $resource) {
    
    $scope.visitedPlaces = [];
    var TravelService = $resource("https://travelserver-andrei-murgu.c9.io/travels");

    $scope.addNewVisitedPlace = function(visitedPlace) {
      if (visitedPlace !== undefined) {
        $scope.visitedPlaces.push(visitedPlace);
        /*visitedPlace = {
          name: null,
          review: null,
          rating: null
        };*/
        visitedPlace.name = null;
        visitedPlace.review = null;
        visitedPlace.rating = null;
      }
      
      $scope.newVisitedPlaceSubmitted = false;
    };

    $scope.submit = function(){
      $scope.visitedPlaces.push({
          name: $scope.visitedPlace.name,
          review: $scope.visitedPlace.review,
          rating: $scope.visitedPlace.rating
        });
      
      var travel = {
        locationName: $scope.locationName,
        startDate: $scope.startDate,
        endDate: $scope.endDate,
        flight: $scope.flight,
        review: $scope.travelReview,
        rating: $scope.travelRating,
        visitedPlaces: $scope.visitedPlaces
      };
      
      TravelService.save(travel).$promise.then(function(){
        console.log("Your travel has been saved with success");
      });
    };

  }]);

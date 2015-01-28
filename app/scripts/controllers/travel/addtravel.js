'use strict';

/**
 * @ngdoc function
 * @name travelHtmlApp.controller:TravelAddtravelctrlCtrl
 * @description
 * # TravelAddtravelctrlCtrl
 * Controller of the travelHtmlApp
 */
angular.module('travelHtmlApp')
  .controller('AddTravelCtrl', ['$scope', function($scope) {
    
    $scope.visitedPlaces = [];

    $scope.addNewVisitedPlace = function(visitedPlace) {
      if (visitedPlace !== undefined) {
        $scope.visitedPlaces.push(visitedPlace);
        visitedPlace = {
          name: null,
          review: null,
          rating: null
        };
      }
    };

    $scope.submit = function(){
      $scope.visitedPlaces.push({
          name: $scope.visitedPlace.name,
          review: $scope.visitedPlace.review,
          rating: $scope.visitedPlace.rating
        });
      
      var travel = {
        location: $scope.locationName,
        startDate: $scope.startDate,
        endDate: $scope.endDate,
        flight: $scope.flight,
        review: $scope.travelReview,
        rating: $scope.travelRating,
        visitedPlaces: $scope.visitedPlaces
      };
      console.log(travel);
    };

  }]);

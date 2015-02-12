(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name travelHtmlApp.controller:TravelAddtravelctrlCtrl
   * @description
   * # TravelAddtravelctrlCtrl
   * Controller of the travelHtmlApp
   */
  angular.module('travelHtmlApp')
    .controller('TravelsCtrl', ['$rootScope', '$scope', 'travelService', '$filter', function($rootScope, $scope, travelService, $filter) {

      $scope.visitedPlaces = [];
      $scope.travelSaved = false;
      $scope.index = 0;
      $scope.travels = [];

      $scope.loadTravels = function() {
        travelService.getUsersTravels().then(function(travels) {
          $scope.travels = travels;

          if (travels.length > 0) {
            $scope.noTravelAvaialble = false;
            $scope.travel = travels[0];
          }
          else {
            $scope.noTravelAvaialble = true;
          }

        });
      };

      $scope.remove = function(travelId) {
        travelService.remove(travelId).then(function(removedSuccessfully) {
          if (removedSuccessfully) {
            $scope.loadTravels();
          }
          else {
            console.log("Travel remove failed");
          }
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

        travelService.save(travel).then(function(travelSavedSuccessfully) {
          if (travelSavedSuccessfully) {
            $scope.travelSaved = true;

            resetTravelModel();

            $scope.submitted = false;
            $scope.newVisitedPlaceSubmitted = false;
          }
          else {
            console.log("Trip was not saaved");
          }
        });
      };

      $scope.swipeLeft = function() {
        if ($scope.index == 0) {
          $scope.index = $scope.travels.length - 1;
        }
        else {
          $scope.index--;
        }

        $scope.travel = $scope.travels[$scope.index];
      };

      $scope.swipeRight = function() {
        if ($scope.index == $scope.travels.length - 1) {
          $scope.index = 0;
        }
        else {
          $scope.index++;
        }

        $scope.travel = $scope.travels[$scope.index];
      };

      $scope.enableAddAtractionPopup = function() {
        $rootScope.isPopupEnabled = true;
      }

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

})();

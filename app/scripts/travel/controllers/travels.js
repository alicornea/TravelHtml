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

      $scope.attractions = [];
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

      $scope.addNewattraction = function(attraction) {
        if (attraction !== undefined) {
          attraction.date = new Date();
          pushAttraction(attraction);

          attraction.name = null;
          attraction.title = null;
          attraction.review = null;
          attraction.rating = null;
          $scope.newVisitedPlaceSubmitted = false;
        }
      };

      $scope.submit = function() {
        if ($scope.attraction !== undefined) {
          pushAttraction($scope.attraction);
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

      $scope.enableAddattractionPopup = function() {
        $rootScope.isPopupEnabled = true;
      }

      /* Private Methods */

      var pushAttraction = function(attraction) {
        $scope.attractions.push({
          name: attraction.name,
          title: attraction.title,
          review: attraction.review,
          rating: attraction.rating,
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
          rating: $scope.travel.rating,
          attractions: $scope.attractions
        };
      };

      var resetTravelModel = function() {
        $scope.leavingFrom = null;
        $scope.destination = null;
        $scope.startDate = null;
        $scope.endDate = null;
        $scope.flight = null;
        $scope.travelReview = null;
        $scope.travel.rating = null;
        if ($scope.attraction != null) {
          $scope.attraction.name = null;
          $scope.attraction.title = null;
          $scope.attraction.review = null;
          $scope.attraction.rating = null;
        }

        $scope.attractions = [];
      };
    }]);

})();

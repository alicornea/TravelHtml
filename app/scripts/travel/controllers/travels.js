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
    .controller('TravelsCtrl', ['$rootScope', '$scope', 'travelService', '$filter', '$timeout', '$window', function($rootScope, $scope, travelService, $filter, $timeout, $window) {

      $scope.attractions = [];
      $scope.travelSaved = false;
      $scope.currentPosition = 0;
      $scope.travels = [];

      $scope.initializeGoogleMapsApi = function() {
        travelService.initializeGoogleMapsApi();
      };

      $scope.loadTravels = function() {
        travelService.getUsersTravels().then(function(travels) {
          $scope.travels = travels;

          if (travels.length > 0) {
            $scope.noTravelAvaialble = false;
            initTravel(travels[0]);
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

      $scope.addNewAttraction = function(attraction) {
        if (attraction !== undefined) {
          $scope.attractions.push(createAttractionModel(attraction));

          attraction.name = null;
          attraction.title = null;
          attraction.rating = null;
          attraction.review = null;
          $scope.newAttractionAdded = false;
        }
      };

      $scope.submit = function() {
        if ($scope.attraction !== undefined) {
          $scope.attractions.push(createAttractionModel($scope.attraction));
        }

        var travel = createTravelModel();

        travelService.save(travel).then(function(travelSavedSuccessfully) {
          if (travelSavedSuccessfully) {
            $scope.travelSaved = true;

            resetTravelModel();

            $scope.submitted = false;
            $scope.newAttractionAdded = false;
          }
          else {
            console.log("Trip was not saaved");
          }
        });
      };

      $scope.submitNewAttraction = function(travel, attraction) {
        if (attraction === undefined || attraction.name === undefined || attraction.name === null)
          return;

        travel.attractions.push(createAttractionModel(attraction));

        travelService.update(travel).then(function(travelUpdatedSuccessfully) {
          if (travelUpdatedSuccessfully) {

            $rootScope.disableAddAttractionPopup();
            attraction.name = null;
            attraction.title = null;
            attraction.review = null;
            attraction.rating = null;
          }
          else {
            console.log("The attraction was not submitted due to an error");
          }
        });

        $scope.newAttractionSubmitted = false;
      };

      $scope.cancelNewAttraction = function(attraction) {
        $rootScope.disableAddAttractionPopup();

        $timeout(function() {
          $scope.newAttractionCanceled = false;
        });

      };

      $scope.editAttraction = function(travel, attraction) {

        var index = travel.attractions.indexOf(attraction);
        if (index > -1) {
          var edittedAttraction = createAttractionModel(attraction);
          travel.attractions[index] = edittedAttraction;

          travelService.update(travel).then(function(travelUpdatedSuccessfully) {
            if (!travelUpdatedSuccessfully) {
              console.log("Attraction editting failed");
            }
            $rootScope.disableEditAttractionPopup();
            $timeout(function() {
              attraction.isEditable = false;
            });
          });
        }
      };

      $scope.cancelEditAttraction = function(attraction) {
        $rootScope.disableEditAttractionPopup();
        $timeout(function() {
          attraction.isEditable = false;
        });
      };

      $scope.deleteAttraction = function(travel, attraction) {
        var index = travel.attractions.indexOf(attraction);
        if (index > -1) {
          travel.attractions.splice(index, 1);

          travelService.update(travel).then(function(travelUpdatedSuccessfully) {
            if (!travelUpdatedSuccessfully) {
              console.log("Attraction remove failed");
            }
          });
        }
      };

      $scope.swipeLeft = function() {
        if ($scope.currentPosition == 0) {
          $scope.currentPosition = $scope.travels.length - 1;
        }
        else {
          $scope.currentPosition--;
        }

        initTravel($scope.travels[$scope.currentPosition]);
      };

      $scope.swipeRight = function() {
        if ($scope.currentPosition == $scope.travels.length - 1) {
          $scope.currentPosition = 0;
        }
        else {
          $scope.currentPosition++;
        }

        initTravel($scope.travels[$scope.currentPosition]);
      };
      
      $timeout($scope.initializeGoogleMapsApi);

      /* Private Methods */

      var initTravel = function(travel) {
        $scope.travel = travel;
        $scope.originalAttractions = travel.attractions;
      };

      var createAttractionModel = function(attraction) {
        return {
          name: attraction.name,
          title: attraction.title,
          review: attraction.review,
          rating: attraction.rating,
          date: new Date(),
          isEditable: false,
        };
      };

      var createTravelModel = function() {
        return {
          profileId: $window.localStorage.profileId,
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
          resetAttraction($scope.attraction);
        }

        $scope.attractions = [];
      };

      var resetAttraction = function() {
        return {
          name: null,
          title: null,
          review: null,
          rating: null,
          date: new Date(),
          isEditable: false,
        };
      };
    }]);

})();

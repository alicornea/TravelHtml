(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name travelHtmlApp.controller:GalleryCtrl
   * @description
   * # GalleryCtrl
   * Controller of the travelHtmlApp
   */
  angular.module('travelHtmlApp')
    .controller('GalleryCtrl', ["$scope", "$timeout", function($scope, $timeout) {

      $scope.galleryImages = [];

      var galleryItem = {
        file: "http://travelhtml-alicornea.c9.io/images/map.jpg",
        description: "Map or something"
      }

      $scope.galleryImages.push(galleryItem)
      galleryItem = {
        file: "http://travelhtml-alicornea.c9.io/images/photos.png",
        description: "My photos"
      }

      $scope.galleryImages.push(galleryItem)



      $scope.direction = 'left';
      $scope.currentIndex = 0;


      //  var imageField = angular.element("#imageField");

      //angular.element('#imageField').addEventListener('change', handleImageSelect, false);
      angular.element('#imageField').on("change", handleImageSelect)

      function handleImageSelect() {
        var files = event.target.files;
        var f = files[0];
        var reader = new FileReader();

        reader.onload = (function(theFile) {
          return function(e) {
            document.getElementById('imageList').innerHTML += ['<img src="', e.target.result, '" title="', theFile.name, '" width="50" />'].join('');
          };
        })(f);

        reader.readAsDataURL(f);
      }


      $scope.addImage = function() {

        $timeout(function() {
          angular.element('#imageField').trigger('click');
        }, 100);
      }



      $scope.setCurrentSlideIndex = function(index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
      };

      $scope.isCurrentSlideIndex = function(index) {
        return $scope.currentIndex === index;
      };

      $scope.prevSlide = function() {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.galleryImages.length - 1) ? ++$scope.currentIndex : 0;
      };

      $scope.nextSlide = function() {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.galleryImages.length - 1;
      };


    }])


  .animation('.slide-animation', function() {
    return {
      addClass: function(element, className, done) {
        var scope = element.scope();

        if (className == 'ng-hide') {
          var finishPoint = element.parent().width();
          if (scope.direction !== 'right') {
            finishPoint = -finishPoint;
          }
          TweenMax.to(element, 0.5, {
            left: finishPoint,
            onComplete: done
          });
        }
        else {
          done();
        }
      },
      removeClass: function(element, className, done) {
        var scope = element.scope();

        if (className == 'ng-hide') {
          element.removeClass('ng-hide');

          var startPoint = element.parent().width();
          if (scope.direction === 'right') {
            startPoint = -startPoint;
          }

          TweenMax.set(element, {
            left: startPoint
          });
          TweenMax.to(element, 0.5, {
            left: 0,
            onComplete: done
          });
        }
        else {
          done();
        }
      }
    };
  });


})();
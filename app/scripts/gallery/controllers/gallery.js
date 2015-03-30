(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name travelHtmlApp.controller:GalleryCtrl
     * @description
     * # GalleryCtrl
     * Controller of the travelHtmlApp
     */
    angular.module('travelHtmlApp')
      .controller('GalleryCtrl', ["$scope", "$timeout", "galleryService", "ServiceApi", '$upload', function ($scope, $timeout, galleryService, ServiceApi, $upload) {


          var currentGuid = galleryService.getGuid();
          $scope.galleryImages = [];
          $scope.files = []
          $scope.serviceUrl = ServiceApi.url;
          var uploadedFiles = [];
          $scope.direction = 'left';
          $scope.currentIndex = 0;

          var galleryItem = {
              file: "http://dev.travelhtml.com:8080//images/map.jpg",
              description: "Map or something"
          }

          $scope.galleryImages.push(galleryItem)
          galleryItem = {
              file: "http://dev.travelhtml.com:8080//images/photos.png",
              description: "My photos"
          }

          $scope.galleryImages.push(galleryItem)

          $scope.SaveGallery = function () {
              var gallery = {
                  title: $scope.image.title,
                  description: $scope.image.description,
                  tags: $scope.image.tags
              }
              galleryService.saveImage(gallery, saveImages);
          }

          $scope.setFiles = function (element) {
              $scope.$apply(function (scope) {
                  console.log('files:', element.files);
                  // Turn the FileList object into an Array

                  for (var i = 0; i < element.files.length; i++) {
                      if (uploadedFiles.indexOf(element.files[i].name + "_" + element.files[i].size) === -1)
                          scope.files.push(element.files[i])
                      else
                          alert("The file " + element.files[i].name + " it's there already!")
                  }
                  scope.progressVisible = false
              });

              upload($scope.files);
          };


          initImages();

          function initImages() {
              var result = galleryService.getGuidImages(currentGuid).then(function (data) {
                  console.log(data);
                  var images = data;
                  for (var i = 0; i < images.length; i++) {
                      images[i].src = ServiceApi.url + "/" + images[i].src;
                      $scope.files.push(images[i])
                      uploadedFiles.push(images[i].name + "_" + images[i].size);
                    
                  }
              });
          }



      
          angular.element('#imageField').on("change", handleImageSelect)

          function handleImageSelect() {
              var files = event.target.files;
              for (var i = 0; i < files.length; i++) {
                  var f = files[i];
                  var reader = new FileReader();

                  reader.onload = (function (theFile) {
                      return function (e) {
                          if(uploadedFiles.indexOf( (theFile.name + "_" + theFile.size) ) == -1 )
                          {
                              var results = $.grep($scope.files, function (e) { return e.name == theFile.name && e.size == theFile.size; });
                              if (results && results.length > 0 && !results[0].src)
                                  results[0].src = e.target.result;
                          }
                      };
                  }
              )(f);

                  reader.readAsDataURL(f);
              }
          }

          $scope.addImage = function () {

              $timeout(function () {
                  angular.element('#imageField').trigger('click');
              }, 100);
          }



          $scope.setCurrentSlideIndex = function (index) {
              $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
              $scope.currentIndex = index;
          };

          $scope.isCurrentSlideIndex = function (index) {
              return $scope.currentIndex === index;
          };

          $scope.prevSlide = function () {
              $scope.direction = 'left';
              $scope.currentIndex = ($scope.currentIndex < $scope.galleryImages.length - 1) ? ++$scope.currentIndex : 0;
          };

          $scope.nextSlide = function () {
              $scope.direction = 'right';
              $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.galleryImages.length - 1;
          };

          $scope.removeImage = function(removeImage)
          {
              removeImage = removeImage.split('_');
              var item = $.grep($scope.files, function (e, i) { return e.name == removeImage[0] && e.size == removeImage[1]; });
              item = item[0];


              $scope.files = $.grep($scope.files, function (e, i) { return !(e.name == removeImage[0] && e.size == removeImage[1]); });

              galleryService.removeImageFromGuid(currentGuid, item.name);
              
          }


          function upload() {
              var files = $scope.files;
              if (files && files.length) {
                  for (var i = 0; i < files.length; i++) {
                      var file = files[i];
                      if (uploadedFiles.indexOf((file.name + "_" + file.size)) == -1) {
                          $scope.upload = {
                              now: 0
                          }
                          $upload.upload({
                              url: ServiceApi.url + "/galleryImage",
                              fields: { 'guid': currentGuid },
                              file: file
                          }).progress(function (evt) {
                              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                              console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                              $scope.upload = {
                                  now: progressPercentage
                              }
                          }).success(function (data, status, headers, config) {
                              console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                              uploadedFiles.push(config.file.name + "_" + config.file.size);
                              
                          });
                      }
                  }
              }
          };


          




      }])


    .animation('.slide-animation', function () {
        return {
            addClass: function (element, className, done) {
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
            removeClass: function (element, className, done) {
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
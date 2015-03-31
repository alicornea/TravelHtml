(function () {

    var app = angular.module('travelHtmlApp');

    app.service('galleryService', ['Restangular', '$window', function (Restangular, $window) {
        return {

            saveImage: function (gallery ) {
                var newGallery = Restangular.service('gallery')
                var userId = $window.localStorage.profileId;
                var response = newGallery.post({
                    userId: userId,
                    title: gallery.title,
                    description: gallery.description,
                    tags: gallery.tags,
                    images : gallery.images
                }).then(function (response) {
                    //callback(response.id);
                });
            },

            getGuidImages: function (guid) {
                return Restangular.all("galleryImage/guid/" + guid).getList();
            },

            setGuid: function () {
                $window.localStorage.galleryGuid = generateGuid();
            },
            getGuid: function () {
                if (!$window.localStorage.galleryGuid)
                    this.setGuid();
                return $window.localStorage.galleryGuid;
            },
            removeImageFromGuid: function (guid, name) {
                return Restangular.all("galleryImage/removeImageFromGuid/" + guid + "/" + name).getList();
                
            }

        }


        function generateGuid() {
            var result, i, j;
            result = '';
            for (j = 0; j < 32; j++) {
                if (j == 8 || j == 12 || j == 16 || j == 20)
                    result = result + '-';
                i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
                result = result + i;
            }
            return result;
        }

    }]);
})();
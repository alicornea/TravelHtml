(function () {
    'use strict';

    angular.module('travelHtmlApp')
        .service('buddiesService', ['Restangular', '$window', '$q', function (Restangular, $window, $q) {
            return {
                getBuddies: function () {
                    var deffered = $q.defer();
                    //var buddies = Restangular.all('api/buddies/' + $window.localStorage.profileId);
                    Restangular.all('api/buddies/getbuddies/' + $window.localStorage.profileId).getList().then(function (buddies) {
                        deffered.resolve(buddies);
                    });

                    return deffered.promise;
                },

                addBuddy: function (buddy) {
                    var deffered = $q.defer();
                    var service = Restangular.service('api/buddies');

                    service.post({
                        profileId: $window.localStorage.profileId,
                        buddy: {
                            profileId: buddy.profileId,
                            firstName: buddy.firstName,
                            lastName: buddy.lastName,
                            profileImg: "profile image to be added" //buddy.profileImg,
                        }
                    }).then(function () {
                        deffered.resolve({ buddyAdded: true });
                    }, function (err) {
                        deffered.resolve({ buddyAdded: false });
                    });

                    return deffered.promise;
                },

                removeBuddy: function (buddy) {
                    var deffered = $q.defer();
                        
                    Restangular.service('api/buddies/removeBuddy').post({
                        profileId: $window.localStorage.profileId,
                        buddy: {
                            profileId: buddy.profileId,
                            firstName: buddy.firstName,
                            lastName: buddy.lastName,
                            profileImg: buddy.profileImg
                        }
                    }).then(function () {
                        deffered.resolve({ buddyRemoved: true });
                    }, function (err) {
                        deffered.resolve({ buddyRemoved: false });
                    });

                    return deffered.promise;
                }
            }
        }]);
})();
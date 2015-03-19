(function () {
    'use strict';

    angular.module('travelHtmlApp')
        .factory('buddiesFactory', ['userService', 'buddiesService', 'Restangular', '$window', function (userService, buddiesService, Restangular, $window) {

            var getBuddiesSuggestions = function (searchKey) {
                var users = [];
                var buddies = [];
                var buddiesSuggestions = [];

                userService.getUsers().then(function (users) {
                    users = Restangular.stripRestangular(users);

                    buddiesService.getBuddies().then(function (buddies) {
                        buddies = Restangular.stripRestangular(buddies);

                        angular.forEach(users, function (user) {
                            var isBuddy = false;

                            angular.forEach(buddies, function (buddy) {
                                if (user._id === buddy.buddy.profileId) {
                                    isBuddy = true;
                                }
                            });

                            if (user._id !== $window.localStorage.profileId && (user.first_name.indexOf(searchKey) !== -1 || user.last_name.indexOf(searchKey) !== -1)) {
                                buddiesSuggestions.push({
                                    profileId: user._id,
                                    firstName: user.first_name,
                                    lastName: user.last_name,
                                    profileImg: 'profile image to be added', //user.profileImg,
                                    isBuddy: isBuddy,
                                })
                            }                            
                        });
                    });
                })         

                return buddiesSuggestions;
            }

            var addBuddy = function (buddy) {
                return buddiesService.addBuddy(buddy).then(function (isBuddyAdded) {
                    return isBuddyAdded;
                });
            }

            var removeBuddy = function (buddy) {
                return buddiesService.removeBuddy(buddy).then(function(isBuddyRemoved){
                    return isBuddyRemoved;
                });
            }

            return {
                getBuddiesSuggestions: getBuddiesSuggestions,
                addBuddy: addBuddy,
                removeBuddy: removeBuddy
            };
        }]);
})();
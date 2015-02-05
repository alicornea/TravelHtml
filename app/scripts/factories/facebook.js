angular.module('travelHtmlApp').factory('Facebook', ['$rootScope', function($rootScope) {

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
        if (response !== undefined) {
            console.log(response);
            // The response object is returned with a status field that lets the
            // app know the current login status of the person.
            // Full docs on the response object can be found in the documentation
            // for FB.getLoginStatus().
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                $rootScope.$broadcast('fb_connected', {
                    facebook_id: response.authResponse.userID
                });
            }
            else if (response.status === 'not_authorized') {
                // The person is logged into Facebook, but not your app.
                alert('Please log into this app.');
            }
            else {
                // The person is not logged into Facebook, so we're not sure if
                // they are logged into this app or not.
                alert('Please log into Facebook.');
            }
        }
    }

    return {
        statusChangeCallback: statusChangeCallback,
        getUserInfo: function getUserInfo(success) {
            FB.api('/me', function(response) {
                success(response);
            });
        },
        logout: function logout(logoutHandler) {
            FB.logout(function(response) {
                logoutHandler(response);
            });
        }
    }
}]);
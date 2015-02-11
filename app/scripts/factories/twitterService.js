angular.module('travelHtmlApp').factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('hTNoxdJ6fFyCpQ5dCVyyYG9QKDI', {
                cache: true
            });
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {
                cache: true
            }, function(error, result) { //cache means to execute the callback if the tokens are already present

                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                }
                else {
                    console.log(error);
                }
            });
            return deferred.promise;
        },
        getUserDetails: function() {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/account/verify_credentials.json').done(function(data) {
                //when the data is retrieved resolved the deferred object
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
    }
});
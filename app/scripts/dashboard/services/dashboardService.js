(function() {


  /**
   * @ngdoc service
   * @name travelHtmlApp.dashboard
   * @description
   * # dashboard
   * Service in the travelHtmlApp.
   */
  angular.module('travelHtmlApp')
    .service('dashboardService', ['Restangular', '$window', function(Restangular, $window) {
      return {

        getDashboard: function() {
          // AngularJS will instantiate a singleton by calling "new" on this function


          if ($window.localStorage.profileId)
            var userId = $window.localStorage.profileId;

          return Restangular.all("dashboard/" + userId);
        },

        saveDashboard: function(dashboard) {


          var newDashboard = Restangular.service('dashboard')
          var userId = $window.localStorage.profileId;
          newDashboard.post({
            userId: userId,
            dashboard_setup: dashboard
          });
        },

        updateDashboard: function(dashboard) {
         // var newDashboard = Restangular.service('dashboard/'+id)
         // var userId = $window.localStorage.profileId;
          dashboard.put();
        }
      }
    }]);
})();
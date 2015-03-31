(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name travelHtmlApp.controller: ChangePasswordCtrl
     * @description
     * # ChangePasswordCtrl
     * Change user password
     */
    angular.module('travelHtmlApp').controller('ChangePasswordCtrl', ['$scope', 'userService', '$window', 'SHA1', function ($scope, userService, $window, SHA1) {
        $scope.message = '';
        $scope.changePassword = function () {
            $scope.message = '';
            $scope.changePasswordForm.txtCurrentPassword.$setValidity('incorrectPassword', true);
            userService.changePassword($window.localStorage.profileId, SHA1.hash($scope.currentPassword), SHA1.hash($scope.newPassword)).then(function (data) {
                if (data.errorCode) {
                    if (data.errorCode == '1')
                        $scope.changePasswordForm.txtCurrentPassword.$setValidity('incorrectPassword', false);
                    else
                        $scope.message = "There was a technical error while updating your password. Please try again later!";
                }
                else {
                    $scope.message = 'Your password was updated successfully!';
                }
            });

            $scope.validateCurrentPassword = function () {
                $scope.changePasswordForm.txtCurrentPassword.$setValidity('incorrectPassword', true);
            }
        }
    }]);
})();
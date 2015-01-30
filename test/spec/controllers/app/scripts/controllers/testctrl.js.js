'use strict';

describe('Controller: AppScriptsControllersTestctrlJsCtrl', function () {

  // load the controller's module
  beforeEach(module('travelHtmlApp'));

  var AppScriptsControllersTestctrlJsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppScriptsControllersTestctrlJsCtrl = $controller('AppScriptsControllersTestctrlJsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

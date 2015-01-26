'use strict';

describe('Controller: AppJsCtrl', function () {

  // load the controller's module
  beforeEach(module('travelHtmlApp'));

  var AppJsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppJsCtrl = $controller('AppJsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

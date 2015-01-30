'use strict';

describe('Controller: JsControllerUserCtrl', function () {

  // load the controller's module
  beforeEach(module('travelHtmlApp'));

  var JsControllerUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JsControllerUserCtrl = $controller('JsControllerUserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

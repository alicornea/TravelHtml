'use strict';

describe('Controller: BlaCtrl', function () {

  // load the controller's module
  beforeEach(module('travelHtmlApp'));

  var BlaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlaCtrl = $controller('BlaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

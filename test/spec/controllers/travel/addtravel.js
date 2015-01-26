'use strict';

describe('Controller: TravelAddtravelctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('travelHtmlApp'));

  var TravelAddtravelctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TravelAddtravelctrlCtrl = $controller('TravelAddtravelctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: GalleryctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('travelHtmlApp'));

  var GalleryctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GalleryctrlCtrl = $controller('GalleryctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

(function() {
  'use strict';

  describe('Controller: TravelsCtrl', function() {

    // load the controller's module
    beforeEach(module('travelHtmlApp'));

    var Travels Ctrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new(); Travels Ctrl = $controller('TravelsCtrl', {
        $scope: scope
      });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
      expect(scope.awesomeThings.length).toBe(3);
    });
  });
})();

(function() {
  'use strict';

  describe('Service: GoogleMapsInitializer', function() {

    // load the service's module
    beforeEach(module('travelHtmlApp'));

    // instantiate service
    var GoogleMapsInitializer ;
    beforeEach(inject(function(_ GoogleMapsInitializer _) { GoogleMapsInitializer = _ GoogleMapsInitializer _;
    }));

    it('should do something', function() {
      expect(!! GoogleMapsInitializer ).toBe(true);
    });

  });
})();

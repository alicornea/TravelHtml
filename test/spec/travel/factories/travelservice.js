(function() {
  'use strict';

  describe('Service: travelService', function() {

    // load the service's module
    beforeEach(module('travelHtmlApp'));

    // instantiate service
    var travelService ;
    beforeEach(inject(function(_ travelService _) { travelService = _ travelService _;
    }));

    it('should do something', function() {
      expect(!! travelService ).toBe(true);
    });

  });
})();

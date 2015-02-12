'use strict';

describe('Service: travelService', function () {

  // load the service's module
  beforeEach(module('travelHtmlApp'));

  // instantiate service
  var travelService;
  beforeEach(inject(function (_travelService_) {
    travelService = _travelService_;
  }));

  it('should do something', function () {
    expect(!!travelService).toBe(true);
  });

});

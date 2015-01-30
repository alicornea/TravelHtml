'use strict';

describe('Directive: AddTravel', function () {

  // load the directive's module
  beforeEach(module('travelHtmlApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-add-travel></-add-travel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the AddTravel directive');
  }));
});

'use strict';

describe('Directive: brush', function () {

  // load the directive's module
  beforeEach(module('verpApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<brush></brush>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the brush directive');
  }));
});

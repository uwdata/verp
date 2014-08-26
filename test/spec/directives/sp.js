'use strict';

describe('Directive: sp', function () {

  // load the directive's module
  beforeEach(module('verpApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sp></sp>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sp directive');
  }));
});

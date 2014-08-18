'use strict';

describe('Controller: RecurrenceCtrl', function () {

  // load the controller's module
  beforeEach(module('verpApp'));

  var RecurrenceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecurrenceCtrl = $controller('RecurrenceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.data.length).toBe(3);
  });
});

'use strict';

describe('Controller: AlphaCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var AlphaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlphaCtrl = $controller('AlphaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

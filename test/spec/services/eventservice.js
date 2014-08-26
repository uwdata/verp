'use strict';

describe('Service: EventService', function () {

  // load the service's module
  beforeEach(module('verpApp'));

  // instantiate service
  var EventService;
  beforeEach(inject(function (_EventService_) {
    EventService = _EventService_;
  }));

  it('should do something', function () {
    expect(!!EventService).toBe(true);
  });

});

'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:textlabel
 * @description
 * # textlabel
 */
angular.module('verpApp')
  .directive('textlabel', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });

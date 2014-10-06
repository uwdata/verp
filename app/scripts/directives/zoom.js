'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:zoom
 * @description
 * # zoom
 */
angular.module('verpApp')
  .directive('zoom', function () {
        var postLink = function (scope, element, attrs) {

//           console.log('creating zoom behavior...');

         var w = parseInt(attrs.width),
             h = parseInt(attrs.height);

          var x = d3.scale.linear()
              .domain([0, w])
              .range([0, w]);

          var y = d3.scale.linear()
              .domain([0, h])
              .range([0, h]);

          var zoomer = d3.behavior.zoom()
              .x(x)
              .y(y)
              .scaleExtent([1, 10])
              .on("zoom", zoom);

          var svg = d3.select(element[0]).append("svg")
              .attr("width", w)
              .attr("height", h)
              .call(zoomer);

            function zoom(){
                console.log('zooming...');
            }

      };
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      link: postLink
    };

  });

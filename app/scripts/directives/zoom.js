'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:zoom
 * @description
 * # zoom
 */
angular.module('verpApp')
  .directive('zoom', function (EventService) {
        var postLink = function (scope, element, attrs) {

         var w = parseInt(attrs.width),
             h = parseInt(attrs.height);

          var x = d3.scale.linear()
              .domain([0, 300])
              .range([0, w]);

          var y = d3.scale.linear()
              .domain([0, 300])
              .range([0, h]);

          var zoomer = d3.behavior.zoom()
              .x(x)
              .y(y)
              .scaleExtent([1,8])
              .on("zoom", zoom);

          var svg = d3.select(element[0]).append("svg")
              .attr("width", w)
              .attr("height", h)
              .call(zoomer);

            function zoom(){

                EventService.broadcastSceneZoom({
                  xs:zoomer.x,
                  ys:zoomer.y});

            }

      };
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      link: postLink
    };

  });

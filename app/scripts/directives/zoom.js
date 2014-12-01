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

         var w = +attrs.width,
             h = +attrs.height,
             view = attrs.id;


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


            function zoomReset(){
                zoomer.x(x.domain([0,300])).y(y.domain([0,300]));
                zoom();
            }


            function zoom(){

                if(view === 'scene-zoom') {
                    EventService.broadcastSceneZoom({
                        xs: zoomer.x,
                        ys: zoomer.y
                    });
                }else if(view === 'rp-zoom') {
                    //EventService.broadcastRPZoom({
                    // xs: zoomer.x,
                    // ys: zoomer.y
                    //});
                }
            }

            scope.$on('scene.reset', zoomReset);

      };

    return {
        template: '<div></div>',
        restrict: 'E',
        replace: true,
        link: postLink
    };

  });

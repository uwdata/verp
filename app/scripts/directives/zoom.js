'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:zoom
 * @description
 * # zoom
 */

angular.module('verpApp')
  .directive('zoom', function (){

        var postLink = function (scope, element, attrs) {

         var w = +attrs.width,
             h = +attrs.height,
             f = attrs.flipy,
             x = d3.scale.linear().range([0, w]),
             y = d3.scale.linear().range([0, h]);

            if (f === 'true') y.range([h,0]);

           //console.log(y.range());


          var zoomer = d3.behavior.zoom()
              .x(x)
              .y(y)
              .scaleExtent([1,8]);

          var svg = d3.select(element[0]).append("svg")
              .attr("width", w)
              .attr("height", h)
              .call(zoomer);


            function reset(){
                init();
                zoom();
            }

            function init(){
                var dom = scope.domain();
                zoomer.x(x.domain(dom.dx))
                      .y(y.domain(dom.dy))
                    .on('zoom', zoom);
            }


            function zoom(){
                scope.broadcastEvent('view.zoom', {
                        xs: zoomer.x,
                        ys: zoomer.y
                    });
            }

            scope.$on('domain.ready', init);
            scope.$on('view.reset', reset);

      };

    return {
        template: '<div></div>',
        restrict: 'E',
        replace: true,
        link: postLink
    };


  });

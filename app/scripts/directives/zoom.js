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
             x = d3.scale.linear(),//.domain ([0,w]).range([0,w]),
             y = d3.scale.linear();//.domain ([0,h]).range([0,h]);


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
                zoomer.x(x.domain(dom.dx).range([0,w]))
                      .y(y.domain(dom.dy).range([0,h]))
                    .on('zoom', zoom);
            }

            function zoom(){
                scope.eventBroadcast('view.zoom', {
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

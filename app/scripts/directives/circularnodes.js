'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:CircularNodes
 * @description
 * # CircularNodes
 */
angular.module('verpApp')
  .directive('circularnodes', function () {

        var postLink = function (scope, element, attrs) {

            //console.log('compiled');

            var w = +attrs.width,
                h = +attrs.height,
                x = d3.scale.linear(),
                y = d3.scale.linear(),
                nodes;


            function init(){

                if(!scope.data) return;


                var dom = scope.domain();

                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                nodes = circle()
                    .width(w)
                    .height(h)
                    .xScale(x)
                    .yScale(y);

                d3.select(element[0])
                    .call(nodes, scope.data);

            }

            function update(){

                if(!scope.data) return;


                var dom = scope.domain();

                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                nodes.xScale(x).yScale(y).update(scope.data);

            }



            function updateScale(e, d){

                x.domain(d.xs().domain()).range(d.xs().range());
                y.domain(d.ys().domain()).range(d.ys().range());

                nodes.xScale(x)
                    .yScale(y)
                    .update();

            }


            scope.$watch('data', function(){

                if(!nodes) init(); else update();

            });

            scope.$on('domain.ready', init);
            scope.$on('view.zoom', updateScale);


        };



        return {
            template: '<div></div>',
            scope: {
                data: '=data',
                domain:'&domain'
            },
            restrict: 'E',
            replace:true,
            link:postLink

        };

  });

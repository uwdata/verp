'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:textlabel
 * @description
 * # textlabel
 */
angular.module('verpApp')
    .directive('textlabel', function () {

        var postLink = function (scope, element, attrs) {

            var w = +attrs.width,
                h = +attrs.height,
                x = d3.scale.linear(),
                y = d3.scale.linear(),
                labels;


            function init(){

                if(!scope.labels) return;

                var dom = scope.domain();

                //console.log(n);
                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                labels = text()
                    .width(w)
                    .height(h)
                    .xScale(x)
                    .yScale(y);

                d3.select(element[0])
                    .datum(data)
                    .call(labels)

            }




            function updateScale(e, d){

                x.domain(d.xs().domain()).range(d.xs().range());
                y.domain(d.ys().domain()).range(d.ys().range());

                labels.xScale(x)
                    .yScale(y)
                    .update();

            }


            //scope.$watch('points', function(points){
            //});

            scope.$on('domain.ready', init);
            scope.$on('view.zoom', updateScale);

        };
        return {
                template: '<div></div>',
                scope: {
                    //points: '=points',
                    //domain:'&domain'
                },
                restrict: 'E',
                replace:true,
                link:postLink

        };

    });

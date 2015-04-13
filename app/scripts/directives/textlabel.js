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
                x = d3.scale.linear().range([0, w]),
                y = d3.scale.linear().range([0, h]),
                labels;

            function init() {

                var dom = scope.domain();

                if(! (scope.data && dom) ) return;

                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                labels = text()
                    .width(w)
                    .height(h)
                    .xScale(x)
                    .yScale(y);

                d3.select(element[0])
                    .call(labels, scope.data);

            }

            function update(){

                if(!scope.data) return;


                var dom = scope.domain();

                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                labels.xScale(x).yScale(y).update(scope.data);

            }


            function updateScale(e, d){

                x.domain(d.xs().domain()).range(d.xs().range());
                y.domain(d.ys().domain()).range(d.ys().range());

                labels.xScale(x)
                    .yScale(y)
                    .update();

            }


            scope.$watch('data', function(){

                if(!labels) init(); else update();

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

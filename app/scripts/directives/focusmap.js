'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:focusmap
 * @description
 * # focusmap
 */
angular.module('verpApp')
    .directive('focusmap', function () {

        var postLink = function (scope, element, attrs) {

            var w = +attrs.width,
                h = +attrs.height,
                x = d3.scale.linear().domain([0,w]).range([0,w]),
                y = d3.scale.linear().domain([0,h]).range([0,h]),
                focusmap;



            function init(d){

                if(!d) return;

                focusmap = mask()
                    .width(w)
                    .height(h)
                    .xScale(x)
                    .yScale(y);

                d3.select(element[0])
                    .call(focusmap, d);

            }

            function updateScale(e, d) {

                if(!focusmap) return;

                var k = d.zoomer.scale(),
                    t = d.zoomer.translate(),
                    dx = [0,w].map(function(x) { return (x - t[0]) / k; }),
                    dy = [0,h].map(function(x) { return (x - t[1]) / k; });

                x.domain(dx);
                y.domain(dy);

                focusmap.xScale(x)
                    .yScale(y)
                    .update();

            }

            function update(e, d) {

                if(!d) return;
                else if(!focusmap) init(d);

                focusmap.update(d);

            }

            scope.$on('heatmap.update',update);
            scope.$on('view.zoom', updateScale);
        };



        return {
            template: '<div></div>',
            scope: {
                //data: '=data',
                domain:'&domain',
                click:'&click'
            },
            restrict: 'E',
            replace:true,
            link:postLink
        };
    });

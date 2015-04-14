'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:alphapart
 * @description
 * # alpha
 */
angular.module('verpApp')
    .directive('alphapart', function () {

        var postLink = function(scope, element, attrs) {

            var w = +attrs.width,
                h = +attrs.height,
                x = d3.scale.linear().range([0, w]),
                y = d3.scale.linear().range([0, h]),
                c = d3.scale.linear()
                    .range([
                        '#a50026',
                        '#d73027',
                        '#f46d43',
                        '#fdae61',
                        '#fee090',
                        '#ffffbf',
                        '#e0f3f8',
                        '#abd9e9',
                        '#74add1',
                        '#4575b4',
                        '#313695'].reverse())
                    .clamp(true),
                svg, ac;


            function init(){

                if(! scope.data) return;

                var  d = scope.data,
                     n = d.length,
                     m = n - 1,
                     z = c.range().length - 1,
                     dom = scope.domain(),
                     i;

                c.domain(d3.range(0, m + m/z, m/z));

                if(!svg) {
                    svg = d3.select(element[0]).append('svg')
                        .attr('width', w)
                        .attr('height', h);
                }

                 ac = [];

                d3.selectAll('.alphashape').remove();

                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                for (i = 0; i < n; i++) {
                    ac[i] = alpha(d[i]).xScale(x).yScale(y).color(c(i));
                    ac[i](svg).update(scope.alpha);
                }

            }

            //then extracts alpha complexes as needed
            function alphaUpdate(e, d){
                if(ac) for (var i = 0; i < ac.length; i++ ) ac[i].update(+d);

            }



            function updateScale(e, d){

                x.domain(d.xs().domain()).range(d.xs().range());
                y.domain(d.ys().domain()).range(d.ys().range());

                if(ac) for (var i = 0; i < ac.length; i++ ) ac[i].update();
            }


            scope.$watch('data', init);
            scope.$on('domain.ready', init);
            scope.$on('view.zoom', updateScale);
            scope.$on('alpha.update', alphaUpdate);


        };


        return{
            template: '<div></div>',
            restrict: 'E',
            scope: {
                data: '=data',
                domain:'&domain',
                alpha: '=alpha'
            },
            replace: true,
            link: postLink
        };


    });

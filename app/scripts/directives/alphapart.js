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
                c = d3.scale.category10(),
                svg, ac;


            //creates the maximal complex once
            function init(){

                if(! scope.data) return;

                var  d = scope.data,
                     n = d.length,
                     dom = scope.domain(),
                     i;

                //console.log(n);

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


            scope.$watch('data', function(){ init(); });
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

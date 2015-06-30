'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:axis
 * @description
 * # axis
 */
angular.module('verpApp')
    .directive('axis', function () {

        var postLink = function (scope, element, attrs) {
            var w = +attrs.width,
                h = +attrs.height,
                f = (attrs.flipy === 'true'),
                t = attrs.type,
                margin= {
                    left:+(attrs.marginleft),
                    right:+(attrs.marginright),
                    top:+(attrs.margintop),
                    bottom:+(attrs.marginbottom)},
                svg, orient, axis, axisScale;


            function init() {

                var dom = scope.domain();

                if(! dom ) return;

                if(t === 'x') {

                    axisScale = d3.scale.linear().domain(dom.dx).range([0, w]);
                    orient = 'bottom';

                }else if(t === 'y'){

                    axisScale = d3.scale.linear().domain(dom.dy).range([0, h]);
                    if (f)  axisScale.range([h,0]);
                    orient = 'left';

                }else{

                    console.warn('Unknown axis type: ' + t);
                    return;

                }

                axis = d3.svg.axis()
                    .scale(axisScale)
                    .orient(orient)
                    .outerTickSize(6)
                    .innerTickSize(3);


                svg = d3.select(element[0]).append("svg")
                    .attr("width", w + margin.left + margin.right)
                    .attr("height",h + margin.top + margin.bottom)
                    .append("g")
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                    .attr('class', t + ' axis');

                svg.call(axis);

            }


            function updateScale(e, d){

                var x = d.xs(), y = d.ys();

                if( t === 'x')
                    axisScale.domain(x.domain()).range(x.range());
                else if(t === 'y')
                    axisScale.domain(y.domain()).range(y.range());

                svg.call(axis);

            }

            scope.$on('domain.ready', init);
            scope.$on('view.zoom', updateScale);

        };

        return {
            template: '<div></div>',
            scope: {
                domain:'&domain'
            },
            restrict: 'E',
            replace:true,
            link:postLink

        };
    });

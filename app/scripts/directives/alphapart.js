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
                x = d3.scale.linear(),
                y = d3.scale.linear(),
                ac;

            //creates the maximal complex once
            function init(e, d){

                var v = d.data.pos,
                    dom = scope.domain();

                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                ac = alpha(v).xScale(x).yScale(y);
                ac(element[0]);
            }


            //then extracts alpha complexes as needed
            function alphaUpdate(e,d){
                if(ac && d.partition) {
                    ac.update(d.eps);
                    scope.partition = true;
                }else{
                    scope.partition = false;
                }

            }

            function updateScale(e, d){
                x.domain(d.xs().domain()).range(d.xs().range());
                y.domain(d.ys().domain()).range(d.ys().range());
                ac.update();
            }


            scope.$on('domain.ready', init);
            scope.$on('view.zoom', updateScale);
            scope.$on('rp.epsFilter.update', alphaUpdate);

        };

        return{
            template: '<div></div>',
            restrict: 'E',
            replace: true,
            link: postLink
        };

    });

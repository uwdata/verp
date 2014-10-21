'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:brush
 * @description
 * # brush
 */
angular.module('verpApp')
    .directive('brush', function (EventService) {

        var postLink = function postLink(scope, element, attrs) {

            var w = attrs.width,
                h = attrs.height,
                sx = d3.scale.ordinal().range([0, w]),
                sy = d3.scale.ordinal().range([0, h]),
                brush = d3.svg.brush()
                    .x(sx)
                    .y(sy)
                    .on('brush', brushed),
                brushsvg = d3.select(element[0])
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h)
                    .append('g')
                    .attr("class", "rectbrush")
                    .call(brush);

            d3.select(element[0])
                .on('mouseover', function(){d3.select(this).node().focus();})
                .on('keydown', handleKeydown);

            function brushed(){
                EventService['broadcast'+(attrs.id.toUpperCase())+'Brush'](brush.extent());
            }

            function left(e,step){
                e[0][0] -= step;
                e[1][0] -= step;
            }


            function right(e,step){
                e[0][0] += step;
                e[1][0] += step;
            }


            //in screen coords of y
            function up(e,step){
                e[0][1] -= step;
                e[1][1] -= step;
            }


            function down(e,step){
                e[0][1] += step;
                e[1][1] += step;
            }


            function handleKeydown(){
                var key = d3.event.keyCode, meta = d3.event.metaKey, step = 2;

                if(key >= 37 && key <= 40) { //up and down arrow
                    if(brush.empty()) return;

                    d3.event.preventDefault();


                    var e = brush.extent();

                    if(meta) {//diagonal moves
                        if (key === 37) {
                            left(e,step);
                            down(e,step);
                        } else if (key === 39) {
                            right(e,step);
                            up(e,step);
                        } else if (key === 38) {
                            up(e,step);
                            left(e,step);
                        } else {
                            down(e,step);
                            right(e,step);
                        }
                    }else{
                        if (key === 37) { //left
                            left(e,step);
                        } else if (key === 39) { //right
                            right(e,step);
                        } else if (key === 38) { //down
                            up(e,step);
                        } else {
                            down(e,step);
                        }
                    }

                    brushsvg.call(brush.extent(e)).call(brush.event);
                }

            }



        };

        return {
            template: '<div tabindex="0"></div>',
            restrict: 'E',
            replace:true,
            link: postLink
        };

    });

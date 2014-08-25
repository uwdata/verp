'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:RecurrenceCtrl
 * @description
 * # RecurrenceCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('RecurrenceCtrl', function ($scope, DataService) {
        $scope.rpPanelSize = [200, 300];
        $scope.eps = 50;
        $scope.distfn = 'l2';
        $scope.brush = {};
        $scope.brush.lock = true;


    }).directive('xbrush', function($rootScope){

        return{
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function (scope, element, attrs) {

                var w = scope.rpPanelSize[0],
                    h = scope.rpPanelSize[1],
                    axis = attrs.axis,
                    brushScaleX = d3.scale.linear().range([0, w]),
                    brush = d3.svg.brush()
                        .x(brushScaleX)
                        .extent([0,1])
                        .on('brush', brushed);

                scope.brush[axis] = brush;

                var brushsvg = d3.select(element[0])
                    .append('svg')
                    .attr('width',w+10)
                    .attr('height', 10);

                    brushsvg.append("g")
                        .attr('transform', 'translate(10,0)')
                    .attr('width', w)
                    .attr('height',10)
                        .attr('id', attrs.axis+'brush')
                    .attr("class", "x brush")
                    .call(brush)
                    .selectAll("rect")
                    .attr('height',10);

                var xx= d3.scale.identity()
                    .domain([0, w]),
                axisfn = d3.svg.axis()
                    .scale(xx)
                    .outerTickSize(0)
                    .ticks(0),
                brushaxis = brushsvg.append("g")
                    .attr("class", "x axis")
                    .attr('transform', 'translate(10,'+5+')')
                    .call(axisfn)
                    .append('text')
                    .attr('class', 'x label')
                    .attr('dx','-0.75em')
                    .attr('dy','0.25em')
                    .text(axis);


                function brushed() {
                    var e = brush.extent(),
                    //TODO: remove the constants
                    start = e[0],
                    end = e[1];
                    $rootScope.$broadcast('range.update',{xs:start, xe:end, ys:start, ye:end});
                    if(axis === 'x' && scope.brush.lock === true) {
                        scope.brush.y.extent([e[0], e[1]]);
                        d3.select('#ybrush').call(scope.brush.y);
                    }
                }
            }
        };
    });


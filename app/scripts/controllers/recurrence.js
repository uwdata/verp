'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:RecurrenceCtrl
 * @description
 * # RecurrenceCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('RecurrenceCtrl', function ($scope) {
        $scope.canvasSize= [300,300];
        $scope.rp = null;
        $scope.eps = 50;
        $scope.distfn = 'l2';

        $scope.update =  function(){
            console.log($scope.distfn);
            console.log('updating rec plot'+$scope.eps);
            $scope.rp
                .eps($scope.eps/100)
                .distfn($scope.distfn)
                .update();
        }

    })
    .directive('rp', function(){

        function  nrnd() {
            var  x1, x2, w, y1, y2, w;

            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w) ) / w);
            y1 = x1 * w;
            return y1;
        }

        function dist(a,b){

            return Math.abs(a-b) < 0.1 ? 255:0;

        }

        function myrpimage(rp, a){
            var n = a.length, r = n * 4, d, i, j, k;
            for(i = 0; i < n; i++) {
                for (j = 0; j < n; j++) {
                    k = i * r + 4 * j;
                    d = dist(a[i], a[j]);
                    rp[k + 0] = d;
                    rp[k + 1] = d;
                    rp[k + 2] = d;
                    rp[k + 3] = 255;
                }
            }
        }

        function addNoise(imgdata){

            var n = imgdata.length, i, j;

            for (i = 0; i < n; i += 4)
                for(j = 0; j < 4; imgdata[i+j]=~~(nrnd()*127)+128, j++) ;

        }

        return{
            restrict:'E',
            replace:true,
            template:'<div></div>',
            link:function(scope, element, attrs){

                var w = scope.canvasSize[0],
                    h = scope.canvasSize[1],
                    a = Array.apply(null, new Array(w)).map(function(d,i){return Math.cos(i);}),
                    b = a.slice().map(function(d,i){return Math.cos(i+25);});

                  scope.rp = rep.crp()
                      .width(w)
                      .height(h)
                      .eps(scope.eps/100);
                 scope.rp({x:a, y:a}, element[0]);
            }
        };

    }).directive('xbrush', function(){

        return{
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function (scope, element, attrs) {

                console.log('xbrush is called!');

                var w = scope.canvasSize[0],
                    h = scope.canvasSize[1],
                    xs = d3.scale.linear().range([0, 300]),
                    brush = d3.svg.brush()
                        .x(xs)
                        .on('brush', brushed);

                d3.select(element[0]).append('svg')
                    .attr('width',w)
                    .attr('height', 10)
                    .append("g")
                    .attr('background-color','red')
                    .attr('width', w)
                    .attr('height',10)
                    .attr("class", "x brush")
                    .call(brush)
                    .selectAll("rect")
                    .attr('height',10);
//                    .attr('y', -12);
//                    .attr("height", 20);
                function brushed() {
                //xs.domain(brush.empty() ? xs.domain() : brush.extent());
                    var e = brush.extent();
                    scope.rp.range({s:~~xs(e[0]), e:~~xs(e[1])});
                }

            }
        };
    }).directive('ybrush', function(){

        return{
            restrict: 'E',
            replace: true,
            template: '<div></div>',
            link: function (scope, element, attrs) {

                var w = scope.canvasSize[0],
                    h = scope.canvasSize[1],
                    xs = d3.scale.linear().range([0, w]),
                    brush = d3.svg.brush()
                        .x(xs)
                        .extent([40, 60]);

                d3.select(element[0]).append('svg')
                    .attr('width',10)
                    .attr('height', h)
                    .style('margin-left',20)
                    .append("rect")
                    .attr('width', 10)
                    .attr('height',h)
                    .attr("class", "y brush")
                    .call(brush)
                    .selectAll("rect")
                    .attr('y', -12);

                function brushed(){
                    xs.domain(brush.empty() ? xs.domain() : brush.extent());
                }

            }
        };
    });


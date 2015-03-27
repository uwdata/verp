'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:directedpath
 * @description
 * # directedpath
 */
angular.module('verpApp')
  .directive('directedpath', function () {
        var postLink = function (scope, element, attrs) {

            var w = +attrs.width,
                h = +attrs.height,
                x = d3.scale.linear(),
                y = d3.scale.linear(),
                dpath;


            function init(){

                if(!scope.data) return;

                var dom = scope.domain();

                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                dpath = arrow()
                    .width(w)
                    .height(h)
                    .xScale(x)
                    .yScale(y);

                d3.select(element[0])
                    .call(dpath, toarrow(scope.data));
            }


            function update(){

                if(!scope.data) return;

                dpath.update(toarrow(scope.data));

            }


            var toarrow = function(data){

                var n = data.length,
                    d = [],
                    i = 0;

                for( ; i < n-1; i++)
                    d.push({
                       src: data[i].pos,
                        target: data[i+1].pos
                    })

                return d;

            };



            function updateScale(e, d){

                x.domain(d.xs().domain()).range(d.xs().range());
                y.domain(d.ys().domain()).range(d.ys().range());

                dpath.xScale(x)
                    .yScale(y)
                    .update();

            }



            scope.$watch('data', function(){

                if(!dpath) init(); else update();

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

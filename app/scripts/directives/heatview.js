'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:heatview
 * @description
 * # heatview
 */
angular.module('verpApp')
    .directive('heatview', ['DataService', function (DataService) {

        var postLink = function (scope, element, attrs) {

            var w = +attrs.width,
                h = +attrs.height,
                name=attrs.id,
                colormapid = +attrs.colormap,
                x = d3.scale.linear(),
                y = d3.scale.linear(),
                grads = [
                    {
                        '0.1':'#f7fbff',
                        '0.2 ':'#deebf7',
                        '0.3 ':'#c6dbef',
                        '0.4 ':'#9ecae1',
                        '0.5 ':'#6baed6',
                        '0.6 ':'#4292c6',
                        '0.7':'#2171b5',
                        '0.8 ':'#08519c',
                        '0.9 ':'#08306b'},
                    {
                        '0.9':'#a50026',
                        '0.85':'#d73027',
                        '0.8':'#f46d43',
                        '0.7':'#fdae61',
                        '0.6':'#fee090',
                        '0.5':'#ffffbf',
                        '0.4':'#e0f3f8',
                        '0.3':'#abd9e9',
                        '0.2':'#74add1',
                        '0.15':'#4575b4',
                        '0.1':'#313695'},
                    {
                        '0.1':'#fee6ce',
                        '0.3':'#fdd0a2',
                        '0.4':'#fdae6b',
                        '0.5':'#fd8d3c',
                        '0.6':'#f16913',
                        '0.7':'#d94801',
                        '0.8':'#a63603',
                        '0.9':'#7f2704'}
                ],
                heatmap = h337.create({
                    gradient:grads[colormapid],
                    container: element[0]
                }),
                data,  pos, n;

            DataService.heatmap(name, heatmap);

            function init(){

                if(!scope.points) return;

                data = [];
                pos = scope.points;
                n = pos.length;

                var dom = scope.domain(),
                    i = 0;
                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                for(; i < n; i++)
                    data.push({x: x(pos[i][0]), y: y(pos[i][1]), value: 1});

                heatmap.setData({
                    max: 64,
                    data:data});

                scope.dataurl({imgdata:heatmap.getDataURL()});

            }

            function updateScale(e, d){

                x.domain(d.xs().domain()).range(d.xs().range());
                y.domain(d.ys().domain()).range(d.ys().range());

                for(var i = 0; i < n; i++)
                    data[i]={x:x(pos[i][0]), y:y(pos[i][1]), value:1};

                heatmap.setData({
                    max: 64,
                    data:data});

                 //scope.dataurl({imgdata:heatmap.getDataURL()});

            }


            scope.$watch('points', function(points){
                if(points) init();
            });

            scope.$on('domain.ready', init);
            scope.$on('view.zoom', updateScale);


        };

        return {
            template: '<div></div>',
            scope: {
                points:'=points',
                domain:'&domain',
                dataurl:'&dataurl'
            },
            restrict: 'E',
            replace:true,
            link:postLink
        };

    }]);

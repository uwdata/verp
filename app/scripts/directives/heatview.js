'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:heatview
 * @description
 * # heatview
 */
angular.module('verpApp')
    .directive('heatview', function () {

        var postLink = function (scope, element, attrs) {

            var w = +attrs.width,
                h = +attrs.height,
                colormapid = +attrs.colormap,
                x = d3.scale.linear(),
                y = d3.scale.linear(),
                grads = [
                    {
                        '0':'#d73027',
                        '0.2': '#f46d43',
                        '0.3':'#fdae61',
                        '0.4': '#fee08b',
                        '0.5': '#ffffbf',
                        '0.6': '#d9ef8b',
                        '0.7': '#a6d96a',
                        '0.8': '#66bd63',
                        '1': '#1a9850'},
                    {
                        '0.9':'#d73027',
                        '0.8': '#f46d43',
                        '0.7':'#fdae61',
                        '0.6': '#fee08b',
                        '0.5': '#ffffbf',
                        '0.4': '#d9ef8b',
                        '0.35': '#a6d96a',
                        '0.3': '#66bd63',
                        '0.2': '#1a9850'},
                    {
                        '0.9':'#d73027',
                        '0.8':'#f46d43',
                        '0.7':'#fdae61',
                        '0.6':'#fee090',
                        '0.5':'#ffffbf',
                        '0.4':'#e0f3f8',
                        '0.3':'#abd9e9',
                        '0.2':'#74add1',
                        '0.1':'#4575b4' }
                ],
                heatmap = h337.create({
                    gradient:grads[colormapid],
                    container: element[0]
                }),
                data,  pos, n;

            function init(){


                if(!scope.points) return;

                data = [];
                pos = scope.points;
                n = pos.length;

                var dom = scope.domain(),
                    i = 0;

                //console.log(n);
                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                for(; i < n; i++)
                    data.push({x: x(pos[i][0]), y: y(pos[i][1]), value: 1});


                heatmap.setData({
                    max: 10,
                    data:data});

            }

            function updateScale(e, d){

                x.domain(d.xs().domain()).range(d.xs().range());
                y.domain(d.ys().domain()).range(d.ys().range());

                for(var i = 0; i < n; i++)
                    data[i]={x:x(pos[i][0]), y:y(pos[i][1]), value:1};

                heatmap.setData({
                    max: 10,
                    data:data});
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
                points: '=points',
                domain:'&domain'
            },
            restrict: 'E',
            replace:true,
            link:postLink
        };

    });

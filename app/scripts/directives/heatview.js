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
                x = d3.scale.linear(),
                y = d3.scale.linear(),
                pos, n;

            var  heatmap = h337.create({
                //gradient:{
                //     '0':'#d73027',
                //    '0.2': '#f46d43',
                //    '0.3':'#fdae61',
                //    '0.4': '#fee08b',
                //    '0.5': '#ffffbf',
                //    '0.6': '#d9ef8b',
                //    '0.7': '#a6d96a',
                //    '0.8': '#66bd63',
                //    '1': '#1a9850'},
                gradient:{
                    '0.9':'#d73027',
                    '0.8': '#f46d43',
                    '0.7':'#fdae61',
                    '0.6': '#fee08b',
                    '0.5': '#ffffbf',
                    '0.4': '#d9ef8b',
                    '0.35': '#a6d96a',
                    '0.3': '#66bd63',
                    '0.2': '#1a9850'},
                //gradient: {
                //    '0.9':'#d73027',
                //    '0.8':'#f46d43',
                //    '0.7':'#fdae61',
                //    '0.6':'#fee090',
                //    '0.5':'#ffffbf',
                //    '0.4':'#e0f3f8',
                //    '0.3':'#abd9e9',
                //    '0.2':'#74add1',
                //    '0.1':'#4575b4' },
                container: element[0]
            }), data = [];

            // for(var i=0; i< 100; i++)
            // data.push({x:~~(100*Math.random()), y:~~(100*Math.random()), value:1});
            // console.log('create the heatmap');

            function init(e, d){

                //console.log('initializing the heatmap ...');

                pos = d.data.pos;
                n = pos.length;

                var dom = scope.domain(),
                    i = 0;

                //console.log(n);
                x.domain(dom.dx).range([0, w]);
                y.domain(dom.dy).range([0, h]);

                console.log(n);

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


            scope.$on('domain.ready', init);
            scope.$on('view.zoom', updateScale);

        };

        return {
            template: '<div></div>',
            restrict: 'E',
            replace:true,
            link:postLink
        };


    });

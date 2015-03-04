'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:sceneFrame
 * @description
 * # sceneFrame
 */
angular.module('verpApp')
    .directive('sceneFrame', function (EventService) {

        var sceneFrameLink = function(scope, element, attrs){

            var s = scope,
                frm = s.frm;
                frm.xScale = d3.scale.linear().range([0, +attrs.width]);
                frm.yScale = d3.scale.linear().range([0, +attrs.height]);

            s.canvas = document.createElement('canvas');
            s.canvas.width = +attrs.width;
            s.canvas.height = +attrs.height;
            s.ctx = s.canvas.getContext('2d');
            s.ctx.imageSmoothingEnabled = false;
            frm.img = new Image();

            element[0].appendChild(s.canvas);

            function updateImg(e, d){

                frm.img.onload = function(){

                    frm.name = 'Scene';
                    frm.xScale.domain([0,frm.img.naturalWidth]);
                    frm.yScale.domain([0,frm.img.naturalHeight]);

                    drawSceneImg();

                    if(s.tracking){

                        s.tracking.pos.domainWidth = frm.img.naturalWidth;
                        s.tracking.pos.domainHeight = frm.img.naturalHeight;
                        EventService.broadcastSceneReady({data: s.tracking, src:frm.img.src});

                    }


                };

                frm.img.src = d;

            }


            function drawSceneImg(){

                var dx = frm.xScale.domain(),
                    rx = frm.xScale.range(),
                    dy = frm.yScale.domain(),
                    ry = frm.yScale.range();

                s.ctx.clearRect(0, 0, s.canvas.width, s.canvas.height);
                s.ctx.drawImage(frm.img,
                    (dx[0]),
                    (dy[0]),
                    (dx[1] - dx[0]),
                    (dy[1] - dy[0]),
                    (rx[0]),
                    (ry[0]),
                    (rx[1] - rx[0]),
                    (ry[1] - ry[0]));

            }


            function updateScale(e, d){

                frm.xScale = d.xs();
                frm.yScale = d.ys();

                drawSceneImg();
            }


            function updateTracking(e, d){

                s.tracking = d;
                var p = d.pos;

                if(frm.img.src) {
                    p.domainWidth = frm.img.naturalWidth;
                    p.domainHeight = frm.img.naturalHeight;
                    if(d.coordXform)  d.coordXform(p);
                    EventService.broadcastSceneReady({data: s.tracking, src: frm.img.src});

                }

            }

            scope.$on('view.zoom', updateScale);
            scope.$on('scene.img.update', updateImg);
            scope.$on('scene.tracking.update', updateTracking);

        };

        return {
            template:'<div></div>',
            restrict:'E',
            replace:true,
            link:sceneFrameLink
        }


    });

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

            var s = scope;

            s.frm = new Image();
            s.frmScaleX = 1;
            s.frmScaleY = 1;
            element[0].appendChild(s.frm);


            function sceneImgUpdate(e,d){

                s.frm.onload = function(){

                    s.imgWidth = s.frm.naturalWidth;
                    s.imgHeight = s.frm.naturalHeight;
                    s.frm.height = attrs.height;
                    s.frm.width = attrs.width;

                    s.frm.srcName = 'Scene';

                    if(s.tracking){

                        s.tracking.pos.domainWidth = s.imgWidth;
                        s.tracking.pos.domainHeight = s.imgHeight;

                        EventService.broadcastSceneReady({data: s.tracking, src: s.frm.src});

                    }
                };

                s.frm.src = d;
            }



            function sceneTrackingUpdate(e,d){

                s.tracking = d;

                if(s.frm.src) {

                    s.tracking.pos.domainWidth = s.imgWidth;
                    s.tracking.pos.domainHeight = s.imgHeight;
                    EventService.broadcastSceneReady({data: s.tracking, src: s.frm.src});

                }

            }

            scope.$on('scene.img.update', sceneImgUpdate);
            scope.$on('scene.tracking.update', sceneTrackingUpdate);


        };

        return {
            template:'<div></div>',
            restrict:'E',
            replace:true,
            link:sceneFrameLink
        }


    });

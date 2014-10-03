'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:sceneFrame
 * @description
 * # sceneFrame
 */
angular.module('verpApp')
    .directive('sceneFrame', function (EventService) {

        var sceneFrameLink= function(scope, element, attrs){

            var s = scope;
            s.frm = new Image();
            s.frmScaleX = 1;
            s.frmScaleY = 1;

            element[0].appendChild(scope.frm);

            function sceneImgUpdate(e,d){
              s.frm.onload = function(){
                                s.imgWidth = s.frm.width;
                s.imgHeight = s.frm.height;
                s.frm.height = attrs.height;
                s.frm.width =  attrs.width;

                if(typeof(s.tracking) !== 'undefined' &&
                   s.tracking !== null){
                    console.log(s.tracking);
                  s.tracking.pos.domainWidth = s.frm.width;
                  s.tracking.pos.domainHeight = s.frm.height;
                  console.log('scene is ready'); 
	 	                 //EventService.broadcastSceneReady(d);
                }
              };
              s.frm.src = d;
            }
            function sceneTrackingUpdate(e,d){
               s.tracking = d; 
               if(s.frm.src !== '') 
                 s.tracking.pos.domainWidth = s.frm.width;
                 s.tracking.pos.domainHeight = s.frm.height;
                 console.log('scene is ready'); 
            //     EventService.broadcastSceneReady(d);
            }

            scope.$on('scene.img.update', sceneImgUpdate);
            scope.$on('scene.tracking.update', sceneTrackingUpdate);



        };

        return {
            template: '<div></div>',
            restrict: 'E',
            replace:true,
            link:sceneFrameLink
        }

    });

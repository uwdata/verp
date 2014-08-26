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

             function sceneUpdate(e,d){
                s.frm.onload  = function() {
                    d.data.pos.domainWidth =  s.frm.width;
                    d.data.pos.domainHeight = s.frm.height;
//                    console.log(d.data.pos.domainWidth, d.data.pos.domainHeight);
//                    s.imgWidth = s.frm.width;
//                    s.imgHeight = s.frm.height;
//                s.frmScaleX =  attrs.width / s.imgWidth;
//                s.frmScaleY =  attrs.height / s.imgHeight;
                s.frm.height = 300;
                s.frm.width =  300;
               EventService.broadcastSceneReady(d);
            };

                 s.frm.src = d.src + '/frm-0.png';
             }
            scope.$on('scene.update', sceneUpdate);

        };

    return {
      template: '<div></div>',
      restrict: 'E',
      replace:true,
      link:sceneFrameLink
      }

    });

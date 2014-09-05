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

                    d.data.pos.domainWidth = s.frm.width;
                    d.data.pos.domainHeight = s.frm.height;
                    s.imgWidth = s.frm.width;
                    s.imgHeight = s.frm.height;
                    s.frm.height = attrs.height;
                    s.frm.width =  attrs.width;

                    EventService.broadcastSceneReady(d);

                };

                s.frm.src = '/data/'+d.src;
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

'use strict';

/**
 * @ngdoc service
 * @name verpApp.EventService
 * @description
 * # EventService
 * Factory in the verpApp.
 */
angular.module('verpApp')
    .factory('EventService', function ($rootScope, DataService) {

        var rp = {},
            rpBrush = {},
            sceneBrush= {},
            rpSelection  = {},
            sceneSelection = {},
            tracking = {},
            sceneScale = null,
            rpScale = null,
            scene  = null,
            player = null;


        var broadcastPlayerTimeChange = function broadcastPlayerTimeChange(d){
            player = d;
            $rootScope.$broadcast('player.time', player);
        };

        var broadcastSceneReady = function broadcastSceneReady(d){
            scene = d;
            $rootScope.$broadcast('scene.ready', scene)
        };

        var broadcastSceneZoom = function broadcastSceneZoom(d){
            sceneScale = d;
            $rootScope.$broadcast('scene.zoom', sceneScale)
        };

        var broadcastRPZoom = function broadcastSceneZoom(d){
            rpScale = d;
            $rootScope.$broadcast('rp.zoom', rpScale)
        };

        var broadcastSceneReset= function broadcastSceneReset(){
            $rootScope.$broadcast('scene.reset',null)
        };



        var broadcastEpsUpdate= function broadcastEpsUpdate(d) {
            rp.eps = d.eps;
            rp.epsFiltering = d.epsFiltering;
            rp.partition = d.partition;
            if(rp.epsFiltering === true)
                rp.epsNet = DataService.service('rpEpsNet');

            $rootScope.$broadcast('rp.eps.update', rp);

        };

        var broadcastSaccadeUpdate= function broadcastSaccadeUpdate(d) {

            if(!d.epsTimeFiltering) return;

            tracking.epsTime = d.epsTime;
            tracking.epsTimeFiltering = d.epsTimeFiltering;

            var deltaTime = DataService.tracking().deltaTime,
                distMatrix = DataService.service('rpDistanceMatrix')();


            tracking.indx = deltaTime.map(function(t,i){

               if(i === deltaTime.length)
                   return 1;
               else
                   return  ((t < d.epsTime  &&  distMatrix[i,i+1] < d.eps) ? 1 : 0); });

            $rootScope.$broadcast('saccade.update', tracking);

        };


        var broadcastEpsFilteringChange = function broadcastEpsFilteringChange(d) {

            var func;
            rp.eps = d.eps;
            rp.epsFiltering = d.epsFiltering;

            if(rp.epsFiltering === true) {
                func = DataService.service('rpEpsNet');
                rp.epsNet = func();
            }

            $rootScope.$broadcast('rp.epsfilter', rp);
        };


        var broadcastRPBrush = function broadcastRPBrush(d){
            rpBrush.data = d;
            var func = DataService.service('rpSelection');
            broadcastRPSelection( func(rpBrush.data) );
        };

        var broadcastRPSelection = function broadcastRPSelection(d){
            rpSelection.data = d;
            $rootScope.$broadcast('rp.selection', rpSelection.data);
        };

        var broadcastSPBrush = function braodcastSPBrush(d){
            sceneBrush.data = d;

            console.log('-->');
            console.log('x0:'+d[0][0]+',x1:'+d[1][0]);
            console.log('y0:'+d[0][1]+',y1:'+d[1][1]);
            console.log('<--');

            var func = DataService.service('spSelection');
            broadcastSPSelection( func(sceneBrush.data) )
        };

        var broadcastSPSelection = function braodcastSPSelection(d){
            sceneSelection.data = d;
            $rootScope.$broadcast('sp.selection', sceneSelection.data);
        };

        //Public API here
        return {
            broadcastRPBrush:broadcastRPBrush,
            broadcastSPBrush: broadcastSPBrush,
            broadcastSceneReady:broadcastSceneReady,
            broadcastSceneZoom:broadcastSceneZoom,
            broadcastRPZoom:broadcastRPZoom,
            broadcastSceneReset:broadcastSceneReset,
            broadcastPlayerTimeChange:broadcastPlayerTimeChange,
            broadcastEpsUpdate:broadcastEpsUpdate,
            broadcastSaccadeUpdate:broadcastSaccadeUpdate
        };

    });

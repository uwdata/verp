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
            rpSelection = {},
            spSelection = {},
            tracking = {},
            sceneScale = null,
            rpScale = null,
            scene = null,
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


        var broadcastRPReset= function broadcastRPReset(){
            $rootScope.$broadcast('rp.reset',null)
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

        var broadcastRPSelection = function broadcastRPSelection(d){
            rpSelection.data = d;
            $rootScope.$broadcast('rp.selection', rpSelection.data);
        };

        var broadcastSPSelection = function braodcastSPSelection(d){
            spSelection.data = d;
            $rootScope.$broadcast('sp.selection', spSelection.data);
        };


        //Public API here
        return {
            broadcastRPSelection: broadcastRPSelection,
            broadcastSPSelection: broadcastSPSelection,
            broadcastSceneReady: broadcastSceneReady,
            broadcastSceneZoom: broadcastSceneZoom,
            broadcastRPZoom: broadcastRPZoom,
            broadcastSceneReset: broadcastSceneReset,
            broadcastRPReset: broadcastRPReset,
            broadcastPlayerTimeChange: broadcastPlayerTimeChange,
            broadcastEpsUpdate: broadcastEpsUpdate,
            broadcastSaccadeUpdate: broadcastSaccadeUpdate
        };

    });

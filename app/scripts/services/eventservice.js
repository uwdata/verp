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
            scene   = null,
            player = null;


        var broadcastPlayerTimeChange = function broadcastPlayerTimeChange(d){
            player = d;
            $rootScope.$broadcast('player.time', player);
        };

        var broadcastSceneReady = function broadcastSceneReady(d){
            scene = d;
            $rootScope.$broadcast('scene.ready', scene)
        };

        var broadcastEpsUpdate= function broadcastEpsUpdate(d) {

            rp.eps = d.eps;
            rp.epsFiltering = d.epsFiltering;
            rp.partition = d.partition;
            if(rp.epsFiltering === true)
                rp.epsNet = DataService.service('rpEpsNet');

            $rootScope.$broadcast('rp.eps.update', rp);

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


        var broadcastRPBrush  = function broadcastRPBrush(d){
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
            broadcastPlayerTimeChange:broadcastPlayerTimeChange,
            broadcastEpsUpdate:broadcastEpsUpdate
//            broadcastEpsFilteringChange: broadcastEpsFilteringChange
        };


    });

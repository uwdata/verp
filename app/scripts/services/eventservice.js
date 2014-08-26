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

        var rpBrush = {},
            sceneBrush= {},
            rpSelection  = {},
            sceneSelection = {},
            scene   = null;


        var broadcastSceneReady = function broadcastSceneReady(d){
            scene = d;
            $rootScope.$broadcast('scene.ready', scene)
        };


        var broadcastRPBrush  = function broadcastRPBrush(d){
            rpBrush.data = d;
            var f = DataService.service('rpSelection');
            broadcastRPSelection( f(rpBrush.data) );
        };

        var broadcastRPSelection = function broadcastRPSelection(d){
            rpSelection.data = d;
            $rootScope.$broadcast('rp.selection', rpSelection.data);
        };

        var broadcastSPBrush = function braodcastSPBrush(d){
            sceneBrush.data = d;
            var f = DataService.service('spSelection');
            broadcastSPSelection( f(sceneBrush.data) )
        };

        var broadcastSPSelection = function braodcastSPSelection(d){
            sceneSelection.data = d;
            $rootScope.$broadcast('sp.selection', sceneSelection.data);
        };

        //Public API here
        return {
            broadcastRPBrush:broadcastRPBrush,
            broadcastSPBrush: broadcastSPBrush,
            broadcastSceneReady:broadcastSceneReady
        };


    });

'use strict';

/**
 * @ngdoc service
 * @name verpApp.DataService
 * @description
 * # DataService
 * Factory in the verpApp.
 */

angular.module('verpApp')
    .factory('DataService', ['$rootScope', function ($rootScope) {

        var scene   = {},
            heatmaps = {},
            services = {};
            //
        ////var alphaUpdate = function(v){
        //    if(!arguments.length) return alpha.value;
        //    alpha.value = v;
        //};

        //var alphaPartition  = function(v){
        //    if(!arguments.length) return alpha.partition;
        //    alpha.partition = v;
        //};



        var tracking = function(_){

            if(!arguments.length) return  scene.tracking;

            if(scene.tracking !== _){
                scene.tracking = _;
                $rootScope.$broadcast('scene.tracking.update', scene.tracking);
            }

        };


        var heatmap = function(name,heatmap){

            if(arguments.length === 1)
                return  heatmaps[name];
            else if(arguments.length ===2){
                heatmaps[name] = heatmap;
            }

        };


        var img = function(_){

            if(!arguments.length) return scene.img;

            if(scene.img !== _){
                scene.img = _;
                $rootScope.$broadcast('scene.img.update', scene.img);
            }

        };

        var service = function(name, fn){
            if(arguments.length === 1)  return services[name];
            services[name] = fn;
        };

        // Public API here
        return {
            tracking:tracking,
            img:img,
            heatmap:heatmap,
            service:service
        };

    }]);

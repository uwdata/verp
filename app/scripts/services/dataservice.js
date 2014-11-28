'use strict';

/**
 * @ngdoc service
 * @name verpApp.DataService
 * @description
 * # DataService
 * Factory in the verpApp.
 */
angular.module('verpApp')
    .factory('DataService', function ($rootScope) {

        var scene   = {},
            services = {};

        var tracking = function(_){

            if(!arguments.length) return  scene.tracking;

            if(scene.tracking !== _){
                scene.tracking = _;
                $rootScope.$broadcast('scene.tracking.update', scene.tracking);
            }

        };


        var img = function(_){

            if(!arguments.length) return  scene.img;


            if(scene.img !== _){
                scene.img = _;
                console.log(_); 
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
            service:service
        };

    });

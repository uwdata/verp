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

        var loadedScene  = {},
            services = {};

        var scene  = function(_){

            if(!arguments.length) return loadedScene;

            if(loadedScene !== _){

                loadedScene  = _;

                $rootScope.$broadcast('scene.update', loadedScene);
            }

        };



        var service = function(name, fn){
            if(arguments.length === 1)  return services[name];
            console.log('adding new service:'+name);
            services[name] = fn;
        };

        // Public API here
        return {
            scene:scene,
            service:service
        };

    });

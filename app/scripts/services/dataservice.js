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
            services = {},
            params =  {},
            opts =  {noise:{filter:'none', window:10},
                ivt:{velocity:'point', window:20},
                idt:{duration: 80 },
                post:{
                    merge:true,
                    mergeBtwAngle: 0.5,
                    mergeBtwTime: 75,
                    discard:true,
                    discardDuration:60 }
            };


        var timeToSamples = function ( t, s ){

            if(! params.sampleRate) {

                console.warn('params.sampleRate is undefined!...using the default value 120Hz ')
                params.sampleRate = 120;

            }

           return Math.ceil( params.sampleRate *  t * s );

        };

        var options  = function (_){

            if (! arguments.length ) return opts;

            opts  = _;

        };

        //
        ////var alphaUpdate = function(v){
        //    if(!arguments.length) return alpha.value;
        //    alpha.value = v;
        //};

        //var alphaPartition  = function(v){
        //    if(!arguments.length) return alpha.partition;
        //    alpha.partition = v;
        //};


        var parameters = function(_) {

            if ( ! arguments.length ) return params;

            params = _;

        };

        var tracking = function(_){

            if(!arguments.length) return  scene.tracking;

            if(scene.tracking !== _){

                scene.tracking = _;

                params.calibArea = _.calibArea;
                params.stimSize =  _.stimSize;
                params.headDistance = _.headDistance;
                params.sampleRate = _.sampleRate;
                params.pixelSize = _.pixelSize;
                params.scaleToSec = 1e-6;

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
            parameters: parameters,
            options: options,
            timeToSamples:timeToSamples,
            service:service
        };

    }]);

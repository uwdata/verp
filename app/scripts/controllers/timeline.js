'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:TimelineCtrl
 * @description
 * # TimelineCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('TimelineCtrl', ['$scope', '$timeout', 'EventService', function ($scope, $timeout, EventService) {

        $scope.player = {
            currentTime:0,
            sceneReady:false,
            playing: false,
            min:0,
            step:1,
            max:100,
            speed:256,
            speed2X:128
        };


        $scope.$on('scene.ready', function(e,d){
            var p = $scope.player;
            p.sceneReady = true;
            p.max = d.data.pos.length-1;

        });

        $scope.player.stepTime = function(step){
            var p = $scope.player;
            p.currentTime = parseInt(p.currentTime) + step;

            EventService.broadcastPlayerTimeChange(p);
        };

        $scope.player.playPause = function(){

            var p = $scope.player;

            if(p.playing)
                p.pause();
            else
                p.play(p.speed, p.step);

        };

        $scope.player.reset = function() {
            $scope.player.currentTime = 0;
            $scope.player.playing = false;

        };


        $scope.player.play = function(speed, step){


            var p = $scope.player;


            p.playing = true;

            var progressTime = function(){

                if( (p.currentTime  >= p.max && step > 0) ||
                    (p.currentTime <= p.min  && step < 0)) {
                    p.reset();
                    return;
                } else if(p.playing === false){ return; }

                p.stepTime(step);

                $timeout(progressTime, speed);

            };

            $timeout(progressTime, speed);

        };

        $scope.player.pause = function(){

            var p = $scope.player;
            p.playing = false;

        };


        $scope.player.manual = function(){

            //console.log('manual');

            var p = $scope.player;

            if(p.playing === true) p.playing = false;

            EventService.broadcastPlayerTimeChange(p);
        };



        $scope.player.stop = function(){


        };



        $scope.player.forward = function(){

            var p = $scope.player;

            if (p.currentTime === 1.0) return;

            if(p.playing === false) p.playing = true;

            p.play(p.speed2X, p.step);

        };


        $scope.player.backward = function(){


            var p = $scope.player;

            if (p.currentTime === 0.0) return;

            if(p.playing === false) p.playing = true;

            p.play(p.speed2X, -p.step);

        };


    }]);

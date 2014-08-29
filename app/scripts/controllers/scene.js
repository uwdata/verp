'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:SceneCtrl
 * @description
 * # SceneCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('SceneCtrl', function ($scope, $timeout) {

        $scope.showTracking=false;
        $scope.frmScaleX = 1;
        $scope.frmScaleY = 1;
        $scope.frm  = {};
        $scope.player = {
            currentTime:0,
            playing: false,
            step:0.05,
            speed:256,
            speed2X:128,
            playPromise:undefined
        };

        $scope.player.playPause = function(){

            var p = $scope.player;

            if(p.playing)
                p.pause();
            else
                p.play(p.speed, p.step);

        };


        $scope.player.reset = function() {
            console.log('resetting');
            $scope.player.currentTime = 0;
            $scope.player.playing = false;

        };


        $scope.player.play = function(speed, step){


            var p = $scope.player;


            p.playing = true;

            var progressTime = function(){

                if( (p.currentTime  >= 1.0 && step > 0) ||
                    (p.currentTime <= 0.0 && step < 0)) {
                    console.log('calling reset');
                    p.reset();
                    return;
                } else if(p.playing === false){
                    console.log('paused');
                    return;
                }

                p.currentTime = parseFloat(p.currentTime) + step;

                console.log('playing', speed, step, p.currentTime);

                $timeout(progressTime, speed);
            };

            $timeout(progressTime, speed);

        };

        $scope.player.pause = function(){

            var p = $scope.player;
            p.playing = false;

        };


        $scope.player.manual = function(){

            var p = $scope.player;

            if(p.playing === true) p.playing = false;

            console.log('manual');
            console.log(p.currentTime);

        };

        $scope.player.stop = function(){
            console.log('stop');
        };


        $scope.player.forward = function(){
            console.log('fast-forwarding');
            var p = $scope.player;

            if (p.currentTime === 1.0) return;

            if(p.playing === false) p.playing = true;
            p.play(p.speed2X, p.step);

        };


        $scope.player.backward = function(){
            console.log('fast-backwarding');

            var p = $scope.player;

             if (p.currentTime === 0.0) return;

            if(p.playing === false) p.playing = true;

            p.play(p.speed2X, -p.step);
        }

    });

'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:SceneCtrl
 * @description
 * # SceneCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('SceneCtrl', function ($scope, DataService) {

        $scope.showTracking = false;
        $scope.src = "";

        function sceneUpdate(e,d){
           $scope.src = d.src + '/frm-0.png';
        }

        $scope.$on('scene.update', sceneUpdate);

    });

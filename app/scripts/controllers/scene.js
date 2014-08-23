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


//          var img = document.getElementById('current-frame');


            $scope.src = d.src + '/frm-0.png';

        }
//        console.log($scope);
        $scope.$on('scene.update', sceneUpdate);

    });

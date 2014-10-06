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
        $scope.sp = {};
        $scope.mode = 'selection';
        $scope.setMode= function(m){
            $scope.mode = m;
            console.log('setting interaction mode to '+ $scope.mode);
        };
    });

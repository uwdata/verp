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
        $scope.frmScaleX = 1;
        $scope.frmScaleY = 1;

    });

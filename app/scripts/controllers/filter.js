'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('FilterCtrl', ['$scope', 'GazeFilter', function ($scope, GazeFilter) {

        $scope.opts = GazeFilter.options();

        //{ noise:{filter:'none', window:40},
        //    ivt:{velocity:'point', window:20},
        //    idt:{duration:80},
        //    post:{
        //        merge:true,
        //        mergeAngle:0.5,
        //        mergeBtwTime:75,
        //        discard:true,
        //        duration:60 }
        //};
        //
        //$scope.update = function(){
        //
        //    GazeFilter.opts( opts );
        //
        //}


    }]);

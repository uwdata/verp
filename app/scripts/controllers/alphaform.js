'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:AlphaformCtrl
 * @description
 * # AlphaformCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('AlphaformCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.alpha = { min:0, max:100, step:1, value:50, partition:false};


        $scope.alphaUpdate = function(v) {

            $rootScope.$broadcast('alpha.update', v);

        };

        $scope.alphaPartition = function(){

            $rootScope.$broadcast('alpha.partition', !$scope.alpha.partition);

        }

    }]);

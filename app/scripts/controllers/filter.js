'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:FilterCtrl
 * @description
 * # FilterCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('FilterCtrl', ['$scope', 'DataService', function ($scope, DataService) {

        $scope.opts = DataService.options();


    }]);

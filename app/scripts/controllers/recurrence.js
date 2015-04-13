'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:RecurrenceCtrl
 * @description
 * # RecurrenceCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('RecurrenceCtrl', ['$scope', 'EventService', function ($scope,  EventService){


        $scope.eps = {value:50, min:0, max:100, step:1, distfn:'l2', filtering:false};
        $scope.rqa = {};//rr:0, det:0, entropy:0, l:0, tt:0, lam:0, lmax:0, vmax:0};

        $scope.showRQA = true;

        $scope.data = {eps:$scope.eps};

        $scope.brush = {};

        $scope.partition = false;
        $scope.interaction = {mode:'selection'};


        $scope.updateRQA = function(e, d){
                    $scope.rqa = d;
        };

        $scope.setMode = function(m){
            $scope.interaction.mode = m;
        };


        $scope.broadcastEvent = function(msg,data){

            $scope.$broadcast(msg, data);

        };


        $scope.resetView = function(){

            EventService.broadcastRPReset();
            $scope.$broadcast('view.reset');

        };



        $scope.domain = function(){

            if($scope.xDomain && $scope.yDomain) return {dx: $scope.xDomain, dy: $scope.yDomain};

        };


        $scope.updateDistfn = function(){

            $scope.$broadcast('distfn.update', $scope.eps.distfn);

        };


        $scope.epsFilteringUpdate = function (){


            var e = $scope.eps,
                d ={eps:+e.value,
                    filtering:e.filtering,
                    partition:$scope.partition};

            $scope.$broadcast('eps.update',d);

            //EventService.broadcastEpsUpdate(d);

        };


        $scope.updateEps = function (){

            var e = $scope.eps,
                d ={eps:+e.value,
                    filtering:e.filtering,
                    partition:$scope.partition};

            $scope.$broadcast('eps.update',d);

            //EventService.broadcastEpsUpdate(d);

        };


        function updateScale(e, d){

            $scope.xScale.domain(d.xs().domain()).range(d.xs().range());
            $scope.yScale.domain(d.ys().domain()).range(d.ys().range());

        }


        function init(e, d){

            var n = d.data.value.length,
                dx = [0, n],
                dy = [0, n];

            $scope.xScale = d3.scale.linear().domain(dx);
            $scope.yScale = d3.scale.linear().domain(dy);

            $scope.data.x = d.data.value;
            $scope.data.y = d.data.value;

            // default data scale
            $scope.xDomain = dx;
            $scope.yDomain = dy;

            $scope.sceneReady=true;

            $scope.$broadcast('domain.ready', d);

        }

        $scope.$on('scene.ready', init);
        $scope.$on('view.zoom', updateScale);
        $scope.$on('rqa.update', $scope.updateRQA);

    }]);


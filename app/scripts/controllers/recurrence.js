'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:RecurrenceCtrl
 * @description
 * # RecurrenceCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('RecurrenceCtrl', function ($scope,  EventService) {
        $scope.rpPanelSize = [200, 300];

        $scope.eps = 50;
        $scope.epsmin = 0;
        $scope.epsmax = 100;
        $scope.epsstep= 1;
        $scope.epsTime = 50;
        $scope.epsTimeMin = 0;
        $scope.epsTimeMax= 100;
        $scope.epsTimeStep = 1;

        $scope.name = 'RecurrenceCtrl';
        $scope.distfn = 'l2';
        $scope.brush = {};
        $scope.brush.lock = true;
        $scope.epsFiltering = false;
        $scope.epsTimeFiltering = false;

        $scope.partition = false;
        $scope.interaction = {mode:'selection'};


        $scope.setMode= function(m){
            $scope.interaction.mode = m;
        };



        $scope.broadcastEvent = function(msg,data){

            $scope.$broadcast(msg,data);

        };


        $scope.resetView = function(){
            EventService.broadcastRPReset();
            $scope.$broadcast('view.reset');
        };



        $scope.domain = function(){

            if($scope.xDomain && $scope.yDomain)

            return {dx: $scope.xDomain,
                    dy: $scope.yDomain};
        };


        $scope.epsFilteringUpdate= function (){

            EventService.broadcastEpsUpdate({eps:parseInt($scope.eps, 10),
                epsFiltering:$scope.epsFiltering,
                partition: $scope.partition
            });

        };

        $scope.epsUpdate= function (){
            EventService.broadcastEpsUpdate({eps:parseInt($scope.eps, 10),
                                             epsFiltering:$scope.epsFiltering,
                                             partition: $scope.partition
            });
        };

        $scope.epsTimeUpdate = function (){
            EventService.broadcastSaccadeUpdate({epsTime:parseInt($scope.epsTime, 10),
                epsTimeFiltering:$scope.epsTimeFiltering,
                eps:$scope.eps
            });
        };

         function updateScale(e,d){

            $scope.xScale.domain(d.xs().domain()).range(d.xs().range());
            $scope.yScale.domain(d.ys().domain()).range(d.ys().range());
        }


        function init(e,d){

                var n = d.data.value.length,
                    dx = [0, n],
                    dy = [0, n];

                $scope.xScale = d3.scale.linear().domain(dx);
                $scope.yScale = d3.scale.linear().domain(dy);

                // default data scale
                $scope.xDomain = dx;
                $scope.yDomain = dy;

             $scope.$broadcast('domain.ready');

        }

        $scope.$on('scene.ready', init);
        $scope.$on('view.zoom', updateScale);

    });


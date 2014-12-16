'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:SceneCtrl
 * @description
 * # SceneCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('SceneCtrl', function ($scope, EventService) {

        $scope.name = 'SceneCtrl';
        $scope.showTracking = true;
        $scope.frm  = {};
        $scope.sp = {};
        $scope.partition = false;
        $scope.mode = 'selection';
        $scope.setMode = function(m){
            $scope.mode = m;
        };


        $scope.resetView = function(){
            EventService.broadcastSceneReset();
            $scope.$broadcast('view.reset');

        };

        $scope.eventBroadcast = function(msg,data){

            $scope.$broadcast(msg,data);

        };

        $scope.domain =  function(){

            if($scope.xDomain && $scope.yDomain)
            return {dx: $scope.xDomain,
                    dy: $scope.yDomain};

        };



       function updateScale(e,d){

           console.log('catching view.zoom...');

            $scope.xScale.domain(d.xs().domain()).range(d.xs().range());
            $scope.yScale.domain(d.ys().domain()).range(d.ys().range());

        }


        function init(e,d){

                var dx = [0, +$scope.frm.img.naturalWidth],
                    dy = [0, +$scope.frm.img.naturalHeight];

                $scope.xScale = d3.scale.linear().domain(dx);
                $scope.yScale = d3.scale.linear().domain(dy);

                // default data scale
                $scope.xDomain = dx;
                $scope.yDomain = dy;

             $scope.$broadcast('domain.ready', d);

        }

        $scope.$on('view.zoom' , updateScale);
        $scope.$on('scene.ready', init);

    });

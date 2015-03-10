'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:SceneCtrl
 * @description
 * # SceneCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('SceneCtrl', function ($scope, GazeAnalytics) {

        $scope.name = 'SceneCtrl';

        $scope.showTracking = true;
        $scope.showHeatmap = false;
        $scope.showFixations = false;
        $scope.showSaccades = false;

        $scope.frm = {};
        $scope.sp = {};
        $scope.partition = false;

        $scope.visibilityChanged = false;

        $scope.visibility = undefined;

        $scope.points = undefined;
        $scope.fixations = undefined;
        $scope.saccades = undefined;

        $scope.velocity = { min:0, step:1, max:10, threshold:5 };

        $scope.mode = 'selection';


        $scope.saccadeVisibility = function(){

            var n = $scope.event.length,
                i = 0;

            if($scope.showSaccades){

                for(; i < n; i++)
                    $scope.visibility[i] = ($scope.event[i] === 1) ? 1 :
                        ($scope.showFixations) ? 1 : 0;

            } else {

                 for(; i < n; i++)
                     $scope.visibility[i] = ($scope.event[i] === 1) ? 0 :
                         ($scope.showFixations) ? 1 : 0;


            }

            $scope.visibilityChanged =  !$scope.visibilityChanged;

        };

        $scope.fixationVisibility = function(){

            // console.log($scope.showSaccades);
            var n = $scope.event.length,
                i = 0;

            if($scope.showFixations){
                for(; i < n; i++)
                $scope.visibility[i] = ($scope.event[i] === 0) ? 1 : ($scope.showSaccades) ? 1 : 0;

            }else{
                 for(; i < n; i++)
                 $scope.visibility[i] = ($scope.event[i] === 0) ? 0 : ($scope.showSaccades) ? 1 : 0;
            }

            $scope.visibilityChanged =  !$scope.visibilityChanged;

        };


        $scope.classify = function(){

            var e = GazeAnalytics.classifyIVT($scope.velocity.values, $scope.velocity.threshold, $scope.event),
                n = $scope.points.length,
                f = [],
                s = [],
                i = 0;


            for(; i < n; i++)
                if(e[i] === 0) //fixation
                    f.push($scope.points[i]);
                 else  //saccade
                    s.push($scope.points[i]);


            $scope.fixations = f;
            $scope.saccades = s;

        };


        $scope.setMode = function(m){ $scope.mode = m; };

        $scope.resetView = function(){

            EventService.broadcastSceneReset();
            $scope.$broadcast('view.reset');

        };

        $scope.broadcastEvent = function(msg,data){
            $scope.$broadcast(msg,data);
        };

        $scope.domain = function(){

            if($scope.xDomain && $scope.yDomain)
                return {dx: $scope.xDomain,
                    dy: $scope.yDomain};

        };


        function updateScale(e,d){

            $scope.xScale.domain(d.xs().domain()).range(d.xs().range());
            $scope.yScale.domain(d.ys().domain()).range(d.ys().range());

        }


        function init(e,d){

            var dx = [0, +$scope.frm.img.naturalWidth],
                dy = [0, +$scope.frm.img.naturalHeight],
                v = $scope.velocity;

            $scope.xScale = d3.scale.linear().domain(dx);
            $scope.yScale = d3.scale.linear().domain(dy);

            //default data scale
            $scope.xDomain = dx;
            $scope.yDomain = dy;

            $scope.points = d.data.pos;

            v.values = d.data.velocity;
            v.threshold = ~~(d.data.avgVelocity);
            v.min = ~~Math.max(v.threshold - 2 * d.data.stdVelocity, 0);
            v.max = ~~(v.threshold + 2 * d.data.stdVelocity);
            v.step = ~~(d.data.stdVelocity/4);

            $scope.event = stat.array($scope.points.length, 0);
            $scope.visibility = stat.array($scope.points.length, 1);
            $scope.classify();

            $scope.$broadcast('domain.ready', d);

        }

        $scope.$on('view.zoom' , updateScale);
        $scope.$on('scene.ready', init);


    });

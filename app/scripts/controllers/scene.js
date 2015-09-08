'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:SceneCtrl
 * @description
 * # SceneCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('SceneCtrl', ['$scope', 'EventService', 'GazeAnalytics', function ($scope, EventService, GazeAnalytics) {

        $scope.name = 'SceneCtrl';

        $scope.showTracking = true;
        $scope.showHeatmap = false;
        $scope.showFixations = false;
        $scope.showSaccades = false;
        $scope.showScanPath = false;


        $scope.frm = {};
        $scope.sp = {};
        $scope.alpha = { value:50, partition:false};

        $scope.visibilityChanged = false;

        $scope.velocity =   {min:0, step:1, max:600, threshold:300 };
        $scope.dispersion = {min:0, step:1, max:10, threshold:5 };
        $scope.methods = {ivt:classifyIVT, idt:classifyIDT};
        $scope.detectionMethod = 'idt';

        $scope.mode = 'selection';

        $scope.dataurl = function(imgdata){
            $scope.heatmapImg = imgdata;
            $scope.$broadcast('heatmap.update', imgdata);
        };


        $scope.clickPropagate = function (src, dest){


            var srcnode  = document.getElementById(src),
                srcz = srcnode.style.zIndex,
                destnode  = document.getElementById(dest),
                destz = destnode.style.zIndex,
                e = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });

            //send src back & bring dest front
            srcnode.style.zIndex  = destz-1;
            destnode.style.zIndex = srcz+1;

            //simulate click
            (document.elementFromPoint(window.event.clientX, window.event.clientY).dispatchEvent(e));

            //restore z
            srcnode.style.zIndex  = srcz;
            destnode.style.zIndex = destz;
        };


        $scope.saccadeVisibility = function(){

            var n = $scope.event.length,
                i = 0;

            if($scope.showSaccades){

                for(; i < n; i++)
                    $scope.visibility[i] = ($scope.event[i] === 1) ? 1 :
                        ($scope.showFixations) ? 1 : 0;

            } else if($scope.showFixations){

                for(; i < n; i++)
                    $scope.visibility[i] = ($scope.event[i] === 1) ? 0 :
                        ($scope.showFixations) ? 1 : 0;

            } else{

                for (; i < n; i++)  $scope.visibility[i] = 1;

            }

            $scope.$broadcast('update.visibility');

        };




        $scope.fixationVisibility = function(){

            var n = $scope.event.length,
                i = 0;

            if($scope.showFixations){
                for(; i < n; i++)
                    $scope.visibility[i] = ($scope.event[i] === 0) ? 1 : ($scope.showSaccades) ? 1 : 0;

            }else if($scope.showSaccades) {
                for (; i < n; i++)
                    $scope.visibility[i] = ($scope.event[i] === 0) ? 0 : ($scope.showSaccades) ? 1 : 0;

            } else{

                for (; i < n; i++)  $scope.visibility[i] = 1;

            }


            $scope.$broadcast('update.visibility');

        };



        //hack -- fix it
        $scope.onFixationClick  = function(d, i){

            d3.select('#tooltip-0-a').text('Id: ');
            d3.select('#tooltip-0-b').text(i);

            d3.select('#tooltip-1-a').text('Duration: ');
            d3.select('#tooltip-1-b').text( (+$scope.scanPathDuration.fixation[i]).toFixed(3) + ' (secs)');

            //d3.select('#tooltip-2-a').text('Total: ');
            //d3.select('#tooltip-2-b').text((+$scope.scanPathDuration.totalFixation).toFixed(3) + ' (secs)');


            d3.select('#tooltip-2-a').text('Thresh: ');
            d3.select('#tooltip-2-b').text((+$scope.scanPath[i].threshold).toFixed(3) + ' (secs)');


            $scope.sp.selection = d.range;

        };

        $scope.onFixationEdgeClick  = function(d,i){


            d3.select('#tooltip-0-a').text('Edge: ');
            d3.select('#tooltip-0-b').text('('+i+','+(i+1)+')');

            d3.select('#tooltip-1-a').text('Duration: ');
            d3.select('#tooltip-1-b').text((+$scope.scanPathDuration.between[i]).toFixed(3) + ' (secs)');

            d3.select('#tooltip-2-a').text('Total: ');
            d3.select('#tooltip-2-b').text((+$scope.scanPathDuration.totalBetween).toFixed(3) + ' (secs)');

            d3.event.stopPropagation();


        };


        $scope.classify = function(){

            ($scope.methods[$scope.detectionMethod]).call();

        };

        function classifyIDT(){


            console.log('classify IDT', $scope.dispersion.threshold);

            var p = $scope.points,
                w = 10,
                ts = 1e-6;

            $scope.scanPath = GazeAnalytics.classifyIDT($scope.points, $scope.gvec, $scope.dispersion.threshold, w, $scope.time);
            $scope.scanPathDuration = GazeAnalytics.fixationDuration($scope.scanPath, ts);
            $scope.scanPathPoints = GazeAnalytics.clusterPoints($scope.scanPath, p);


            if($scope.showSaccades)  $scope.saccadeVisibility();
            if($scope.showFixations) $scope.fixationVisibility();


        }



        function classifyIVT(){

            var e = GazeAnalytics.classifyIVT($scope.velocity.values, $scope.velocity.threshold, $scope.event),
                p = $scope.points,
                g = $scope.gvec,
                n = p.length,
                f = [],
                s = [],
                i = 0,
                ts = 1e-6;

            for(; i < n; i++)
                if(e[i] === 0) {
                    //fixation
                    f.push(p[i]);
                } else {  //saccade
                    s.push(p[i]);
                }

            $scope.fixations = f;
            $scope.saccades = s;

            $scope.scanPath = GazeAnalytics.cluster(e, p, g, 10, 0, 1, $scope.time); // fixation path
            $scope.scanPathDuration = GazeAnalytics.fixationDuration($scope.scanPath, ts);

            // $scope.scanPathTooltip =  $scope.generateScanPathTooltip($scope.scanPath, $scope.scanPathDuration);

            $scope.scanPathPoints = GazeAnalytics.clusterPoints( $scope.scanPath, p);

            // $scope.saccadePathPoints = GazeAnalytics.clusterPoints($scope.saccadePath, p);

            $scope.saccadePathPoints = s;
            // $scope.saccadePathDuration = GazeAnalytics.saccadeDuration(e, $scope.time, 0.000001);

            if($scope.showSaccades)  $scope.saccadeVisibility();
            if($scope.showFixations) $scope.fixationVisibility();


        }


        $scope.generateScanPathTooltip  = function(p, d){

            var n = p.length,
                f = d.fixation,
                total= d.totalFixation,
                tt = [],
                i;

            for (i = 0; i < n; i++ )
                tt.push('duration: ' + f[i] + ', total: ' + total + '(secs)');


            return tt;

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
                    dy: $scope.yDomain,
                    rx: $scope.xScale.range(),
                    ry:$scope.yScale.range()};

        };




        function updateScale(e, d){

            $scope.xScale.domain(d.xs().domain()).range(d.xs().range());
            $scope.yScale.domain(d.ys().domain()).range(d.ys().range());

        }


        function init(e,  d) {

            if(! $scope.frm.img)  return;

            var dx = [0, +$scope.frm.img.naturalWidth],
                dy = [0, +$scope.frm.img.naturalHeight],
                v = $scope.velocity;

            $scope.xScale = d3.scale.linear().domain(dx);
            $scope.yScale = d3.scale.linear().domain(dy);

            //default data scale
            $scope.xDomain = dx;
            $scope.yDomain = dy;

            $scope.points = d.data.pos;
            $scope.gvec = d.data.gvec;
            $scope.time = d.data.time;

            $scope.duration = 1e-6*($scope.time[$scope.time.length-1] - $scope.time[0]);

            v.values = d.data.velocity;
            //v.min = Math.max(d.data.avgVelocity - 5 * d.data.stdVelocity, 0);
            //v.max = (d.data.avgVelocity +  5 * d.data.stdVelocity);
            //v.threshold = ( 0.5 * (v.min + v.max) );
            //v.step = (d.data.stdVelocity/16);

            $scope.event = stat.array($scope.points.length, 0);
            $scope.visibility = stat.array($scope.points.length, 1);

            ($scope.methods[$scope.detectionMethod]).call();

            $scope.$broadcast('domain.ready', d);

        }

        $scope.$on('alpha.update' , function(e,d){ $scope.alpha.value = d;});
        $scope.$on('alpha.partition' , function(e,d){  $scope.alpha.partition = d;  });
        $scope.$on('view.zoom' , updateScale);
        $scope.$on('scene.ready', init);


    }]);

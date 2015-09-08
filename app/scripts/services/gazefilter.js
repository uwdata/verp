'use strict';

/**
 * @ngdoc service
 * @name verpApp.GazeFilter
 * @description
 * # GazeFilter
 * Factory in the verpApp.
 */
angular.module('verpApp')
    .factory('GazeFilter', function () {


        var opts = { noise:{filter:'none', window:40},
            ivt:{velocity:'point', window:20},
            idt:{duration:80},
            post:{
                merge:true,
                mergeBtwAngle:0.5,
                mergeBtwTime:75,
                discard:true,
                discardDuration:60 }
        };


        var options  = function (_){

           if (! arguments.length ) return opts;

            opts  = _;

        };



        var movingMedian = function(p, t, w){

            return windowFilter(p, t, w, median);

        };


        var movingAverage = function(p, t, w){

            return windowFilter(p, t, w, mean);

        };


        // filtering over a window of size w--in number of samples
        var windowFilter = function(p, t, w, filterFn){

            var pf  = [],
                m = p.length - 1,
                n = 0.5 * (w - 1),
                k, i, j, il, ir;

            pf.push(p[0]);

            for (i = 1; i < m ; i++){

                il = i - n;
                il = il < 0 ? 0 : il;
                ir = i + n;
                ir = ir > m ? m : ir;

                k =  Math.min( i-il, ir-i ); //k is the adaptive n

                // create a copy of the window
                var a = [];
                for (j = i-k; j <= i+k; j++) a.push( [ p[j][0], p[j][1] ] );

                pf.push([ filterFn(a, 0), filterFn(a, 1) ]);

            }

            pf.push(p[m]);

            return pf;

        };



        function mean(a, indx){

            var s = 0,
                n = a.length,
                i;

            if ( !n ) return;

            for (i = 0; i < n; i++)  s += a[i][indx];

            return s / n;

        }

        // adapted from http://en.wikipedia.org/wiki/Quickselect
        var  select = function(list, listIndx, left, right, k) {

            if (left === right) return list[left][listIndx];

            var pivotIndex;

            while(true) {

                pivotIndex = (left + right) >>> 1;

                pivotIndex = partition(list, listIndx, left, right, pivotIndex);

                if ( k === pivotIndex )

                    return list[k][listIndx];

                else if (k < pivotIndex)

                    right =  pivotIndex - 1;

                else
                    left = pivotIndex + 1;

            }

        };


        var swap = function(list, listIndx, i, j){

            var tmp = list[i][listIndx];

            list[i][listIndx] = list[j][listIndx];
            list[j][listIndx] = tmp;

        };

        var  partition = function(list, listIndx, left, right, pivotIndex) {

            var pivotValue = list[pivotIndex][listIndx],
                storeIndex, i;

            swap(list, listIndx, pivotIndex, right);  // Move pivot to end

            storeIndex = left;

            for (i = left ; i < right; i++){

                if (list[i][listIndx] < pivotValue ) {
                    swap(list, listIndx, storeIndex, i);
                    ++storeIndex
                }

            }

            swap (list,  listIndx,  right,  storeIndex); // Move pivot to its final place

            return storeIndex

        };

        function median(a, indx){

            var n = a.length,
                left = 0,
                right = n - 1,
                k =  right / 2;

            return select(a, indx, left, right, k);

        }


        // Public API here
        return {
            options: options,
            movingAverage: movingAverage,
            movingMedian: movingMedian
        };

    });

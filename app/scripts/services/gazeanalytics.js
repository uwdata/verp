'use strict';

/**
 * @ngdoc service
 * @name verpApp.GazeAnalytics
 * @description
 * # GazeAnalytics
 */
angular.module('verpApp')
    .factory('GazeAnalytics', function () {

        //
        // merge fixations
        //
        var mergeMaxDuration  = function(){


        };

        // merge consecutive fixations
        // that are within the max angle
        var mergeFixations  = function(fixations, maxduration, maxangle, time){
            //
            //
            //
            var n =  fixations.length,
                merged = [],
                ts = 1 / 1e-6,
                i = 0,
                f0,f1 ;

            while(i < n-1){

                f0 = fixations[i];
                f1 = fixations[i+1];

                if( ( ( time[f1.range[1]-1] - time[f0.range[1]-1] ) < maxduration )
                    && (stat.degree( f0.gvec, f1.gvec)  <=  maxangle ) ) {

                    merged.push(merge(f0,f1));
                    i += 2;
                } else {
                    merged.push(f0);
                    ++i;
                }

            }


            console.log(fixations.length);
            console.log(merged.length);
            return merged;

        };



        var discardMinDuration = function (){

            //
            //
            //

        };



        var delta = function(t, s){

            if(!t)  return;

            var dt = [],
                ts = s || 1,
                n = t.length,
                i;

            for(i = 0; i < n-1; i++) dt.push( ts * (t[i+1] - t[i]) );

            dt.push(dt[i-1]);

            return dt;

        };



        //
        //
        //
        function dispersion(p, i, j, g){

            var maxX = -Infinity,
                minX = +Infinity,
                maxY = -Infinity,
                minY = +Infinity,
                maxXi, minXi, maxYi, minYi, k, x, y;

            for (k = i; k < j; k++) {

                x = p[k][0];
                y = p[k][1];

                if(maxX < x ){ maxX = x; maxXi = k; }
                if(minX > x ){ minX = x; minXi = k; }
                if(maxY < y ){ maxY = y; maxYi = k; }
                if(minY > y ){ minY = y; minYi = k; }

            }

            var vMaxX = g[maxXi],
                vMinX = g[minXi],
                vMaxY = g[maxYi],
                vMinY = g[minYi];

            y = 0.5 * ( vMinX[1] + vMaxX[1] );
            x = 0.5 * ( vMinY[0] + vMaxY[0] );


            return Math.max(
                stat.vector.degree([ vMaxX[0], y, vMaxX[2] ], [vMinX[0], y, vMinX[2]] ),
                stat.vector.degree([ x, vMaxY[1], vMaxY[2] ], [x, vMinY[1], vMinY[2]] )
            );

        }

        //
        // p - eye-movement positions
        // g - gaze vectors
        // d - dispersion threshold
        // w - window size in the number of samples
        //
        var classifyIDT = function(p, g, t, w, time){

            var n = p.length,
                i = 0,
                fixations = [],
                j = w,
                f = false,
                k = 0,
                d;

            while(j <= n) {

                if( ( d = dispersion( p, i, j, g ) ) < t ) {

                    j++ ;
                    f = true ;

                } else {

                    if( f ){

                        //backup, --j,  and record the found fixation
                        fixations.push({
                            pos: centroid(p, i, --j),
                            gvec: centroid(g, i, j),
                            label: k,
                            data: j-i,
                            range: [i, j]
                        });

                        k++;
                        f = false;
                        i = j;

                    } else {
                        i++;
                    }

                    j = i + w;

                }

            }

            if( f ) fixations.push( { pos:centroid(p, i, --j), label:k, data:j-i, range:[i, j]} );

            return merge(fixations, 0.075, 0.5, time) ;

        };


        var classifyIVT = function(v, t, c0){

            var n = v.length,
                c = c0  || [],
                i = 0;

            for(; i < n; i++)  c[i] = v[i] < t ? 0 : 1;

            return c;

        };


        var nextEvent = function(c,  i , id) {

            var n = c.length;

            while ((i < n)  && (c[i] !== id)) ++i;

            return i;

        };



        //group by fixation points
        var cluster = function(c, p, minsize, id0, id1){

            var n = p.length,
                cluster = [],
                cnt = 0,
                i = 0,
                j = 0,
                m = 0;


            while( (i = nextEvent(c, i, id0)) < n ) {

                j = nextEvent(c, i+1, id1);

                m = j - i;

                if (m >= minsize) {

                    cluster.push({pos:centroid(p, i, j), label:cnt, data: m, range:[i, j]});
                    ++cnt;
                }

                if (j >= n )  break;

                i = j;
            }


            return cluster;

        };


        //saccade duration
        var saccadeDuration = function(c, t){

        };

        //fixation durations in secs
        //c: cluster
        //t: time
        //s: time scale
        var fixationDuration = function(c, t, s){

            var n = c.length,
                fixationTime = [],
                btwTime = [],
                total0 = 0,
                total1 = 0,
                d, i0, j0, i1,  k;

            if(!n) return;

            for (k = 0; k < n - 1; k++){

                i0 = c[k].range[0];
                j0 = c[k].range[1];

                d = s * (t[j0] - t[i0]);
                total0 += d;
                fixationTime.push(d);

                i1 = c[k+1].range[0];

                d = s * ( t[i1] - t[j0] );
                total1 += d;
                btwTime.push(d);

            }

            i0 = c[k].range[0];
            j0 = Math.min(c[k].range[1], t.length-1);

            d = s * (t[j0] - t[i0]);
            total0 += d;

            fixationTime.push(d);

            return {
                fixation:fixationTime,
                between:btwTime,
                totalFixation:total0,
                totalBetween:total1
            };

        };


        // extract actual fixation points using range
        // indices from  clustering
        var clusterPoints = function(c, p){

            var n = c.length,
                f = [],
                i, j, k;

            for (k = 0; k < n; k++) {

                i = c[k].range[0];
                j = c[k].range[1];

                var fk  = [];

                for (; i < j; i++)  fk.push(p[i]);

                f.push(fk);
            }

            return f;

        };


        //not to be confused w/ medoid
        var medianoid = function(p, i, j){

            return stat.median( p.slice(i,j),0 );

        };

        var centroid = function(p, i, j){

            var n = j - i,
                m = p[i].length,
                c = stat.array(m, 0),
                k;

            for(; i < j; i++)
                for (k = 0; k < m; k++)
                    c[k] += ( p[i][k] / n );

            return c;

        };


        // angular velocities from gaze vectors
        // and time deltas
        var angularVelocityGaze = function(g, t){

            var n = g.length,
                w = [],
                i, c, deg;

            for( i=0 ; i < n-1; i++) {

                c = stat.vector.dot( g[i], g[ i + 1 ] );

                deg = (c < -1) ? 180 : c > 1 ? 0 : deg = 180 *  Math.acos ( c) / Math.PI;

                w.push( deg / t[i] ) ;
            }

            w.push( w[ i - 1 ] );

            return w;

        };


        var angularVelocity = function(p, t, s, h){

            var n = p.length,
                w = [],
                i = 0,
                x0, y0, x1, y1, v, v0, v1, v2;

            for( ; i < n-1; i++) {

                // in mm
                x0 = s[0]*p[i][0];
                x1 = s[0]*p[i+1][0];
                y0 = s[1]*p[i][1];
                y1 = s[1]*p[i+1][1];

                v = stat.vector.normalize([-(y1 - y0), (x1 - x0)]);

                if(v){

                    v0 = [0.5 * (x1 - x0), 0.5 * (y1 - y0)];
                    v1 = [h * v[0], h * v[1]];
                    v2 = stat.vector.add(v0, v1);

                    w.push(2 * (90 - stat.vector.degree(v0, v2)) / t[i]);

                } else {

                    w.push(0);

                }

            }

            w.push(w[i-1]);

            return w;

        };


        var spatialVelocity = function(p, t, s){

            var n = p.length,
                v = [],
                i = 0,
                x0, y0, x1, y1, delta;


            for( ; i < n-1; i++){

                x0 = s[0]*p[i][0];
                x1 = s[0]*p[i+1][0];
                y0 = s[1]*p[i][1];
                y1 = s[1]*p[i+1][1];

                delta = Math.sqrt(x0*x0 + y0*y0 - 2*x0*x1 - 2*y0*y1 + y1*y1 + x1*x1);

                v.push(delta/t[i]);
            }

            v.push(v[i-1]);

            return v;

        };


        var pixelVelocity = function(p, t){

            var n = p.length,
                i = 0,
                v = [],
                x0, y0, x1, y1, delta;

            for(; i < n-1; i++){

                x0 = p[i][0];
                x1 = p[i+1][0];
                y0 = p[i][1];
                y1 = p[i+1][1];

                delta = Math.sqrt(x0*x0 + y0*y0 - 2*x0*x1 - 2*y0*y1 + y1*y1 + x1*x1);
                v.push(delta/t[i]);

            }

            v.push(v[i-1]);
            return v;

        };

        // Public API here
        return {

            cluster: cluster,
            clusterPoints: clusterPoints,
            classifyIVT: classifyIVT,
            classifyIDT: classifyIDT,
            fixationDuration: fixationDuration,
            angularVelocity: angularVelocity,
            angularVelocityGaze: angularVelocityGaze,
            spatialVelocity: spatialVelocity,
            pixelVelocity: pixelVelocity,
            delta: delta

        };

    });

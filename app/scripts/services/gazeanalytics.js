'use strict';

/**
 * @ngdoc service
 * @name verpApp.GazeAnalytics
 * @description
 * # GazeAnalytics
 */
angular.module('verpApp')
    .factory('GazeAnalytics',  [ 'DataService', function (DataService) {

        function rangeCount ( range ){

            var n = range.length,
                z = 0,
                i;

            for (i = 0; i < n; i++ ) z += ( range[i][1] - range[i][0] ) ;

            return z;
        }


        function mergeRanges (range0, range1){

            var m = range0.length,
                n = range1.length,
                i, j0, i1, j1;

            j0 = range0[ m-1 ][1];

            i1 = range1[0][0];
            j1 = range1[0][1];


            if(j0 === i1)
                range0[m-1][1] = j1;
            else
                range0.push(range1[0]);

            for ( i = 1; i < n; i++ )
                range0.push(range1[i]);

            return range0;

        }

        //function rangeTime (range){
        //
        //    var n = range.length,
        //        z = 0,
        //        i;
        //
        //    for (i = 0; i < n; i++ ) z += ( range[i][1] - range[i][0] ) ;
        //
        //    return z;
        //
        //
        //}


        //merge two fixations
        function merge(f0, f1){

            var range = mergeRanges(f0.range, f1.range),
                v0 = f0.gvec,
                v1 = f1.gvec,
                a =  f0.size / (f0.size + f1.size),
                gvec = stat.vector.normalize(
                    stat.vector.add( stat.vector.scalar(v0,a), stat.vector.scalar( v1, 1-a ) ) ),
                p0 = f0.pos,
                p1 = f1.pos,
                pos  = stat.vector.add( stat.vector.scalar(p0,a), stat.vector.scalar(p1, 1-a) );

            return {
                pos: pos,
                gvec: gvec,
                range: range,
                size: rangeCount(range),
                start: f0.start,
                end: f1.end,
                threshold: f0.threshold + f1.threshold
            };
        }



        function enumerateFixations(fixations){

            var n = fixations.length,
                i;

            for (i = 0; i < n; i++ ) fixations[i].label=i;

            return fixations;

        }



        function discardFixations (fixations, minduration){

            var n = fixations.length,
                updated = [],
                ts = 1e-6,
                i;


            for( i = 0; i < n;  i ++ ){
                if( ts*( fixations[i].end - fixations[i].start ) >= minduration )
                    updated.push(fixations[i]);


            }

            //console.log(updated.length, fixations.length);
            return updated;

        }

        // merge consecutive fixations
        // that are within the max angle
        function mergeFixations(fixations, maxduration, maxangle) {

            var n = fixations.length,
                merged = [],
                ts = 1e-6,
                i = 0,
                f0, f1, deg, delta;

            while( i < n-1 ){

                f0 = fixations[i];
                f1 = fixations[i+1];

                if( (delta = ts * ( f1.start - f0.end ) ) < maxduration
                    && (deg = stat.vector.degree( f0.gvec, f1.gvec ))  <=  maxangle )  {

                    merged.push( merge( f0, f1 ) );
                    i += 2;

                } else {
                    merged.push(f0);
                    ++i;
                }

            }

            if( i === (n - 1) ) merged.push(fixations[i]);

            //console.log( fixations.length );
            //console.log( merged.length );

            return enumerateFixations(merged);

        }


        //var discardMinDuration = function (){
        //
        //
        //
        //};


        var delta = function(t, s){

            if(!t)  return;

            var dt = [],
                n  = t.length,
                i;

            for(i = 0; i < n-1; i++) dt.push( s * (t[i+1] - t[i]) );

            dt.push(dt[i-1]);

            return dt;

        };



        //
        //
        //
        function dispersion(p, g, i, j){

            var maxX = -Infinity,
                minX = +Infinity,
                maxY = -Infinity,
                minY = +Infinity,
                maxXi, minXi, maxYi, minYi, x, y;


            while(i < j){

                x = p[i][0];
                y = p[i][1];

                if(maxX < x ){ maxX = x; maxXi = i; }
                if(minX > x ){ minX = x; minXi = i; }

                if(maxY < y ){ maxY = y; maxYi = i; }
                if(minY > y ){ minY = y; minYi = i; }

                i++
            }


            var vMaxX = g[maxXi],
                vMinX = g[minXi],
                vMaxY = g[maxYi],
                vMinY = g[minYi];

            //y = 0.5 * ( vMinX[1] + vMaxX[1] );
            //x = 0.5 * ( vMinY[0] + vMaxY[0] );

            return  Math.max (
                //maxX - minX, maxY - minY
                stat.vector.degree(vMinX, vMaxX), stat.vector.degree(vMinY, vMaxY)
                //stat.vector.degree([vMaxX[0], y, vMaxX[2] ], [vMinX[0], y, vMinX[2]] ),
                //stat.vector.degree([x, vMaxY[1], vMaxY[2] ], [x, vMinY[1], vMinY[2]] )
            );


            //console.log((maxX - minX)*(maxY-minY)*0.2*0.2);
            //console.log(maxY - minY);
            //console.log(t);

            //return t;

        }

        //
        // p - eye-movement positions
        // g - gaze vectors
        // d - dispersion threshold
        // w - window size in the number of samples
        //
        var classifyIDT = function(p, g, threshold, time){

            var fixations = [],
                match = {},
                o = DataService.options(),
                w = DataService.timeToSamples (o.idt.duration, 1e-3),
                n = p.length,
                i = 0,
                j = w,
                f = false,
                k = 0,
                d;


            while(j <= n) {

                if( ( d = dispersion( p, g, i, j ) ) < threshold ) {

                    match.d = d;
                    match.i = i;
                    match.j = j;

                    j++ ;
                    f = true;

                } else {

                    if( f ){

                        //backup and record the found fixation
                        fixations.push({
                            pos: centroid(p, match.i, match.j),
                            gvec: centroid(g, match.i, match.j),
                            label: k,
                            size: match.j-match.i,
                            range: [[match.i, match.j]],
                            start: time[ match.i ],
                            end: time[match.j - 1 ],
                            threshold: match.d
                        });

                        k++;
                        f = false;
                        i = match.j;

                    } else {

                        i++;

                    }

                    j = i + w;

                }

            }

            if( f ) fixations.push( {
                pos: centroid(p, match.i, match.j),
                gvec: centroid(g, match.i, match.j),
                label: k,
                size: match.j-match.i,
                range: [[match.i, match.j]],
                start: time[ match.i ],
                end: time[match.j - 1 ],
                threshold: match.d
            } );



            //console.log(o.post);

            if( o.post.merge )
                fixations = mergeFixations(fixations,
                    1e-3* (o.post.mergeBtwTime),
                    o.post.mergeBtwAngle);

            if (o.post.discard)
                fixations = discardFixations(fixations, 1e-3 * (o.post.discardDuration));


            return fixations;

        };


        var classifyIVT = function(v, t, c){

            var n = v.length,
                i;

            for(i = 0; i < n; i++)  c[i] = v[i] < t ? 0 : 1;

            return c;

        };


        var nextEvent = function(c,  i , id) {

            var n = c.length;

            while ((i < n)  && ( c[i] !== id )) ++i;

            return i;

        };



        //group by fixation points
        var cluster = function(c, p, g, minsize, id0, id1, time){

            var n = p.length,
                fixations = [],
                cnt = 0,
                i = 0,
                j = 0,
                m = 0;

            while( (i = nextEvent(c, i, id0)) < n ) {

                j = nextEvent(c, i+1, id1);

                m = j - i;

                if (m >= minsize) {

                    fixations.push( {
                        pos:centroid(p, i, j),
                        gvec: centroid(g, i, j),
                        label:cnt,
                        size:m,
                        range:[[ i, j]],
                        start:time[i],
                        end:time[j-1]} );

                    ++cnt;
                }

                if (j >= n )  break;
                i = j;

            }

            var o = DataService.options();

            if( o.post.merge )
                fixations = mergeFixations(fixations,
                    1e-3* (o.post.mergeBtwTime),
                    o.post.mergeBtwAngle);

            if (o.post.discard)
                fixations = discardFixations(fixations, 1e-3 * (o.post.discardDuration));

            return fixations;

        };

        //
        // saccade duration
        // var saccadeDuration = function(c, t){
        //
        //};

        //
        // fixation durations in secs
        // c: cluster
        // t: time
        // s: time scale
        //
        var fixationDuration = function(c, s){

            var n = c.length,
                fixationTime = [],
                btwTime = [],
                total0 = 0,
                total1 = 0,
                d, k;

            if(!n) return;

            for (k = 0; k < n - 1; k++){

                d = s * (c[k].end - c[k].start);
                total0 += d;
                fixationTime.push(d);

                d = s * ( c[k+1].start - c[k].end );
                total1 += d;
                btwTime.push(d);


            }


            d = s * (c[k].end - c[k].start);
            total0 += d;

            fixationTime.push(d);

            //console.log(k, d);

            return {

                fixation: fixationTime,
                between: btwTime,
                totalFixation: total0,
                totalBetween: total1

            };

        };


        //
        // extract actual fixation points
        // using range indices from clustering
        //
        var clusterPoints = function(c, p){

            var n = c.length,
                f = [],
                i, j, k, m, r, ir;

            for (k = 0; k < n; k++){

                r = c[k].range;
                m = r.length;

                var fk = [];

                for (ir = 0; ir < m;ir++ ){

                    i = r[ir][0];
                    j = r[ir][1];

                    while(i < j) fk.push(p[i++]);

                }

                f.push(fk);
            }

            return f;

        };


        //not to be confused w/ medoid
        //var medianoid = function(p, i, j){
        //
        //    return stat.median( p.slice(i,j),0 );
        //
        //};

        /*

         var rangeCentroid = function(p, range){

         var n = range.length,
         d = p[0].length,
         c = stat.array(d, 0),
         z = 0,
         i, j, k;

         for(i = 0; i < n; i++){
         for (j = range[i][0] ; j < range[i][1]; j++) {
         for (k = 0; k < d; k++) c[k] += p[j][k];
         z += range[i][1] - range[i][0];
         }
         }

         for (k = 0; k < d; k++) c[k] /= z;

         return c;

         };
         */

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





        //
        // angular velocities from
        // gaze vectors and time deltas (secs)
        //
        var angularVelocityGaze = function(g, t, current) {

            var n = g.length,
                v = [] || current,
                o = DataService.options(),
                ts = 1e6, //scale to secs
                wv = 0,
                i, c, cnt, deg, w, s, e, d;


            if(o.ivt.velocity === 'point') {

                for (i = 0; i < ( n - 1); i++) {

                    c = stat.vector.dot(g[i], g[i + 1]);
                    deg = c < -1 ? 180 : c > 1 ? 0 : 180 * Math.acos(c) / Math.PI;

                    v[i] = ts * deg / ( t[i + 1] - t[ i ] ) ;


                }


            } else if ( o.ivt.velocity === 'window' ) {

                w = DataService.timeToSamples(o.ivt.window, 1e-3);

                for (i = 0; i <  n-1; i++ ) {

                    s =  Math.max ( 0, i - w );
                    e =  Math.min ( n - 1, i + w );
                    d =  Math.min ( i - s, e - i );
                    s = i - d;
                    e = i + d;

                    wv = 0;
                    cnt = 0;

                    while( ( s - e ) > 1 ){

                        c  = stat.vector.dot(g[s], g[e]);
                        deg = c < -1 ? 180 : c > 1 ? 0 : 180 * Math.acos(c) / Math.PI;
                        wv +=  deg / (t[e] - t[s]) ;

                        ++cnt;
                        --e;
                        ++s;

                    }

                    if( cnt ) {

                        v[i] = ts * wv / cnt;


                    } else {

                        c  = stat.vector.dot(g[i], g[i+1]);
                        deg = c < -1 ? 180 : c > 1 ? 0 : 180 * Math.acos(c) / Math.PI;

                        v[i] = ts * deg /  (t[i+1] - t[i] ) ;

                    }

                }

            }

            v[i] = v[i - 1];

            return v;

        };




        var angularVelocity = function(p, t, s, h){

            var n = p.length,
                w = [],
                i, x0, y0, x1, y1, v, v0, v1, v2;

            for(i = 0 ; i < n-1; i++) {

                //
                // in mm
                //
                x0 = s[0]*p[i][0];
                x1 = s[0]*p[i+1][0];

                y0 = s[1]*p[i][1];
                y1 = s[1]*p[i+1][1];

                v = stat.vector.normalize( [ -(y1 - y0), (x1 - x0) ]);


                if(v){

                    v0 = [0.5 * (x1 - x0), 0.5 * (y1 - y0)];
                    v1 = [h * v[0], h * v[1]];
                    v2 = stat.vector.add(v0, v1);

                    w.push(2 * ( 90 - stat.vector.degree(v0, v2) ) / t[i]);

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

                v.push( delta / t[i] );
            }

            v.push( v[ i-1 ] );

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

            v.push( v[i-1] );
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

    } ] );

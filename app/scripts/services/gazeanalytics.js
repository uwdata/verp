'use strict';

/**
 * @ngdoc service
 * @name verpApp.GazeAnalytics
 * @description
 * # GazeAnalytics
 */
angular.module('verpApp')
    .factory('GazeAnalytics', function () {


        var delta = function(t, s){

            if(!t) {
                console.warn('No data to take delta of');
                return;
            }

            var dt = [],
                ts = s || 1,
                n = t.length,
                i = 0;

            for(; i < n-1; i++) dt.push( ts * (t[i+1] - t[i]) );

            dt.push(dt[i-1]);

            return dt;
        };


        var classifyIVT = function(v, t, c0){

            var n = v.length,
                c = c0  || [],
                i = 0;

            for(; i < n; i++)  c[i] = v[i] < t ? 0 : 1;

            return c;

        };


        var nextEvent = function(c, i , id) {

            var n = c.length;

            while (i < n && c[i] !== id ) ++i;

            return i;

        };



        //group by fixation points
        var cluster = function(c, p){

            var n = p.length,
                minsize = 20, //minimum fixation cluster size
                cluster = [],
                cnt = 0,
                i = 0,
                j = 0,
                m = 0;

            while((i = nextEvent(c, i, 0)) < n ) {

                j = nextEvent(c, i, 1);

                m = j - i;

                if (m >= minsize) {
                    cluster.push({pos: centroid(p, i, j), label:cnt, data: m, range:[i,j]});
                    ++cnt;
                }

                if (j >= n )  break;

                i = j;
            }

            return cluster;

        };


        // extract actual fixation points using range
        // indices given by fixation clustering
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




        var centroid = function(p, i, j){

            var n = j - i,
                c = [0, 0];

            for(; i < j; i++) {
                c[0] += p[i][0];
                c[1] += p[i][1];
            }

            c[0] /= n;
            c[1] /= n;

            return c;

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
            angularVelocity: angularVelocity,
            spatialVelocity: spatialVelocity,
            pixelVelocity: pixelVelocity,
            delta: delta

        };

    });

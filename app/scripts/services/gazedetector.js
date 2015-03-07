'use strict';

/**
 * @ngdoc service
 * @name verpApp.GazeDetector
 * @description
 * # GazeDetector
 * Various classification algorithms for detecting fixations, blinks and saccades.
 * Factory in the verpApp.
 */
angular.module('verpApp')
    .factory('GazeDetector', function () {
        // Service logic


        var angular = function(p, t, s, h){


            var n = p.length,
                w = [],
                i = 0,
                x0, y0, x1, y1, v, v0, v1, v2;

            for(i = 0; i < n-1; i++) {

                // in mm
                x0 = s[0]*p[i][0];
                x1 = s[0]*p[i][1];
                y0 = s[1]*p[i+1][0];
                y1 = s[1]*p[i+1][1];

                v = stat.vector.normalize([-(y1 - y0), (x1 - x0)]);

                if(v) {

                    v0 = [0.5 * (x1 - x0), 0.5 * (y1 - y0)];

                    v1 = [h * v[0], h * v[1]];

                    v2 = stat.vector.add(v0, v1);


                    w.push((90 - stat.vector.degree(v0, v2)) / t[i]);

                }else{
                    w.push(0);
                }
            }

            w.push(w[i-1]);


            return w;

    };



// Public API here
return {
    angularVelocity: angular
};
});

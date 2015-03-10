'use strict';

/**
 * @ngdoc service
 * @name verpApp.parser
 * @description
 * # parser
 * Factory in the verpApp.
 */
angular.module('verpApp')
    .factory('Parser', function (GazeAnalytics) {

        var calibAreaWidth, calibAreaHeight;

        var coordXform = function (d) {

            var cw = calibAreaWidth,
                ch = calibAreaHeight,
                eps = 0.1,
                w  = d.domainWidth,
                h  = d.domainHeight,
                tx = (w-cw) * 0.5,
                ty = (h-ch) * 0.5,
                i;

            for (i = 0; i < d.length; i++) {
                if (!(Math.abs(d[i][0]) < eps  &&
                    Math.abs(d[i][1]) < eps)){
                    d[i][0] += tx;
                    d[i][1] += ty;
                }
            }

        };


        var getIDFParam = function(header, key, delim){

            var n = header.length,
                i = 0,
                j = -1;

            for(; i < n; i++){
                j = header[i].indexOf(key);
                if(j > -1) break;
            }

            if(j > -1) return (header[i].split(delim)[1]);

        };


        //
        var parseVERP = function (txt){

           var verp = JSON.parse(txt);

           verp.deltaTime = GazeAnalytics.delta(verp.time);
           verp.velocity = GazeAnalytics.pixelVelocity(verp.pos, verp.deltaTime);

           var sigmsqr = stat.var(verp.velocity);
           verp.avgVelocity = sigmsqr.mean;
           verp.stdVelocity = Math.sqrt(sigmsqr.val);

            return verp;

        };


        var parseIDF = function (txt) {

            var indx = txt.indexOf('Time'),
                header = txt.substring(0, indx).split('\n'),
                rest = (txt.substring(indx + 1)),
                indx2 = rest.indexOf('\n'),
                tracking = rest.substring(indx2 + 1).split('\n'),
                verp = {
                    pos: [],
                    value: [],
                    time: [],
                    frmid: [],
                    info: null
                },
                n = tracking.length,
                i, j, row, p;


            p = getIDFParam(header, 'Calibration Area', ':');
            if(p) verp.calibArea = p.match(/\S+/g).map(function(d){return +d;});

            p = getIDFParam(header, 'Stimulus Dimension', ':');
            if(p) verp.stimSize = p.match(/\S+/g).map(function(d){return +d;});

            p = getIDFParam(header, 'Head Distance', ':');
            if(p) verp.headDistance = p.match(/\S+/g).map(function(d){return +d;})[0];

            verp.pixelSize = [verp.stimSize[0]/verp.calibArea[0], verp.stimSize[1]/verp.calibArea[1]];

            verp.info = header;


            j = 0;
            for (i = 0; i < n-1; i++) {

                row = tracking[i].split('\t');

                if (row.length === 0 || row === 'undefined') continue;

                verp.frmid.push(0);
                verp.time.push(+row[0]);
                p = row.splice(3, 2);
                p[0] = +p[0];
                p[1] = +p[1];
                verp.pos.push(p);
                verp.value.push(verp.pos[j++]);

            }


            verp.deltaTime = GazeAnalytics.delta(verp.time, 0.000001);
            verp.velocity = GazeAnalytics.angularVelocity(verp.pos, verp.deltaTime, verp.pixelSize, verp.headDistance);
            // verp.velocity = GazeAnalytics.spatialVelocity(verp.pos, verp.deltaTime, verp.pixelSize);
            // verp.velocity = GazeAnalytics.pixelVelocity(verp.pos, verp.deltaTime, verp.pixelSize);
            // verp.velocity = verp.deltaTime;

            //velocity(verp.pos, verp.deltaTime, verp.velocity, 0.000001);

            var sigmsqr = stat.var(verp.velocity);
            verp.avgVelocity = sigmsqr.mean;
            verp.stdVelocity = Math.sqrt(sigmsqr.val);

            //console.log(verp.velocity);
            //console.log(verp.avgVelocity);
            //console.log(verp.stdVelocity);

            calibAreaWidth  = verp.calibArea[0];
            calibAreaHeight = verp.calibArea[1];
            verp.coordXform = coordXform;

            return verp;
        };



        // Public API here
        return {
            VERP: parseVERP,
            IDF: parseIDF
        };

    });
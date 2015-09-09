'use strict';

/**
 * @ngdoc service
 * @name verpApp.parser
 * @description
 * # parser
 * Factory in the verpApp.
 */
angular.module('verpApp')
    .factory('Parser', ['GazeAnalytics', function (GazeAnalytics) {

        var calibAreaWidth, calibAreaHeight;

        var coordXform = function (d) {

            var cw = calibAreaWidth,
                ch = calibAreaHeight,
                w  = d.domainWidth,
                h  = d.domainHeight,
                tx = (w-cw) * 0.5,
                ty = (h-ch) * 0.5,
                i;

            for (i = 0; i < d.length; i++) {
                d[i][0] += tx;
                d[i][1] += ty;
            }


        };


        var getIDFParts  = function(text) {

            var indx   = text.indexOf('Time'),
                header = trimLines(text.substring(0, indx).split(/[\r\n]+/)),
                rest   = trimLines(text.substring(indx).split(/[\r\n]+/)),
                fields = (rest.splice(0,1)[0]).split('\t');

            return { header:header, fields:fields, tracking:rest  };

        };


        var trimLines = function(lines){

            var n = lines.length,
                t = [],
                s, i;

            for (i = 0; i < n; i++) {

                s = lines[i].trim();
                if(!(s === '' || s === '##')) t.push(s);

            }

            return t;

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


        var parseVERP = function (txt){

            var verp = JSON.parse(txt);

            verp.pixelSize = [ verp.stimSize[0] / verp.calibArea[0], verp.stimSize[1] / verp.calibArea[1] ];
            verp.deltaTime = GazeAnalytics.delta(verp.time);
            verp.velocity  = GazeAnalytics.pixelVelocity(verp.pos, verp.deltaTime);

            //verp.velocity  = GazeAnalytics.angularVelocity(verp.pos, verp.deltaTime, verp.pixelSize, verp.headDistance);
            //var sigmsqr = stat.var(verp.velocity);
            //verp.avgVelocity = sigmsqr.mean;
            //verp.stdVelocity = Math.sqrt(sigmsqr.val);
            //verp.pos = GazeFilter.movingMedian( verp.pos, null, 5 );

            return verp;

        };


        var parseIDF = function (txt) {

            var parts =  getIDFParts(txt),
                header  = parts.header,
                tracking = parts.tracking,
                fields = parts.fields,
                verp = {
                    pos: [],
                    value: [],
                    time: [],
                    gvec:[],
                    info: null
                },
                n = tracking.length,
                eps = 1 / 1024,
                ts = 1e-6, //timestamps are in microsecs; we convert them to secs
                ix = fields.indexOf('L POR X [px]'),
                ig = fields.indexOf('L GVEC X'),
                i, j, row, p, v;


            p = getIDFParam(header, 'Sample Rate', ':');
            if(p) verp.sampleRate = p.match(/\S+/g).map(function(d){return +d;});


            p = getIDFParam(header, 'Calibration Area', ':');
            if(p) verp.calibArea = p.match(/\S+/g).map(function(d){return +d;});

            p = getIDFParam(header, 'Stimulus Dimension', ':');
            if(p) verp.stimSize = p.match(/\S+/g).map(function(d){return +d;});

            p = getIDFParam(header, 'Head Distance', ':');
            if(p) verp.headDistance = p.match(/\S+/g).map(function(d){return +d;})[0];

            verp.pixelSize = [verp.stimSize[0]/verp.calibArea[0], verp.stimSize[1]/verp.calibArea[1]];

            verp.info = header;

            var orig = stat.vector.scalar(verp.stimSize, 0.5);

            j = 0;

            for (i = 0; i < n-1; i++) {

                row = tracking[i].split('\t');

                if (row.length === 0 || row === 'undefined') continue;

                p = [ +row[ ix ], +row[ ix + 1] ];

                //v = stat.vector.normalize([ p[0]-orig[0], p[1]-orig[1], -verp.headDistance]);

                if( Math.abs(p[0]) > eps && //exclude blinks
                    Math.abs(p[1]) > eps &&
                    ( v = stat.vector.normalize([ +row[ig], +row[ig+1], +row[ig+2] ] ) ) ){

                    verp.pos.push(p);
                    verp.gvec.push(v);
                    verp.time.push(+row[0]);
                    verp.value.push(verp.pos[j++]);

                }

            }

            verp.deltaTime = GazeAnalytics.delta( verp.time, ts );
            verp.velocity  = GazeAnalytics.angularVelocityGaze( verp.gvec, verp.time);

            // verp.velocity  = GazeAnalytics.angularVelocity(verp.pos, verp.deltaTime, verp.pixelSize, verp.headDistance);
            // verp.velocity = GazeAnalytics.spatialVelocity(verp.pos, verp.deltaTime, verp.pixelSize);
            // verp.velocity = GazeAnalytics.pixelVelocity(verp.pos, verp.deltaTime, verp.pixelSize);
            // verp.velocity = verp.deltaTime;
            // velocity(verp.pos, verp.deltaTime, verp.velocity, 0.000001);
            // var sigmsqr = stat.var(verp.velocity);
            // verp.avgVelocity = sigmsqr.mean;
            // verp.stdVelocity = Math.sqrt( sigmsqr.val );
            // console.log(verp.avgVelocity);
            // console.log(verp.stdVelocity);

            calibAreaWidth  = verp.calibArea[0];
            calibAreaHeight = verp.calibArea[1];

            verp.coordXform = coordXform;

            // verp.pos = GazeFilter.movingAverage(verp.pos, null, 5);

            return verp;

        };



        // Public API here
        return {
            VERP: parseVERP,
            IDF: parseIDF
        };

    }]);

'use strict';

/**
 * @ngdoc service
 * @name verpApp.parser
 * @description
 * # parser
 * Factory in the verpApp.
 */
angular.module('verpApp')
    .factory('Parser', function () {


        var coordXform = function (d) {

            var cw = 1680,
                ch = 1050,
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




        var delta = function(x, dx){

            if(!x) {
                console.warn('No data to take delta of');
                return;
            }

            var n = x.length, i;

            for(i = 0; i < n-1; i++){
                dx.push(x[i+1]-x[i]);
            }

            dx.push(dx[i-1]);

        };




        var velocity = function(x, t, v){

            var n = x.length,
                i = 0,
                x0, y0, x1, y1, delta;

            for(; i < n-1; i++){

                x0 = x[i][0];
                y0 = x[i][1];
                x1 = x[i+1][0];
                y1 = x[i+1][1];

                delta = Math.sqrt(x0*x0 + y0*y0 - 2*x0*x1 - 2*y0*y1 + y1*y1 + x1*x1);

                v.push(delta/(0.001*t[i]));
            }

            v.push(v[i-1]);

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

            verp.deltaTime = [];
            verp.velocity = [];
            delta(verp.time, verp.deltaTime);
            velocity(verp.pos, verp.deltaTime, verp.velocity);

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
                    deltaTime: [],
                    velocity: [],
                    frmid: [],
                    info: null
                },
                n = tracking.length,
                j = 0,
                i, row, p;


            p = getIDFParam(header, 'Calibration Area', ':');
            if(p) verp.calibArea = p.match(/\S+/g).map(function(d){return +d;});

            p = getIDFParam(header, 'Stimulus Dimension', ':');
            if(p) verp.stimSize = p.match(/\S+/g).map(function(d){return +d;});

            p = getIDFParam(header, 'Head Distance', ':');
            if(p) verp.headDistance = p.match(/\S+/g).map(function(d){return +d;})[0];

            verp.pixelSize = [verp.stimSize[0]/verp.calibArea[0], verp.stimSize[1]/verp.calibArea[1]]

            verp.info = header;

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


            delta(verp.time, verp.deltaTime);
            velocity(verp.pos, verp.deltaTime, verp.velocity);

            console.log(stat.mean(verp.velocity));
            console.log(stat.std(verp.velocity));

            verp.pos.coordXform = coordXform;

            return verp;
        };


        // Public API here
        return {
            VERP: parseVERP,
            IDF: parseIDF
        };


    });

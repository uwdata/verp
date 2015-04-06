/*
 *
 * File  : mask.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : 
 *
 * 	Example: 
 *
 * Date    : Mon Jan  5 00:44:44 2015
 *
 */
var mask = function() {

    var width = 256,
        height = 256,
        xScale = d3.scale.linear()
            .domain([0, width])
            .range([0, width]),
        yScale =  d3.scale.linear()
            .domain([0, height])
            .range([0, height]),
        canvas, canvasoff, ctx, ctxoff, img, imgdata;

    function _mask(s,d){


        canvas = s.append('canvas')
            .attr('width', width)
            .attr('height',height)
            .node();

        ctx = canvas.getContext('2d');
        canvasoff = document.createElement('canvas');
        canvasoff.width = width;
        canvasoff.height= height;
        ctxoff = canvasoff.getContext('2d');
        img = new Image();


    }


    function initImg() {

        var i, r, g, b, a, d;


        d = imgdata.data;

        for (i = 0 ; i < d.length; i += 4){
            r = 50;//Math.round(rgb.r);
            g = 50;//Math.round(rgb.g);
            b = 50;//Math.round(rgb.b);
            a = 255 - d[i+3];

            d[i] = r;
            d[i+1] = g;
            d[i+2] = b;
            d[i+3] = a;

        }
    }


    function draw(){

        var dx = xScale.domain(),
            rx = xScale.range(),
            dy = yScale.domain(),
            ry = yScale.range();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(canvasoff,
            (dx[0]),
            (dy[0]),
            (dx[1] - dx[0]),
            (dy[1] - dy[0]),
            (rx[0]),
            (ry[0]),
            (rx[1] - rx[0]),
            (ry[1] - ry[0]));

    }


    function updateBinding(d){

        //console.log('update mask binding');

        img.onload = function() {
            //console.log(img.width, img.height);
            ctxoff.clearRect(0, 0, canvasoff.width, canvasoff.height);
            ctxoff.drawImage(img, 0, 0);//, img.width, img.height);
            imgdata = ctxoff.getImageData(0, 0, img.width, img.height);
            initImg();
            ctxoff.putImageData(imgdata,0,0);
            draw();
        };

        img.src  = d;
    }

    _mask.update = function(d){

        if(d)
            updateBinding(d);
        else
            draw();

    };

    _mask.width = function(_){

        if(!arguments.length) return width;

        width = _;

        xScale.range([0,width]);

        return _mask;

    };


    _mask.height = function(_){

        if(!arguments.length) return height;

        height = _;
        yScale.range([0, height]);


        return _mask;

    };






    _mask.xScale = function(_){


        if(!arguments.length) return xScale;

        xScale = _;

        return  _mask;



    };


    _mask.yScale = function(_){

        if(!arguments.length) return yScale;

        yScale = _;

        return  _mask;

    };



    return _mask;

};



/*
 *
 * File  : intensity.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : 
 *
 * 	Example: 
 *
 * Date    : Mon Jan  5 00:44:44 2015
 *
 */
stat.intensity = function() {

    var width = 256,
        height = 256,
        canvasWidth = width,
        canvasHeight = height,
        xscale = d3.scale.linear()
            .domain([0, width])
            .range([0, canvasWidth]),
        yscale =  d3.scale.linear()
            .domain([0, height])
            .range([0, canvasHeight]),
        gray = ['#000', '#eee'],
        colormap = d3.scale.linear()
            .range(gray),
        canvas, ctx, img,  ext;


    function intensity(s,v){


        canvas = s.append('canvas')
            .attr('width', canvasWidth)
            .attr('height',canvasHeight).node();

        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        img = ctx.createImageData(width, height);

        //console.log(img);
        initImg(s.datum());
        ctx.putImageData(img,0,0);
        draw();
    }


    function initImg(d) {

        var n = width*height,
            i = 0,
            j = 0,
            a = 255,
            rgb, r, g, b;

        ext = stat.extrama(d);
        colormap.domain([ext.min, ext.max]);

        var imgdata = img.data;

        //copy data to img
        for ( ; i < n; i++, j += 4 ) {

            rgb = d3.rgb(colormap(d[i]));

            r = Math.round(rgb.r);
            g = Math.round(rgb.g);
            b = Math.round(rgb.b);

            imgdata[j] = r;
            imgdata[j+1] = g;
            imgdata[j+2] = b;
            imgdata[j+3] = a;


        }
    }


    function draw(){

        var dx = xscale.domain(),
            rx = xscale.range(),
            dy = yscale.domain(),
            ry = yscale.range();

        ctx.drawImage(canvas,
            (dx[0]),
            (dy[0]),
            (dx[1] - dx[0]),
            (dy[1] - dy[0]),
            (rx[0]),
            (ry[0]),
            (rx[1] - rx[0]),
            (ry[1] - ry[0]));

    }


    intensity.width = function(_){

        if(!arguments.length) return width;

        width = _;

        xscale.domain([0,width]);

        return intensity;

    };


    intensity.height = function(_){

        if(!arguments.length) return height;

        height = _;

        yscale.domain([0,height]);

        return intensity;

    };



    intensity.canvasWidth = function(_){

        if(!arguments.length) return canvasWidth;

        canvasWidth = _;

        xscale.range([0, canvasWidth]);

        return intensity;

    };


    intensity.canvasHeight= function(_){

        if(!arguments.length) return canvasHeight;

        canvasHeight = _;

        yscale.range([0, canvasHeight]);

        return intensity;

    };




    return intensity;

};



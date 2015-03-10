/*
 *
 * File  : text.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : 
 *
 * 	Example: 
 *
 * Date    : Mon Jan  5 00:44:44 2015
 *
 */

var text = function(){

    var width = 256,
        height = 256,
        xscale = d3.scale.linear()
            .domain([0, width])
            .range([0, width]),
        yscale =  d3.scale.linear()
            .domain([0, height])
            .range([0, height]),
        svg, svgtext;


    function _text(s, d){

        svg = s.append('svg')
            .attr('width', width)
            .attr('height', height)
            .data(d)
            .enter()
            .append('text');

        draw();


    }

    function joinAndUpdate(d){

        //update selection
        var s = svg.selectAll('text')
            .data(d);

        s.enter()
            .append('text');
        s.exit()
            .remove();


    }




    function draw(){

        svg.selectAll('text')
            .attr('x', function(d){ return xscale(d.pos[0]);})
            .attr('y', function(d){ return yscale(d.pos[1]);})
            .text(function(d){return d.text;});


    }

    _text.update = function(_){

        if(arguments.length) {
            joinAndUpdate(_);
            draw();
        } else {
            draw();
        }

    };



    _text.width = function(_){

        if(!arguments.length) return width;

        width = _;

        xscale.domain([0,width]);

        return _text;

    };


    _text.height = function(_){

        if(!arguments.length) return height;

        height = _;

        yscale.domain([0,height]);

        return  _text;

    };



    _text.xScale = function(_){


        if(!arguments.length) return height;

        height = _;

        yscale.domain([0,height]);

        return  _text;



    };



    _text.yScale = function(_){

        if(!arguments.length) return height;

        height = _;

        yscale.domain([0,height]);

        return  _text;

    };


    return _text;

};



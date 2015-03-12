/*
 *
 * File  : circle.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  :
 *
 * 	Example:
 *
 * Date    : Mon Jan  5 00:44:44 2015
 *
 */

var circle = function(){

    var width = 256,
        height = 256,
        xScale = d3.scale.linear()
            .domain([0, width])
            .range([0, width]),
        yScale =  d3.scale.linear()
            .domain([0, height])
            .range([0, height]),
        color =  d3.scale.category10(),
        svg;


    function _circle(s, d){

        svg = s.append('svg')
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('circle')
            .data(d)
            .enter()
            .append('circle');

        draw();

    }

    function updateBinding(d){

        //update selection
        var s = svg.selectAll('circle')
            .data(d);

        s.enter()
            .append('circle');

        s.exit()
            .remove();

    }


    function draw(){

        svg.selectAll('circle')
            .attr('cx', function(d){ return xScale(d.pos[0]);})
            .attr('cy', function(d){ return yScale(d.pos[1]);})
            .attr('r', 20)
            .style('fill', function(d,i){return color(i);})

    }

    _circle.update = function(_){

        if(arguments.length) {
            updateBinding(_);
            draw();
        } else {
            draw();
        }

    };


    _circle.width = function(_){

        if(!arguments.length) return width;

        width = _;

        return _circle;

    };


    _circle.height = function(_){

        if(!arguments.length) return height;

        height = _;

        return  _circle;

    };


    _circle.xScale = function(_){


        if(!arguments.length) return xScale;

        xScale = _;

        return  _circle;



    };



    _circle.yScale = function(_){

        if(!arguments.length) return yScale;

        yScale = _;

        return  _circle;

    };


    return _circle;

};



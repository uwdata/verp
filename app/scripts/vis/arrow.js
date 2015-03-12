/*
 *
 * File  : arrow.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  :
 *
 * 	Example:
 *
 * Date    : Mon Jan  5 00:44:44 2015
 *
 */

var arrow = function(){

    var width = 256,
        height = 256,
        xScale = d3.scale.linear()
            .domain([0, width])
            .range([0, width]),
        yScale =  d3.scale.linear()
            .domain([0, height])
            .range([0, height]),
        color =  d3.scale.category10(),
        svg, path;


    function _arrow(s, d){


        svg = s.append('svg')
            .attr('width', width)
            .attr('height', height);


        //define an arrow head  marker
        svg.append('defs')
            .append('marker')
            .attr('id',"arrowhead")
            .attr('viewBox',"0 0 10 10")
            .attr('refX',20)
            .attr('refY',5)
            .attr('markerWidth',3)
            .attr('markerHeight',3)
            .attr('orient','auto')
            .append('path')
            .attr('d','M 0 0 L 10 5 L 0 10 z');

        path = svg.append('g');


        path.selectAll('path')
            .data(d)
            .enter()
            .append('path');

        draw();



    }

    function updateBinding(d){

        //update selection
        var s = path.selectAll('path')
            .data(d);

        s.enter()
            .append('path');

        s.exit()
            .remove();

    }


    function draw(){

        path.selectAll('path')
            .attr('d', function(d){
                return 'M '+ xScale(d.src[0]) + ' ' + yScale(d.src[1])
                    + ' L' + xScale(d.target[0]) + ' ' +yScale(d.target[1]);})
            .attr('class', 'arrow')
            .style('stroke', function(d,i){return color(i);});

    }

    _arrow.update = function(_){

        if(arguments.length) {
            updateBinding(_);
            draw();
        } else {
            draw();
        }

    };


    _arrow.width = function(_){

        if(!arguments.length) return width;

        width = _;

        return _arrow;

    };


    _arrow.height = function(_){

        if(!arguments.length) return height;

        height = _;

        return  _arrow;

    };


    _arrow.xScale = function(_){


        if(!arguments.length) return xScale;

        xScale = _;

        return  _arrow;



    };



    _arrow.yScale = function(_){

        if(!arguments.length) return yScale;

        yScale = _;

        return  _arrow;

    };


    return _arrow;

};



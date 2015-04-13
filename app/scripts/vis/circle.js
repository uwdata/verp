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
      //color = d3.scale.category10(),
        color = d3.scale.linear()
            .range([
             '#a50026',
            '#d73027',
            '#f46d43',
            '#fdae61',
            '#fee090',
            '#ffffbf',
            '#e0f3f8',
            '#abd9e9',
            '#74add1',
            '#4575b4',
            '#313695'].reverse())
            .clamp(true),
          listeners=[],
          tooltip, svg, div;


    function _circle(s, d){


        svg = s.append('svg')
            .attr('width', width)
            .attr('height', height);



        var n = d.length-1;

        color.domain(d3.range(0, n + n/10, n/10));

        var cg = svg.selectAll('.circle')
            .data(d)
            .enter()
            .append('g')
            .attr('class', 'circle');

        appendListeners(cg);

        cg.append('circle');
        cg.append('text');

        draw();
    }


    function updateBinding(d){

        //update color binding
        var n = d.length-1;
         color.domain(d3.range(0, n + n/10, n/10));

        //update selection
        var s = svg.selectAll('.circle')
            .data(d);

        //enter new circles
        var cg = s.enter()
            .append('g')
            .attr('class', 'circle');

        appendListeners(cg);

        //new circles
        cg.append('circle');

        //new labels
        cg.append('text');

        //remove unbound
        s.exit()
            .remove();

    }


    function draw(){

        var cg = svg.selectAll('.circle')
            .attr('transform', function(d){
                return 'translate('+ xScale(d.pos[0]) +',' + yScale(d.pos[1]) + ')';
            });
        cg.select('circle')
            .attr('r', 20)
            .style('fill', function(d,i){return color(i);})
            .style('opacity', 1)
            .style('stroke', 'black')
            .style('stroke-width', '2');

        cg.select('text')
            .text(function(d){return d.label;});

    }


    function appendTooltip(s){

        //if(tooltip) s.attr('svg:title', function(d,i){return tooltip[i];});

       //if(tooltip)  s.on('click', function(d,i){
       //
       //   div.style('top', event.pageY+ 'px')
       //       .style('left', event.pageX+ 'px')
       //       .style('visibility', 'visible')
       //       .text(tooltip[i])
       //
       //})
       //    .on('mouseout', function(d,i){
       //        div.style('visibility', 'hidden');
       //    });

    }

    function appendListeners(s){

        for (var event in listeners)
            if (listeners.hasOwnProperty(event))
                s.on(event+'.ext', listeners[event]);
        //s.on('click', function(d,i){d3.select(this).attr('stroke', 'red'); });

    }



    _circle.update = function(_){

        if(arguments.length) {
            updateBinding(_);
            draw();
        } else {
            draw();
        }

    };



    _circle.tooltip = function(_){

        if(!arguments.length) return tooltip;

        tooltip = _;

        return _circle;

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


    _circle.on  = function(event, handler){

        if(arguments.length === 0)
            return listeners;
        else if(arguments.length === 1)
            return listeners[event];

        listeners[event] = handler;

        return _circle;

    };

    return _circle;

};



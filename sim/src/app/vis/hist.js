/*
 *
 * File  : hist.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  :
 *
 * 	Example:
 *
 * Date    : Mon Jan  5 00:44:44 2015
 *
 */

var hist = function(){

  var   margin = {left:20, right:20, top:0, bottom:20},
    padding = {left:0,  right:0, top:0, bottom:0},
    outerWidth = 256,
    outerHeight = 128,
    numBins = 20,
    animate = true,
    hasbrush= false,
    listeners = [],
    brush = d3.svg.brush().on('brush', brushed),
    brushRange =[0,1], //brush extent
    innerWidth, innerHeight, width, height, xAxis, xScale, dx, yScale, svg, groot, cg;


  function _hist(s, data){

    var el = s.node(),
      d = init(data);


    if( el instanceof SVGElement &&
      ( el.tagName === 'svg' ||
      el.tagName === 'g' ) ){

      svg = s;

    } else {

      svg = s.append('svg')
        .attr('width', outerWidth)
        .attr('height', outerHeight)
        .attr('class', 'hist-svg');

    }


    groot = svg.append('g')
      .attr('class', 'hist-g-root')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var cg = groot.selectAll(".hist-bar")
      .data(d)
      .enter()
      .append("g")
      .attr("class", "hist-bar");

    cg.append("rect")
      .attr("class", "hist-bar-rect");

    cg.append("text")
      .attr('class','hist-bar-text');


    appendListeners(cg);

    groot.append("g")
      .attr("class", "hist-brush");

    groot.append("g")
      .attr("class", "x axis");

    draw();

  }

  function key(d, i){
    return i;
  }

  function init(data){

    resize();

    var min = d3.min(data),
      max = d3.max(data),
      histData;

    xScale = d3.scale.linear()
      .domain([min, max])
      .range([0, width]);

    brushRange[0] = 0.75 * min + 0.25 * max;
    brushRange[1] = 0.25 * min + 0.75 * max;

    brush.x(xScale);

    xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom");

    histData  = d3.layout.histogram()
      .bins(xScale.ticks(numBins))(data);


    yScale = d3.scale.linear()
      .domain([0, d3.max(histData, function(d) { return d.y; })])
      .range([height, 0]);

    return histData;

  }

  function resize() {

    innerWidth = outerWidth - margin.left - margin.right;
    innerHeight = outerHeight - margin.top - margin.bottom;
    width = innerWidth - padding.left - padding.right;
    height = innerHeight - padding.top - padding.bottom;

  }



  function updateBinding(data){

    var d = init(data);

    //update selection
    var s = groot.selectAll('.hist-bar')
      .data(d, key);


    //enter new hists
    var es = s.enter()
      .append('g')
      .attr('class', 'hist-bar');

    es.append('rect')
      .attr('class', 'hist-bar-rect');

    es.append("text")
      .attr('class','hist-bar-text');


    appendListeners(es);

    //remove unbound
    s.exit()
      .remove();


  }


  function draw(){

    cg = groot.selectAll('.hist-bar');

    if(animate)
      cg.transition().duration(1000)
        .attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });
    else
      cg.attr("transform", function(d) { return "translate(" + xScale(d.x) + "," + yScale(d.y) + ")"; });

    cg.select('.hist-bar-rect')
      .attr("x", 1)
      .attr("width", function(d) { return  xScale(d .x + d.dx ) - xScale(d.x) - 1; })
      .attr("height", function(d) { return height - yScale(d.y); });


    cg.select('.hist-bar-text')
      .attr("dy", ".75em")
      .attr("y", 3)
      .attr("x", function(d){return  (xScale(d.x + d.dx ) - xScale(d.x) ) / 2; } )
      .attr("text-anchor", "middle")
      .text( function(d) { return d3.format(",.0f")(d.y); } );


    //.transition().duration(1000)
    groot.select('.hist-brush')
      .call(brush.extent(brushRange))
      .selectAll("rect")
      .attr("y", -6)
      .attr("height", height + 7);

    groot.select('.x.axis')
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  }


  function brushed(){

    brushRange = brush.extent();

    if(listeners.brush)  listeners.brush('brush', brush.extent());

  }


  function appendListeners(s){

    for (var event in listeners)
      if (listeners.hasOwnProperty(event))
        if (! (event  === 'brush') ) s.on(event +'.ext', listeners[event]);

  }


  _hist.on = function(event, handler){

    if(arguments.length === 0)
      return listeners;
    else if(arguments.length === 1)
      return listeners[event];

    listeners[event] = handler;

    return _hist;

  };

  _hist.update = function(_){

    if(arguments.length) {
      updateBinding(_);
      draw();
    } else {
      draw();
    }

  };


  _hist.hide = function(){

    groot.classed('hidden', true);

    return _hist;

  };


  _hist.show = function(){

    groot.classed('hidden', false);

    return _hist;

  };

  _hist.numBins = function(_){

    if(!arguments.length) return numBins;

    numBins = _;

    return _hist;

  };




  _hist.tooltip = function(_){

    if(!arguments.length) return tooltip;

    tooltip = _;

    return _hist;

  };



  _hist.width = function(_){

    if(!arguments.length) return outerWidth;

    outerWidth = _;

    return _hist;

  };


  _hist.height = function(_){

    if(!arguments.length) return outerHeight;

    outerHeight = _;

    return  _hist;

  };

  _hist.fillScale  = function(_){

    //TBI

    //if(!arguments.length) return fill;

    //fill= _;

    return  _hist;



  };

  _hist.brushRange = function(_){

    if(!arguments.length) return brushRange;

    brushRange = _;

    return  _hist;

  };


  _hist.xScale = function(_){


    if(!arguments.length) return xScale;

    xScale = _;

    return  _hist;



  };



  _hist.yScale = function(_){

    if(!arguments.length) return yScale;

    yScale = _;

    return  _hist;

  };


  _hist.clearVisSelect = function(){

    svg.selectAll('.hist')
      .classed('deselected', false);

    return _hist;

  };

  // Exclusive visual selection---in contrast to d3 selection--of shapes
  // assumes indices in _ are sorted in ascending order
  _hist.visSelect = function(_){

    var j = 0,
      n = _.length;

    if( ! n ) return _hist.clearVisSelect();

    svg.selectAll('.hist')
      .classed('deselected', function( d, i ) {

        return ( (j < n) && ( i  === _[j])) ? !(++j) : true;

      });

    return _hist;

  };



  _hist.on  = function(event, handler){

    if(arguments.length === 0)
      return listeners;
    else if(arguments.length === 1)
      return listeners[event];

    listeners[event] = handler;

    return _hist;

  };

  _hist.transform = function(_){

    if(!arguments.length) return groot.attr('transform');

    groot.attr('transform',_);

    return _hist;

  };

  _hist.fontSize= function(_){

    if(!arguments.length) return fontSize;

    fontSize= _;

    return  _hist;

  };





  return _hist;

};



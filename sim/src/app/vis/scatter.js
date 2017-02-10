import * as d3 from "d3";
import './scatter.css';

export var scatter = function(){

  var shape = 'circle',
    shapeFunctions  = {circle:appendCircle, square:appendSquare},
    listeners = {
      bg:{ any:[] },
      shape: { any:[]},
      axis: { any:[]}
    },
    dirty={axis:false, scale:false, color:false},
    every = 4,
    throttle=0,
    animate = false,
    brush = false,
    margin =  {top:0,  left:0, bottom:0, right:0},
    padding = {top:20, left:30, bottom:30, right:20},
    outerWidth = 512,
    outerHeight = 512,
    xScale = d3.scaleLinear(),
    yScale = d3.scaleLinear(),
    brushInteractor,
    innerWidth, innerHeight, width, height,
    xAxis, yAxis, stroke, strokeWidth, fill, shapeScale, svg, groot,
    cg, bg, axisxg, axisyg, brushg;

  function _scatter(node, d){

    init(node, d);

    draw();

  }

  function init(node, d){

    var s = node instanceof d3.selection ? node : d3.select(node),
      el = s.node();

    //default to width & height from the parent node
    updateSize();
    initScales();

    if( el instanceof SVGElement &&
      ( el.tagName === 'svg' || el.tagName === 'g' ) ){
      svg = s;
    } else {
      svg = s.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'scatter-svg');
    }

    groot = svg.append('g')
      .attr('class', 'scatter-g-root')
      .attr("transform", "translate(" + padding.left + "," +padding.top + ")");

    //bg layer
    bg = groot.append('g')
      .attr('class', 'scatter-bg')
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'white')
      .on('click', function(){
        const mouseXY = d3.mouse(this),
          dataXY = [ ~~xScale.invert(mouseXY[0]), ~~yScale.invert(mouseXY[1]) ];
        notifyListeners('bg','click',dataXY) })
      .call(d3.drag().on('drag',
        function(){
          const mouseXY = d3.mouse(this),
            dataXY = [ ~~xScale.invert(mouseXY[0]), ~~yScale.invert(mouseXY[1]) ];
          ++throttle;
          if ( ! (throttle %= every) )
            notifyListeners('bg','drag',dataXY)
        })
      );

    //axis-x layer
    axisxg = groot.append('g')
      .attr('class', 'x-axis bottom')
      .attr('transform', 'translate(0,'+ height+')');

    //axis-y layer
    axisyg = groot.append('g')
      .attr('class', 'y-axis left');

    //shape (mark) layer
    cg = groot.selectAll('.g-shape')
      .data(d, key)
      .enter()
      .append('g')
      .attr('class', 'g-shape');

    //appendListeners(cg);
    cg.each(shapeFunctions[shape]);


    //add brush layer
    if (brush) addBrush();

  }

  function addBrush(){

    brushInteractor = d3.brush()
      .on("start brush", handleBrush)
      .extent([ [0, 0], [width,height] ]);

    brushg = groot.append('g')
      .attr('class', 'brush')
      .call(brushInteractor);


  }

  function handleBrush(){

    let s = [];

    groot.selectAll('.g-shape')
      .classed('ghost', function(d,i){

        let f = isOutsideBrushedRegion(d) ;

        if( f === -1 )  s.push(i);

        return f === 1;

      });

    notifyListeners('shape', 'brush', s);

  }

  // 1: outside
  // 0: empty brush selection
  //-1: inside
  function isOutsideBrushedRegion(d){
    var s = d3.event.selection,
      x0 = s[0][0],
      y0 = s[0][1],
      x1 = s[1][0],
      y1 = s[1][1];

    return  (x1-x0 && y1-y0) ?
      xScale(d[0]) < x0 || xScale(d[0]) > x1 ||  yScale(d[1]) < y0  ||  yScale(d[1]) > y1 ?
        1 :
        -1 :
      0;
  }

  //join key
  function key(d,i){
    return d.key ? d.key : i;
  }

  function updateBinding(d) {

    //update selection
    var s = groot.selectAll('.g-shape')
      .data(d, key);

    //enter new scatters
    var es = s.enter()
      .append('g')
      .attr('class', 'g-shape');

    //appendListeners(es);
    es.each(shapeFunctions[shape]);

    //remove unbound
    s.exit()
      .remove();

  }

  function updateSize(){

    innerWidth = outerWidth - margin.left - margin.right;
    innerHeight = outerHeight - margin.top - margin.bottom;
    width = innerWidth - padding.left - padding.right;
    height = innerHeight - padding.top - padding.bottom;

  }

  function updateAxis() {

    axisxg.call(xAxis);
    axisyg.call(yAxis);

    dirty.scale= false;

  }

  function updateShapeColor(){

    // var n = groot.selectAll('.g-shape').length();
    // fill.domain(d3.range(n));

  }

  function initScales(){

    xScale.range([ 0, width ]);
    yScale.range([ height, 0 ]);

    stroke = d3.scaleOrdinal().range(['black']);
    strokeWidth = d3.scaleOrdinal().range([2]);
    // fill = d3.scaleOrdinal().range(['coral']);
    fill = d3.scaleLinear().range(['white', 'black']);
    shapeScale =  d3.scaleOrdinal().range([10]);

    xAxis = d3.axisBottom(xScale);
    yAxis = d3.axisLeft(yScale);

  }


  function draw() {

    if(dirty.scale) updateAxis();

    cg = groot.selectAll('.g-shape');

    if(animate)
      cg.transition().duration(1000)
        .attr('transform', function (d, i) {
          return 'translate(' +  xScale(d[0]) + ',' + yScale(d[1]) + ') scale('+ shapeScale(i) + ')';
        });
    else
      cg.attr('transform', function (d, i) {
        return 'translate(' +  xScale(d[0]) + ',' + yScale(d[1]) + ') scale('+ shapeScale(i) + ')';
      });

    cg.select('.shape')
      .style('fill', function(d,i){ return fill(i);})
      .style('stroke', function (d, i) { return stroke(i); } )
      .style('stroke-width', function(d,i){ return strokeWidth(i)/shapeScale(i); });
  }

  function appendCircle (d,i){

    return d3.select(this)
      .append('circle')
      .attr('class','shape')
      .attr('r', 1);

  }


  function appendSquare(d,i){

    return d3.select(this)
      .append('rect')
      .attr('class','shape')
      .attr('width', 2)
      .attr('height', 2)
      .attr('transform', ' translate(-1,-1)');

  }

  function appendListeners(s){

    for (var event in listeners)
      if (listeners.hasOwnProperty(event))
        s.on( event +'.ext', listeners[event] );

  }


  _scatter.update = function(_){

    if(arguments.length) {
      updateBinding(_);
      draw();
    } else {
      draw();
    }

  };

  _scatter.width = function(_){

    if(!arguments.length) return outerWidth;

    outerWidth = _;

    return _scatter;

  };


  _scatter.height = function(_){

    if(!arguments.length) return outerHeight;

    outerHeight = _;


    return  _scatter;

  };


  _scatter.xScale = function(_){

    if(!arguments.length) return xScale;

    xScale = _;

    dirty.scale=true;

    return  _scatter;

  };

  _scatter.yScale = function(_){

    if(!arguments.length) return yScale;

    yScale = _;

    dirty.scale=true;

    return  _scatter;

  };


  _scatter.transform = function(_){

    if(! arguments.length) return rootg.attr('transform');

    rootg.attr('transform', _ );

    return _scatter;

  };

  _scatter.shape = function(_){

    if(! arguments.length) return shape;

    shape = _;

    return _scatter;
  };

  _scatter.on = function(event, handler){

    if(arguments.length === 0)
      return listeners;
    else if(arguments.length === 1)
      return listeners[event];

    listeners[event] = handler;

    return _scatter;

  };


  _scatter.fillScale = function(_){

    if(! arguments.length )  return fill;

    fill = _;

    dirty.color = true;

    return _scatter;
  };


  _scatter.root = function(){

    return groot;

  };


  _scatter.removeClass = function(c, f){

    if (arguments.length === 1)  cg.classed(c, false);
    else if (arguments.length === 2)  cg.classed(c, f);

    return _scatter;
  };

  _scatter.animate = function(_) {

    if(! arguments.length )  return animate;

    animate = _;
    return _scatter;

  };


  _scatter.registerListener = function(layer, type, fn, context) {

    layer = layer || 'bg';
    type = type || 'any';
    fn = typeof fn === 'function' ? fn : context[fn];

    if (typeof listeners[layer][type] === "undefined") listeners[layer][type] = [];

    listeners[layer][type].push( { fn: fn, context: context || this } );


    return _scatter;
  };


  _scatter.removeListener =  function(layer, type, fn, context) {

    var pubtype = type || 'any',
      publayer = layer || 'bg',
      llist  = listeners[publayer][pubtype],
      n = llist ? llist.length : 0,
      i;
    for (i = 0; i < n; i++ )
      if (llist[i].fn === fn &&
        llist[i].context === context) llist.splice(i, 1);

    return _scatter;
  };

  _scatter.brush = function (f){

    console.log('setting brush to ', f);

    if(! arguments.length )  return brush;

    if(brush === f ) return _scatter;

    brush = f;

    if(!brush && brushg) {

      brushg.style('display','none');

    } else if(brush) {

      if(brushg)
        brushg.style('display', 'block');
      else if(svg)
        addBrush();

    }

    return _scatter;

  };


  function notifyListeners(layer, type, data) {


    var pubtype = type || 'any',
      publayer = layer || 'bg',
      llist =listeners[publayer][pubtype],
      n = llist ? llist.length : 0,
      i;

    for ( i = 0; i < n; i++ )
      llist[i].fn.call(llist[i].context, data);

  }

  return _scatter;

};


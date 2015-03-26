/*
 *
 * File  : scatter.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : Scatter plot.
 *
 * Date    : Sat May  3 23:13:43 2014
 * Modified: $Id$
 *
 */


function Scatter(data, div, cp) {

    this.init(div,cp);
    this.update(data, cp.k);
    //this.tooltip();

}


Scatter.prototype.init = function(div, cp){

    var dp = this.defaults(); // default properties
    this.p_ =  utils.merge(dp,cp); // left merged w/ user-defined props
    this.p_.color = d3.scale.category10();
    this.div_ = div;
    this.id_ = cp.id;
    this.interacts_ = {};

    //create the root svg node
    this.svg_= d3.select(div)
        .append('svg')
        .attr('width',cp.width)
        .attr('height',cp.height);


};


Scatter.prototype.updateAxes = function(xs, ys){

    var p = this.p_,
        x = xs(),
        y = ys(),
        sx = p.scale.x,
        sy = p.scale.y,
        k = this.p_.k;


    this.svg_.selectAll('.shape')
        .attr('transform', function(d,i){
            return 'translate('+x(d[k.x]) + ',' + y(d[k.y]) + ')' +
                'scale(' + sx + ',' + sy + ')';
        })
};


Scatter.prototype.updateScale = function(data, key) {


    var k = key || this.p_.k,
        p = this.p_,
        w = p.width  - (p.margin.right + p.margin.left),
        h = p.height - (p.margin.bottom + p.margin.top),
        dw = data.domainWidth  || w,
        dh = data.domainHeight || h,
        rx,
        ry,
        ar;

    if(p.axis.type === 'identity') {

        p.axis.x = d3.scale.identity();
        p.axis.y = d3.scale.identity();

    }else if(p.axis.type === 'fixed') {

        p.axis.x = d3.scale
            .linear()
            .domain([0, dw])
            .range([p.margin.left, p.margin.left + w]);

        p.axis.y = d3.scale
            .linear()
            .domain([0, dh])
            .range([p.margin.top, p.margin.top + h]);

    } else { //adaptive

        rx = utils.minmax(data, k.x);
        ry = utils.minmax(data, k.y);
        ar = (rx[1] - rx[0]) / (ry[1] - ry[0]);
        w = ~~(ar < 1 ? w * ar : w);
        h = ~~(ar > 1 ? h / ar : h);

        p.axis.x = d3.scale.linear().domain(rx).range([p.margin.left, p.margin.left + w]);
        p.axis.y = d3.scale.linear().domain(ry).range([p.margin.top, h + p.margin.top]);

    }

};


Scatter.prototype.update = function(data, key){

    var k = key || this.p_.k;

    this.updateScale(data,k);

    this.highlighted_ =
        Array.apply(null, new Array(data.length))
            .map(Number.prototype.valueOf,0);

    var p = this.p_,
        x = p.axis.x,
        y = p.axis.y,
        sx = p.scale.x,
        sy = p.scale.y,
        drawfn = p.drawfn,
        c = this.svg_.selectAll('.shape')
            .data(data); //join



    //update
    c.transition().duration(1000)
        .attr('transform', function(d,i){
            return 'translate('+x(d[k.x]) + ',' + y(d[k.y]) + ') ' +
                'scale(' + sx + ',' + sy + ')';
        })
        .style('opacity',1);

    c.enter()//create
        .append('g')
        .attr('class', 'shape')
        .attr('transform', function(d,i){
            return 'translate('+x(d[k.x]) + ',' + y(d[k.y]) + ') ' +
                'scale(' + sx + ',' + sy + ')';
        })
        .each(appendShape)
        .transition()
        .duration(1000)
        .style('opacity',1);

    //delete
    c.exit()
        .transition()
        .style('opacity',0.2)
        .remove();

    function appendShape(d,i){
        return drawfn(d3.select(this),p)
            .attr('class', 'circle');



    }

};

Scatter.prototype.markerSize = function(s){

    if(!arguments.length) return this.p_.markerSize;

    //     console.log('updating the marker size to ', s)
    if(this.p_.markerSize!==s){
        this.p_.markerSize = s;

        d3.selectAll('.circle').attr('r',s);
    }

};

Scatter.prototype.defaults = function(){
    return {
        width:128,
        height:128,
        margin: {top:0, bottom:0, left:0, right:0},
        axis:{x:null, y:null, type:'fixed'},
        scale:{x:1, y:1},
        markerSize:10,
        drawfn:function(s,p){
            return s.append('circle')
                .attr('r', p.markerSize);
        },
        k:{x:'X', y:'Y'}
    };

};


Scatter.prototype.interaction = function(e, f, frevert){
    var interacts = this.interacts_;
    if(interacts[e] === undefined)  interacts[e]=[];
    interacts[e].push({on:f, off:frevert});
};



Scatter.prototype.ghost = function(indx,f){

    var shapes = this.svg_.selectAll('.shape');

    if(arguments.length === 2){
        shapes.classed('ghost',
            function (d, i){
                return f(indx,i);
            });
    } else {
        shapes.classed('ghost',
            function (d, i){
                return indx !== i ;
            });
    }
};


Scatter.prototype.visibility = function(indx){

    this.svg_.selectAll('.shape')
        .classed('hidden',
        function (d, i){

            return indx[i] === 0;
        });

};

Scatter.prototype.tooltip  = function(){

    var ttwidth = 150,
        ttheight = 50;


    this.tooltip_ = d3.select(this.div_)
        .append('div')
        .attr('id', 'tooltip') //move style to CSS
        .style("position", "absolute")
        .style("white-space", "nowrap")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background-color","white")
        .style("border","1px solid #999")
        .style('border-radius','5px')
        .style("padding","1px")
        .style("font-size", "13px")
        .style("font-family",'"Helvetica"')
        .style("-mox-box-shadow","2px 2px 11px #666")
        .style("-webkit-box-shadow","2px 2px 11px #666");

    this.tooltipshape_= d3.select('#tooltip')
        .append('svg')
        .attr('width',ttwidth)
        .attr('height',ttheight)
        .append('g');

    this.tooltiptext_= this.tooltipshape_.append('text');

    //  .on("mousemove", function(){
    //        this.tooltip_.style("top", (event.pageY+5)+"px").style("left",(event.pageX+8)+"px");
    //        this.tooltiptext_.text('Patient ID: ' + this.id_[i]);
    //})
    //    .on("mouseout",function(){
    //        this.tooltip_.style("visibility", "hidden");
    //        d3.select(this).style("stroke","none");
    //    });


};

Scatter.prototype.hide = function(indx,f){

    var shapes = this.svg_.selectAll('.shape');

    if(arguments.length === 2){
        shapes.classed('gray',
            function (d, i){
                return f(indx,i);
            });
    } else {
        shapes.classed('gray',
            function (d, i){
                return indx !== i ;
            });
    }
};


Scatter.prototype.resetHighlight = function() {

    var h = this.highlighted_;
    this.svg_
        .selectAll('.shape')
        .classed('ghost',
        function (d, i) {
            h[i] = 0;
            return false;
        });

    return h;

};



Scatter.prototype.condHighlight = function(cond) {


    var h = this.highlighted_, v;

    this.svg_
        .selectAll('.shape')
        .classed('ghost',
        function (d, i) {
            v =  cond(d, i);
            h[i] = v ? 1 : 0;
            return !v;
        });


    return h;

};




Scatter.prototype.highlight = function(s){

    var h = this.highlighted_;

    this.svg_
        .selectAll('.shape')
        .classed('ghost',
        function (d, i) {
            return !(h[i] = s[i]);
        });


    return h;

};




Scatter.prototype.on = function(e) {

    var shapes = this.svg_.selectAll('.shape'),
        interacts = this.interacts_,
        n = interacts['hover'].length;

    if (e === 'hover'){
        shapes.on('mouseover', function(d,i){
            for (var j=0; j<n; j++) interacts['hover'][j].on(d,i);
        })
            .on('mouseout', function(d,i){
                for (var j=0; j<n; j++) interacts['hover'][j].off(d,i);
            });
    }


};


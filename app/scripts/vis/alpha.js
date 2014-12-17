/*
 *
 * File  : alpha.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  : Alpha partitioner.
 *
 * Date    : Sat Sep 4 23:13:43 2014
 * Modified: $Id$
 *
 */
function alpha(v) {


    var vertices = v,
        triangles = Delaunay.triangulate(vertices),
        width = 960,
        height = 500,
        xScale,
        yScale,
        svg,
        edges,
        bPolyline,
        alphaKey,
        alpha,
        dsq = function (a, b) {
            var dx = a[0] - b[0], dy = a[1] - b[1];
            return dx * dx + dy * dy;
        },
        withinAlpha = function(v,m, i, asq){
            return (dsq(v[m[i + 0]], v[m[i + 1]]) < asq &&
            dsq(v[m[i + 0]], v[m[i + 2]]) < asq &&
            dsq(v[m[i + 1]], v[m[i + 2]]) < asq);

        };


    function alphaPath(el){
        svg = d3.select(el)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('class', 'boundary');

        return alphaPath;
    }

    alphaPath.update = function(a) {


        if (!arguments.length){

            if(bPolyline) drawPath(vertices, bPolyline);

        } else {

            alpha = a;

            var asq = alpha * alpha,
                v = vertices,
                m = triangles,
                n = m.length,
                alphaComplex = [], i;

            for (i = 0; i < n; i += 3) {
                if (withinAlpha(v, m, i, asq))
                    alphaComplex.push([m[i + 0], m[i + 1], m[i + 2]]);
            }


            var e = extractEdges(alphaComplex),
                b = boundary(e);

            bPolyline = orderIndexedLines(b);


            var k = [];
            for (i = 0; i < bPolyline.length; i++) {
                k[i] = v + '-' + i;
            }

            alphaKey = k;

            drawPath(v, bPolyline);
        }

        return alphaPath;
    };


    alphaPath.xScale = function(_){

        if(!arguments.length) return xScale;

        xScale = _;

        return alphaPath;
    };

    alphaPath.yScale = function(_){

        if(!arguments.length) return xScale;

        yScale = _;

        return alphaPath;
    };


    //draws the boundary of the
    //current alpha complex
    function drawPath(v, b) {

        var lf = d3.svg.line()
            .x(function (d) {
                return xScale(v[d][0]);
            })
            .y(function (d) {
                return yScale(v[d][1]);
            }).interpolate('cardinal');

        //join
        var paths = svg.selectAll(".boundary-path")
            .data(b, function (d, i) {
                return alphaKey[i];
            });

        //create
        paths.enter()
            .append("path")
            .attr('class', 'boundary-path')
            .style('fill-opacity', 0.05)
            .transition().style('fill-opacity', 0.8);

        //update
        paths.style("fill", "#39c")
            .style("fill-opacity", 0.8)
            .style("stroke-width", 2)
            .attr('d', function (d) {
                return lf(d);
            });

        //remove
        paths.exit()
            .transition()
            .style('fill-opacity', 0.05).remove();
    }


    function extractEdges(m) {

        edges = [];
        var e = edges;
        var n = m.length, t, i;

        for (i = 0; i < n; i++) {
            t = m[i];
            addEdge(e, t[0], t[1]);
            addEdge(e, t[1], t[2]);
            addEdge(e, t[2], t[0]);
        }

        return e;

    }


    function boundary(e) {

        var n = e.length, b = [], j = 0, i;

        for (i = 0; i < n; i++) {

            if (e[i][2] === 1) {

                e[i][2] = 0;

                b[j] = [ e[i][0], e[i][1], e[i][2] ];

                ++j;

            }
        }

        return b;
    }

    function orderIndexedLines(b) {


        var polyline = [], n = b.length, cnt, iv, e;

        if (n === 0) return null;

        e = getEdge(b); //get an unvisited edge
        cnt = 1;

        while (e !== null) {

            iv = nextEdge(e[cnt], b);

            //starting edge (arbitrary)
            while (iv !== null) {
                e.push(iv);
                ++cnt;
                iv = nextEdge(e[cnt], b);
            }

            polyline.push(e);
            e = getEdge(b);
            cnt = 1;

        }

        return polyline;
    }

    function getEdge(b) {

        var n = b.length, i, e = null;

        for (i = 0; i < n; i++) {

            if (b[i][2] === 0) {
                b[i][2] = 1;
                e = [b[i][0], b[i][1]];
                break;
            }

        }

        return e;

    }


    function nextEdge(iv0, b) {

        var n = b.length, iv1 = null, i;

        for (i = 0; i < n; i++) {

            if (b[i][2] === 0) { //visit if not visited

                iv1 = iv0 === b[i][0] ? b[i][1] : iv0 === b[i][1] ? b[i][0] : null;

                if (iv1 !== null) {
                    b[i][2] = 1;
                    break;
                }

            }

        }

        return iv1;

    }


    function addEdge(edges, i, j) {


        var indx = getIndx(edges, i, j);

        if (indx === null)
            edges.push([i, j, 1]);
        else
            ++(edges[indx][2]);

    }


    function getIndx(e, i, j) {

        var n = e.length, k, r = null, iv0, iv1;

        for (k = 0; k < n; k++) {
            iv0 = e[k][0];
            iv1 = e[k][1];

            if ((iv0 === i && iv1 === j) ||
                (iv0 === j && iv1 === i)) {
                r = k;
                break;
            }
        }

        return r;

    }


    return alphaPath;
}

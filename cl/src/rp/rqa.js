/**
 *
 * Created by cdemira on 9/14/15.
 */
// recurrence quantification analysis
// r - recurrence matrix
// n - size of the matrix
verpapi.rqa = function(r, o){

    var n = Math.sqrt( r.length), //symmetric matrix assumed
        opts = o || {},
        dlmin = opts.dlmin || 8,
        vlmin = opts.vlmin || 8,
        hlmin = opts.hlmin || 8,
        minw = opts.rectWidth ||  3,
        minh = opts.rectHeight || 3,
        dl = stat.uint8ArrayCopy(r),
        vl = stat.uint8ArrayCopy(r),
        hl = stat.uint8ArrayCopy(r),
        rc  = rqa_rc(dl, n),
        histdl = rqa_diagonalLineHistogram(dl, n, dlmin),
        histvl = rqa_verticalLineHistogram(vl, n, vlmin),
        histhl = rqa_horizontalLineHistogram(hl, n, hlmin),
        rectCounts = rqa_countRects( stat.uint8ArrayCopy(r), n, minw, minh ),
        rr = 2*rc/( n*n - n),
        Sdlmin = 0,
        Svlmin = 0,
        Zdl = 0,
        Zvl = 0,
        i, p, det, entropy, l, lmax,  lam, tt,  vmax;


    for(i = 0 ; i < n; i++) {

        if (i < dlmin)
            Sdlmin += ( (i+1) * histdl[i] );
        else
            Zdl += histdl[i];

    }


    // In a symmetric rp, for every horizontal
    // line there is a vertical line mirrored w.r.t the
    // main diagonal. Similarly, for every vertical
    // line there is a corresponding horizontal line
    // ===>  histvl and histhl are identical
    var hcnt;

    for( i = 0; i < n; i++) {

        hcnt = histvl[ i ];
        histvl [ i ] += histhl [ i ];
        histhl [ i ] += hcnt;

        if (i < vlmin)
            Svlmin += ( ( i + 1 ) * histvl [ i ] );
        else
            Zvl += histvl[i];

    }

    det  = rc  ? (rc - Sdlmin)  /  rc  : 0;
    lam  = rc  ? (2*rc - Svlmin) / ( 2*rc )  : 0;
    l    = Zdl ? (rc - Sdlmin) / Zdl : 0;
    tt   = Zvl ? (2*rc - Svlmin) / Zvl : 0;

    lmax = rqa_histMax(histdl);
    vmax = rqa_histMax(histvl);

    var h = 0;

    for (i = dlmin; i < n; i++) {

        p = histdl[i];

        if (p > 0) h += ((p / Zdl) * Math.log( p / Zdl));

    }

    entropy = -h;

    return {
        rr:rr,
        det:det,
        entropy:entropy,
        l:l,
        lmax:lmax,
        lam:lam,
        tt:tt,
        vmax:vmax,
        dsq: rectCounts.dsq / ( 2*rc ),
        odr: rectCounts.odr / ( 2*rc )

    };

};






var rqa_histMax = function(h){

    var n = h.length,
        i;

    for(i = (n-1); i >= 0; i--)
        if(h[i]) return i+1;


};



// assumes selfsim rp
// ignores the diagonal entries
function rqa_rc(r, n) {

    var s = 0,
        i, j;

    for(i = 0 ; i < n - 1; i++ )
        for (j = i + 1; j < n; j++)
            s += r[i * n + j];

    return s; //actual 2*s

}



function rqa_diagonalLineHistogram (rp, n, lmin){

    var h = stat.uint32Array(n, 0),
        dlmin = lmin || 1,
        cnt, i, j, indx;


    for(i = 0 ; i < (n - 1); i++ ){

        for (j = i + 1; j < n; j++) {

            indx = i * n + j;

            if (rp[indx] === 1) {

                rp[indx] = 0;

                cnt = 1;

                cnt += (rqa_traceDiagonal(rp, i+1, j+1, n));

                //  0: rp off-point OR on-point that is part of a line shorter than lmin (default=1).
                //  1: rp on-point that is not visited yet
                //  2: rp on-point that is part of a line longer than or equal to lmin (default=1).
                rp[indx] = cnt > dlmin ? 2 : 0;

                h[cnt-1]++;

            }
        }
    }

    return h;

}


function rqa_verticalLineHistogram (rp, n, lmin){

    var h = stat.uint32Array(n,0),
        vlmin = lmin || 1,
        cnt, i, j, indx;

    for(i = 0; i < n - 1; i++){

        for (j = i + 1; j < n; j++) {

            indx = i * n + j;

            if (rp[indx] === 1) {

                rp[indx] = 0;

                cnt = 1;

                cnt += (rqa_traceVertical(rp, i+1, j, n));

                // 0: rp off-point OR on-point that is part of a line shorter than lmin (default=1).
                // 1: rp on-point that is not visited yet
                // 2: rp on-point that is part of a line longer than or equal to lmin (default=1).
                rp[indx] = cnt > vlmin ? 2 : 0;

                h[cnt-1]++;
            }
        }
    }

    return h;

}


function rqa_horizontalLineHistogram (rp, n, lmin){

    var h = stat.uint32Array(n,0),
        hlmin = lmin || 1,
        cnt, i, j, indx;

    for(i = 0 ; i < (n - 1); i++ ){

        for (j = i + 1; j < n; j++) {

            indx = i * n + j;

            if (rp[indx] === 1) {

                cnt = 1;

                rp[indx] = 0;

                cnt += (rqa_traceHorizontal(rp, i, j+1, n));

                //  0: rp off-point (i.e., dij > eps) OR on-point that is part of a line shorter than lmin (default=1).
                //  1: rp on-point that is not visited yet
                //  2: rp on-point that is part of a line longer than or equal to lmin (default=1).
                rp[indx] = cnt > hlmin  ? 2 : 0;

                h[cnt-1]++;

            }
        }
    }

    return h;

}



function rqa_traceHorizontal (rp, i, j, n) {

    var m = n - j,
        cnt = 0,
        l, indx;


    for(l = 0 ; l < m; l++, j++) {

        indx = i * n + j;

        if(rp[indx] === 1) {

            cnt++;
            rp[indx] = 2; //mark visited


        } else {

            break;

        }

    }

    return cnt;

}




function rqa_traceVertical (rp, i, j, n) {

    var m = j - i,
        cnt = 0,
        l, indx;


    for( l = 0; l < m; l++, i++) {

        indx = i * n + j;

        if(rp[indx] === 1) {

            cnt++;
            rp[ indx ] = 2; //mark visited

        } else {

            break;

        }

    }

    return cnt;

}



function rqa_traceDiagonal (rp, i, j, n) {

    var m = n - j,
        cnt = 0,
        l, indx;


    for( l = 0; l < m; l++, i++, j++) {

        indx = i * n + j;

        if(rp[indx] === 1) {

            cnt++;
            rp[ indx ] = 2; // mark visited


        } else {

            break;

        }

    }

    return cnt;

}







function rqa_rectCollectionArea ( bc) {

    var s = 0,
        n = bc.length,
        i;

    for ( i = 0; i < n; i++ )  s += ( ( bc[i].w )*( bc[i].h ) );

    return s;

}


function rqa_isHorzLine(rp, s, i, j, h, w){


    var m = i + h,
        n = j + w,
        ii = (m - 1) * s,
        k;

    //console.log('rqa_isVertLine()');

    if ( m > s || n > s ) return false;


    for ( k = j; k < n; k++ )
        if ( rp[ ii + k ] <= 0 ) return false;



    return true;

}




function rqa_isVertLine (rp, s, i, j, h, w){



    var m = i + h,
        n = j + w,
        jj = n - 1,
        k;

    //console.log('rqa_isVertLine()');

    if( m > s || n > s ) return false;


    for ( k = i; k < m; k++ )
        if (rp [ k * s + jj ] <= 0) return false;

    return true;

}




function rqa_isHalfAnnulus (rp, s, i, j, h, w) {

    var m = i + h,
        n = j + w,
        ii = (m-1)*s,
        jj = n-1,
        k;


    //console.log('rqa_isHalfAnnulus()');
    //console.log('rqa_isHalfAnnulus');

    if(m > s || n > s ) return false;

    for ( k = i; k < m; k++ )
        if ( rp [ k*s + jj ] <= 0 ) return false;

    for ( k = j; k < n - 1; k++ )
        if( rp[ ii + k ] <= 0) return false;


    return true;

}




function rqa_setRPVal  ( rp, s, i, j, h, w, val) {


    var m = i + h,
        n = j + w,
        k, l;

    for ( k = i; k < m; k++ )
        for ( l = j; l < n; l++ ) rp[ k*s + l] = val;


}



function rqa_isRect (rp, s, i, j, h, w) {

    var m = i + h,
        n = j + w,
        k, l;


    if (n > s || m > s) return false;

    for ( k = i; k < m; k++ )
        for ( l = j; l < n; l++ ) if ( rp[ k*s + l ]   <= 0 ) return false;


    return true;

}





function rqa_diagonalSquares(rp, s, minsize){

    var w = minsize,
        h = minsize,
        squares = [],
        last = {},
        k = 0,
        i = 0,
        j = 0,
        f = false;

    //console.log(i, s, minsize);
    //console.log('rqa_diagonalSquares()');

    while( i <= ( s - minsize ) ) {

        if ( rqa_isRect(rp, s, i, j, h, w)) {

            f = true;


            last.i = i;
            last.j = j;
            last.w = w;
            last.h = h;
            w = w + 1;
            h = w;



        } else {

            if (f) {

                squares.push( {i: last.i, j: last.j, h: last.h, w: last.w} );

                rqa_setRPVal(rp, s, last.i, last.j, last.h, last.w, 0);

                j = last.j + last.w;
                i = k = j;
                h = w = minsize;

                f = false;

            } else {

                j = i = ++k;
                h = w = minsize;

            }
        }

    }

    if( f ) squares.push({i: last.i, j: last.j, h: last.h, w: last.w});

    //console.log('done');

    return squares;

}



function rqa_offDiagonalRects(rp, s, minw, minh){

    var match = [ rqa_isRect, rqa_isHalfAnnulus, rqa_isVertLine, rqa_isHorzLine ],
        rects = [],
        last = {},
        lastSquare = {},
        wideRect = {},
        w = minw,
        h = minh,
        f = false,
        i = 0,
        j = 0,
        gdir = 0,
        found;


    //console.log('rqa_offDiagonalRects()');


    while( (s - minh ) > i ) {

        //console.log(s, i, j, h, w);
        //
        //if(gdir === 3) {
        //    cnt++;
        //    console.log(s, i, j, h, w);
        //    if (cnt > 50) return;
        //}

        if ( match[gdir](rp, s, i, j, h, w) ) {


            f = true;

            last.i = i;
            last.j = j;
            last.w = w;
            last.h = h;


            if (gdir === 0 || gdir === 1) {

                w = w + 1;
                h = h + 1;
                gdir = 1;

            } else if (gdir === 2) {

                w = w + 1;

            } else if (gdir === 3) {

                h = h + 1;

            }


        } else {

            if ( f ) {

                if (gdir === 3) {


                    found = last;

                    if(wideRect.w && wideRect.h)
                        found = ( ( wideRect.w * wideRect.h ) > ( last.w * last.h ) ) ? wideRect : last;

                    rects.push({i: found.i, j: found.j, h: found.h, w: found.w});

                    //mark as visited
                    rqa_setRPVal(rp, s, found.i, found.j, found.h, found.w, 0);

                    f = false;
                    gdir = 0;
                    i = found.i;
                    j = found.j + found.w;

                    if (  j > (s - minw)  ) { j = 0; ++i; }

                    w = minw;
                    h = minh;

                } else if (gdir === 1) {

                    lastSquare.i = last.i;
                    lastSquare.j = last.j;
                    lastSquare.h = last.h;
                    lastSquare.w = last.w;

                    w = lastSquare.w + 1;
                    h = lastSquare.h;

                    gdir = 2;

                } else if (gdir === 2) {

                    wideRect.i = last.i;
                    wideRect.j = last.j;
                    wideRect.w = last.w;
                    wideRect.h = last.h;


                    // start from the last found square
                    i = lastSquare.i;
                    j = lastSquare.j;
                    h = lastSquare.h + 1;
                    w = lastSquare.w;

                    gdir = 3;

                }

            } else {

                ++j;

                if (  j > (s - minw)  ) { j = 0; ++i; }

                gdir = 0;
                w = minw;
                h = minh;

            }

        }

    }

    if ( f ){

        found = ( ( wideRect.w * wideRect.h ) > ( last.w * last.h ) ) ? wideRect : last;

        rects.push( {i: found.i, j: found.j, h: found.h, w: found.w} );

    }


    //console.log('done');
    //console.log(rects);

    return rects;

}


function rqa_countRects (r, n, w, h){

    var minh =  h || 10,
        minw =  w || 10;


    return {dsq: rqa_rectCollectionArea( rqa_diagonalSquares (r, n, minw )),
            odr: rqa_rectCollectionArea( rqa_offDiagonalRects(r, n, minw, minh)) };


}


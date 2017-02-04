/**
 * Created by cdemira on 9/13/15.
 */

verpapi.rp = {};



function rp_updateRecurrenceImg (r, img){

    //symmetric matrix
    var m  = Math.sqrt(r.length),
        i, j, ij, ji, v;

    //console.log(m);

    for(i = 0; i < m-1; i++){

        //diagonal values are always on
        img[i*m + i] = (255   << 24) | (255 << 16) | (255 <<  8) | 255;

        for(j = i+1; j < m; j++) {

            ij =  i*m + j;
            ji =  j*m + i;

            v = r[ij] ? 255 : 0;


            img[ij] = img[ji] = (255  << 24) |    // alpha
                (v << 16) |             // blue
                (v <<  8) |             // green
                 v;                     // red
        }

    }

    img[i*m + i] = (255 << 24) |    // alpha
        (255 << 16) |    // blue
        (255 <<  8) |    // green
        255;            // red

    return img;

}


//
// r - recurrence matrix (flattened)
//
function rp_recurrenceImg (r){

    var m = r.length,
        buf = new ArrayBuffer(m*4),
        img = new Uint8ClampedArray(buf),
        img4= new Uint32Array(buf); // 4-byte mask


      rp_updateRecurrenceImg(r, img4);

    //returns 1-byte view of the image
    return img;

}



//
//self similarity
//
function rp_updateDistanceMatrix(d, x, metric){

    var m = x.length,
        i, j;

    for(i = 0; i < m - 1; i++ )
        for (j = i + 1; j < m; j++ )//{
            d[m*j + i] = d[m*i + j] = metric(x[i], x[j]);

        //if ( i < 10 && j < 10 ) {
        //    console.log(metric(x[i], x[j]));
        //    if (i === 0 && j===1)
        //     console.log(metric([0, 0.1, 1], [0, 1, 0]));
        //
        //    console.log(x[i]);
        //    console.log(x[j]);
        //}
	//}

    return d;

}



//
// self similarity
//
function rp_distanceMatrix (x, metric){

    var m = x.length,
        d = stat.float32Array(m*m, 0);


    return rp_updateDistanceMatrix(d, x, metric);

}





function rp_updateRecurrenceMatrix (r, d, eps){

    var n =d.length,
        i;

    for (i = 0; i < n; i++ ) r[i] = (d[i] <= eps) ? 1 : 0;

    return r;
}


//
// creates a recurrence matrix by thresholding
// the given distance matrix with eps
//
function rp_recurrenceMatrix (d, eps) {

    var n = d.length,
        r = stat.uint8Array(n, 0);

    return rp_updateRecurrenceMatrix(r, d, eps);

}


verpapi.rp.img = function ( r ){

    return rp_recurrenceImg(r);

};

//
// computes the symmetric recurrence plot for x
//
verpapi.rp.sym = function ( x, metric, eps ){

    var distfn = verpapi.metric[metric] || verpapi.metric.l2,
        d = rp_distanceMatrix (x, distfn),
        r = rp_recurrenceMatrix (d, eps);


    return {r:r, d:d};


};







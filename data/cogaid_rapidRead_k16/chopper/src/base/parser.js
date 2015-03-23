/*
 *
 * File  : parser.js
 * Author: Cagatay Demiralp (cagatay)
 * Desc  :
 *
 */

chopper.parseIDF = function(text){


    var h = chopper_getHeader(text),
        t = chopper_getTrials(h.rest),
        header = chopper_trim(h.header);

    //place holder for img
    header.push('## img:\t');

    //names of the data fields
    header.push(h.rest[0]);

    return {header:header, trials: t.trials, msgs: t.msgs};

};


function chopper_getHeader(text){

    var indx = text.indexOf('Time');

    var header = text.substring(0, indx).split('\r\n'),
        rest = text.substring(indx).split('\r\n');

    return {header:header, rest:rest};
}



function chopper_getTrials(lines){

    var n = lines.length,
        t = [],
        m = [],
        j = -1,
        i, indx, tokens, currdata;

    for (i = 0; i < n; i++){

        indx = lines[i].indexOf('.jpg');

        if(indx > -1){

            tokens =  lines[i].trim().split(/[\t\s]+/);
            t[++j]= {msg:tokens[tokens.length-1], data:[]};
            m[j] = t[j].msg;
            currdata = t[j].data;

        }else {
            if(currdata) currdata.push(lines[i]);
        }

    }

    return {trials:t, msgs:m};

}


function chopper_trim(lines){

    var n = lines.length,
        t = [],
        s, i;

    for (i = 0; i < n; i++) {

        s = lines[i].trim();
        if(!(s === '' || s === '##')) t.push(s);

    }

    return t;
}






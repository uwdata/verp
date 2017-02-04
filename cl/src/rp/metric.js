/**
 * Created by cdemira on 9/14/15.
 */


verpapi.metric = {};

verpapi.metric.l1 = function(a,b){

    if(typeof(a)==='number') return Math.abs(a-b);

    var n = a.length, s = 0, i;
    for (i = 0; i < n;  i++)
        s += Math.abs(a[i]-b[i])

    return s;
};



verpapi.metric.l2 = function (a,b){

    if(typeof(a)==='number') return Math.abs(a-b);

    var n = a.length, s = 0, i;
    for (i = 0; i < n; i++)
        s += (a[i]-b[i])*(a[i]-b[i]);

    return Math.sqrt(s);
};



verpapi.metric.angle = function (a, b) {

    var c = stat.vector.dot(a, b);

    return c < -1 ? 180 : c > 1 ? 0 : 180 * Math.acos(c) / Math.PI;

};


verpapi.metric.max = function (a,b){

    if(typeof(a)==='number') return Math.abs(a-b);

    var n = a.length, s = [], i;

    for (i = 0; i < n;  i++)
        s.push(Math.abs(a[i]-b[i]));

    return Math.max.apply(null, s);
};



verpapi.metric.min = function (a,b){

    if(typeof(a)==='number') return Math.abs(a-b);

    var n = a.length, s = [], i;

    for (i = 0; i < n; i++)
        s.push(Math.abs(a[i]-b[i]));

    return Math.min.apply(null, s);
};


verpapi.metric.edit = function (a, b){
    var n = a.length, s = 0, i;
    for (i = 0; i < n;  i++)
        s += ((a[i] === b[i])? 0 : 1);

    return s;
};

//TBI - Use time as a distance metric  
verpapi.metric.time = function (a, b){
 
}; 

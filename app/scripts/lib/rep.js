!function() {
  var rep = {
    version: "1.0.0"
  };
  rep.crp = function() {
    var data = null, rpdata = null, rpimage = null, image = null, canvas = null, ctx = null, range = null, eps = .5, width = 100, height = 100, distfn = rep.norms["l2"];
    function crp(d, el) {
      var w = d.x.length, h = w;
      data = d;
      canvas = d3.select(el).append("canvas").attr("width", width).attr("height", height).node();
      ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      rpimage = ctx.getImageData(0, 0, w, h);
      image = new Image();
      update();
      return crp;
    }
    function update() {
      rpdata = rep_rp(data, distfn, eps);
      rep.toimg(rpdata, rpimage.data);
      ctx.putImageData(rpimage, 0, 0);
      image.src = canvas.toDataURL();
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0);
    }
    crp.update = function() {
      if (data !== null) update();
      return crp;
    };
    crp.distfn = function(_) {
      if (!arguments.length) return distfn;
      var t = typeof _;
      if (t === "string") distfn = rep.norms[_] ? rep.norms[_] : rep.norms["l2"]; else if (t === "function") distfn = _; else {
        console.warn("Incorrect form of the distance function!");
        console.warn("Reverting back to the default, Euclidean distance");
      }
      return crp;
    };
    crp.eps = function(_) {
      if (!arguments.length) return eps;
      eps = _;
      return crp;
    };
    crp.width = function(_) {
      if (!arguments.length) return width;
      width = _;
      return crp;
    };
    crp.height = function(_) {
      if (!arguments.length) return height;
      height = _;
      return crp;
    };
    crp.range = function(_) {
      if (!arguments.length) return range;
      range = _;
      var dw = range.e - range.s, dh = range.e - range.s, i;
      ctx.globalCompositeOperation = "destination-over";
      ctx.clearRect(0, 0, 300, 300);
      ctx.drawImage(image, range.s, range.s, dw, dh, 0, 0, width, height);
      return crp;
    };
    crp.data = function(_) {
      if (!arguments.length) return data;
      data = _;
      return crp;
    };
    return crp;
  };
  function rep_rp(d, fn, eps) {
    var x = d.x, y = d.y, n = x.length, a = Array.apply(null, new Array(n * n)).map(Number.prototype.valueOf, 0), i, j;
    for (i = 0; i < n; i++) for (j = 0; j < n; j++) a[n * i + j] = rep_theta(fn(x[i], y[j]), eps);
    return a;
  }
  function rep_theta(d, eps) {
    return d <= eps ? 1 : 0;
  }
  rep.toimg = function(data, img) {
    var n = data.length, i, j, v;
    for (i = 0; i < n; i++) {
      v = 255 * data[i];
      for (j = 0; j < 3; j++) img[4 * i + j] = v;
      img[4 * i + j] = 255;
    }
  };
  rep.norms = {
    l1: rep_dist_l1,
    l2: rep_dist_l2,
    max: rep_dist_max
  };
  function rep_dist_l2(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
    var n = a.length, s = 0, i;
    for (i = 0; i < n; s += (a[i] - b[i]) * (a[i] - b[i]), i++) ;
    return Math.sqrt(s);
  }
  function rep_dist_l1(a, b) {
    if (typeof a === "number") return Math.abs(a * b);
    var n = a.length, s = 0, i;
    for (i = 0; i < n; s += Math.abs(a[i] - b[i]), i++) ;
    return s;
  }
  function rep_dist_max(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
    var n = a.length, s = [], i;
    for (i = 0; i < n; s.push(Math.abs(a[i] - b[i])), i++) ;
    return Math.max.apply(null, s);
  }
  if (typeof define === "function" && define.amd) {
    define(rep);
  } else if (typeof module === "object" && module.exports) {
    module.exports = rep;
  } else {
    this.rep = rep;
  }
}();
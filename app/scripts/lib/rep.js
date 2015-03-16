!function() {
  var rep = {
    version: "1.0.0"
  };
  "use strict";
  rep.crp = function() {
    var data = null, rpdata = null, rpdataDirty = true, rpimage = null, buf = null, buf8 = null, data32 = null, canvas = null, canvasOffScreen = null, offScreenDirty = true, ctx = null, ctxOffScreen = null, eps = .5, distfn = rep.norms.l2, width = 100, height = 100, xScale, yScale, imgWidth, imgHeight, activeDomain, epsnet;
    function initArray(a, val) {
      var n = a.length, i = 0;
      for (;i < n; ++i) a[i] = val;
    }
    function initData(d) {
      var s = imgWidth * imgHeight;
      data = d;
      rpdata = new Float32Array(s);
      activeDomain = new Uint8Array(imgWidth);
      epsnet = new Uint8Array(imgWidth);
      rpdataDirty = true;
      buf = new ArrayBuffer(s * 4);
      buf8 = new Uint8ClampedArray(buf);
      data32 = new Uint32Array(buf);
      ctx.globalCompositeOperation = "source-over";
      ctx.imageSmoothingEnabled = false;
      ctxOffScreen.imageSmoothingEnabled = false;
      rpimage = ctxOffScreen.getImageData(0, 0, imgWidth, imgHeight);
    }
    function crp(s, d) {
      imgWidth = d.x.length;
      imgHeight = d.y.length;
      canvasOffScreen = document.createElement("canvas");
      canvasOffScreen.width = imgWidth;
      canvasOffScreen.height = imgHeight;
      ctxOffScreen = canvasOffScreen.getContext("2d");
      canvas = s.append("canvas").attr("width", width).attr("height", height).node();
      ctx = canvas.getContext("2d");
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
      initData(d);
      initScale();
      update();
      return crp;
    }
    function renderOffScreen() {
      rpimage.data.set(buf8);
      ctxOffScreen.putImageData(rpimage, 0, 0);
      offScreenDirty = false;
    }
    function updateRP() {
      rpdata = rep_rp(rpdata, data, distfn);
      initArray(epsnet, 0);
      rep.toimg(rpdata, data32, imgWidth, imgHeight, eps, epsnet);
      rpdataDirty = false;
      offScreenDirty = true;
    }
    function update() {
      if (rpdataDirty === true) updateRP();
      if (offScreenDirty === true) renderOffScreen();
      var dx = xScale.domain(), rx = xScale.range(), dy = yScale.domain(), ry = yScale.range();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvasOffScreen, dx[0], dy[0], dx[1] - dx[0], dy[1] - dy[0], rx[0], ry[0], rx[1] - rx[0], ry[1] - ry[0]);
    }
    function initScale() {
      xScale = d3.scale.linear().domain([ 0, imgWidth ]).range([ 0, width ]);
      yScale = d3.scale.linear().domain([ 0, imgHeight ]).range([ 0, height ]);
    }
    crp.rqa = function() {
      if (rpdata) return rep.rqa(rpdata, data.x.length, eps);
    };
    crp.epsnet = function() {
      return epsnet;
    };
    crp.boxHighlight = function(e) {
      offScreenDirty = true;
      if (!arguments.length) {
        update();
        return activeDomain;
      }
      initArray(activeDomain, 0);
      var startX = e[0][0] - .5, startY = e[0][1] - .5, endX = e[1][0] - .5, endY = e[1][1] - .5, d = data32, rp = rpdata, b = [ 255, 0, 0 ], s1, f, v, i, j;
      for (i = 0; i < imgHeight; i++) {
        for (j = 0; j < imgWidth; j++) {
          s1 = imgWidth * i + j;
          v = rp[s1] <= eps ? 255 : 0;
          f = !(i < startY || i > endY || j < startX || j > endX);
          if (f) activeDomain[j] = activeDomain[i] = 1;
          d[s1] = f === true ? 255 << 24 | .5 * (v + b[2]) << 16 | .5 * (v + b[1]) << 8 | .5 * (v + b[0]) : 255 << 24 | v << 16 | v << 8 | v;
        }
      }
      update();
      return activeDomain;
    };
    crp.update = function() {
      if (data !== null) update();
      return crp;
    };
    crp.distfn = function(_) {
      if (!arguments.length) return distfn;
      var t = typeof _;
      if (t === "string") {
        distfn = rep.norms[_] !== "undefined" ? rep.norms[_] : rep.norms.l2;
        rpdataDirty = true;
      } else if (t === "function") {
        distfn = _;
        rpdataDirty = true;
      } else {
        console.warn("Incorrect form of the distance function!");
        console.warn("Reverting back to the default, Euclidean distance");
      }
      return crp;
    };
    crp.eps = function(_) {
      if (!arguments.length) return eps;
      eps = +_;
      rpdataDirty = true;
      return crp;
    };
    crp.width = function(_) {
      if (!arguments.length) return width;
      width = +_;
      return crp;
    };
    crp.height = function(_) {
      if (!arguments.length) return height;
      height = +_;
      return crp;
    };
    crp.scale = function(_) {
      if (!arguments.length) return {
        xs: xScale,
        ys: yScale
      };
      xScale = _.xs();
      yScale = _.ys();
      return crp;
    };
    crp.distanceMatrix = function() {
      return rpdata;
    };
    crp.data = function(_) {
      if (!arguments.length) return data;
      imgWidth = _.x.length;
      imgHeight = _.y.length;
      ctxOffScreen.clearRect(0, 0, canvasOffScreen.width, canvasOffScreen.height);
      canvasOffScreen.width = imgWidth;
      canvasOffScreen.height = imgHeight;
      initData(_);
      return crp;
    };
    crp.highlight = function(_) {
      offScreenDirty = true;
      if (!(arguments.length && _)) {
        update();
        return;
      }
      var d = data32, rp = rpdata, b = [ 255, 0, 0 ], s1, s2, f, v;
      for (var i = 0; i < imgHeight; i++) {
        for (var j = i; j < imgWidth; j++) {
          s1 = imgWidth * i + j;
          s2 = imgWidth * j + i;
          v = rp[s1] <= eps ? 255 : 0;
          f = _[i] === 1 && _[j] === 1;
          d[s1] = f === true ? 255 << 24 | .5 * (v + b[2]) << 16 | .5 * (v + b[1]) << 8 | .5 * (v + b[0]) : 255 << 24 | v << 16 | v << 8 | v;
          d[s2] = d[s1];
        }
      }
      update();
    };
    return crp;
  };
  function rep_rp(a, d, func) {
    var x = d.x, y = d.y, n = x.length, m = y.length, i, j;
    for (i = 0; i < m; i++) for (j = 0; j < n; j++) a[n * i + j] = func(x[i], y[j]);
    return a;
  }
  rep.toimg = function(data, img, w, h, eps, epsnet) {
    var i, j, k, k2, v;
    for (i = 0; i < h - 1; i++) {
      img[i * w + i] = 255 << 24 | 255 << 16 | 255 << 8 | 255;
      for (j = i + 1; j < w; j++) {
        k = i * w + j;
        v = data[k] <= eps ? 255 : 0;
        if (v > 0) {
          epsnet[i] = 1;
          epsnet[j] = 1;
        }
        img[k] = 255 << 24 | v << 16 | v << 8 | v;
        k2 = j * w + i;
        img[k2] = img[k];
      }
    }
    img[i * w + i] = 255 << 24 | 255 << 16 | 255 << 8 | 255;
  };
  rep.norms = {
    l1: rep_dist_l1,
    l2: rep_dist_l2,
    max: rep_dist_max,
    min: rep_dist_min,
    edit: rep_dist_edit
  };
  function rep_dist_l1(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
    var n = a.length, s = 0, i;
    for (i = 0; i < n; i++) s += Math.abs(a[i] - b[i]);
    return s;
  }
  function rep_dist_l2(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
    var n = a.length, s = 0, i;
    for (i = 0; i < n; i++) s += (a[i] - b[i]) * (a[i] - b[i]);
    return Math.sqrt(s);
  }
  function rep_dist_max(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
    var n = a.length, s = [], i;
    for (i = 0; i < n; i++) s.push(Math.abs(a[i] - b[i]));
    return Math.max.apply(null, s);
  }
  function rep_dist_min(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
    var n = a.length, s = [], i;
    for (i = 0; i < n; i++) s.push(Math.abs(a[i] - b[i]));
    return Math.min.apply(null, s);
  }
  function rep_dist_edit(a, b) {
    var n = a.length, s = 0, i;
    for (i = 0; i < n; i++) s += a[i] === b[i] ? 0 : 1;
    return s;
  }
  rep.rqa = function(d, n, eps) {
    var dlmin = 2, vlmin = 2, rp = rep_distanceToRP(d, eps), rc = rep_rc(rp, n), rpcpy = new Uint8Array(rp.buffer.slice()), histdl = rep_diagonalLineHistogram(rp, n), histvl = rep_verticalLineHistogram(rpcpy, n), rr = 2 * rc / (n * n - n), Sdlmin = 0, Svlmin = 0, Zdl = 0, Zvl = 0, h = 0, i, p, det, lam, entropy, l, tt;
    for (i = 0; i < n; i++) {
      if (i < dlmin) Sdlmin += histdl[i]; else Zdl += histdl[i];
    }
    for (i = 0; i < n; i++) {
      if (i < vlmin) Svlmin += histvl[i]; else Zvl += histvl[i];
    }
    det = (rc - Sdlmin) / rc;
    lam = (rc - Svlmin) / rc;
    l = (rc - Sdlmin) / Zdl;
    tt = (rc - Svlmin) / Zvl;
    for (i = dlmin - 1; i < n; i++) {
      p = histdl[i];
      if (p > 0) h += p / Zdl * Math.log(p / Zdl);
    }
    entropy = -h;
    return {
      rr: rr,
      det: det,
      entropy: entropy,
      lam: lam,
      l: l,
      tt: tt
    };
  };
  rep.rr = function(d, n, eps) {
    var rp = rep_distanceToRP(d, eps);
    return rep_rc(rp, n) / (n * n - n);
  };
  rep.det = function(d, n, eps) {
    var rp = rep_distanceToRP(d, eps), histdl = rep_diagonalLineHistogram(rp, n), rc = rep_rc(rp, n);
    return (rc - 2 * histdl[0]) / rc;
  };
  rep.entropy = function(d, n, eps) {
    var rp = rep_distanceToRP(d, eps), histdl = rep_diagonalLineHistogram(rp, n), z = 0, lmin = 2, i = lmin - 1, h = 0, p;
    for (;i < histdl.length; i++) z += histdl[i];
    for (i = lmin - 1; i < histdl.length; i++) {
      p = histdl[i];
      if (p > 0) h += p / z * Math.log(p / z);
    }
    return -h;
  };
  var rep_rc = function(rp, n) {
    var s = 0, i, j;
    for (i = 1; i < n - 1; i++) for (j = i + 1; j < n; j++) s += rp[i * n + j];
    return s;
  };
  var rep_diagonalLineHistogram = function(rp, n) {
    var h = stat.uint32Array(n, 0), cnt, i, j, indx;
    for (i = 0; i < n - 1; i++) {
      for (j = i + 1; j < n; j++) {
        cnt = 0;
        indx = i * n + j;
        if (rp[indx] === 1) {
          rp[indx] = 0;
          cnt = 1;
          cnt += rep_traceDiagonal(rp, i + 1, j + 1, n);
          h[cnt - 1]++;
        }
      }
    }
    return h;
  };
  var rep_verticalLineHistogram = function(rp, n) {
    var h = stat.uint32Array(n, 0), cnt, i, j, indx;
    for (i = 0; i < n - 1; i++) {
      for (j = i + 1; j < n; j++) {
        cnt = 0;
        indx = i * n + j;
        if (rp[indx] === 1) {
          rp[indx] = 0;
          cnt = 1;
          cnt += rep_traceVertical(rp, i + 1, j, n);
          h[cnt - 1]++;
        }
      }
    }
    return h;
  };
  var rep_traceVertical = function(rp, i, j, n) {
    var m = j - 1, cnt = 0, l = 0, indx;
    for (;l < m; l++, i++) {
      indx = i * n + j;
      if (rp[indx] === 1) {
        cnt++;
        rp[indx] = 0;
      } else {
        break;
      }
    }
    return cnt;
  };
  var rep_traceDiagonal = function(rp, i, j, n) {
    var m = n - j, cnt = 0, l = 0, indx;
    for (;l < m; l++, i++, j++) {
      indx = i * n + j;
      if (rp[indx] === 1) {
        cnt++;
        rp[indx] = 0;
      } else {
        break;
      }
    }
    return cnt;
  };
  var rep_distanceToRP = function(d, eps) {
    var n = d.length, rp = stat.uint8Array(n, 0), i = 0;
    for (;i < n; i++) rp[i] = d[i] <= eps ? 1 : 0;
    return rp;
  };
  if (typeof define === "function" && define.amd) {
    define(rep);
  } else if (typeof module === "object" && module.exports) {
    module.exports = rep;
  } else {
    this.rep = rep;
  }
}();
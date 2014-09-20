!function() {
  var rep = {
    version: "1.0.0"
  };
  "use strict";
  rep.crp = function() {
    var data = null, rpdata = null, rpdataDirty = true, rpimage = null, buf = null, buf8 = null, data32 = null, canvas = null, canvasOffScreen = null, offScreenDirty = true, ctx = null, ctxOffScreen = null, svgCanvas = {}, eps = .5, distfn = rep.norms.l2, imgWidth, imgHeight, width = 100, height = 100, range = {
      xs: 0,
      xe: 1,
      ys: 0,
      ye: 1
    }, domain = {
      xs: 0,
      xe: width,
      ys: 0,
      ye: height
    }, activeDomain, epsnet, scaleX, scaleY;
    function initArray(a, val) {
      var n = a.length, i = 0;
      for (;i < n; ++i) a[i] = val;
    }
    function initData(d) {
      data = d;
      var s = imgWidth * imgHeight;
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
    function crp(d, el) {
      imgWidth = d.x.length;
      imgHeight = d.y.length;
      canvasOffScreen = document.createElement("canvas");
      canvasOffScreen.width = imgWidth;
      canvasOffScreen.height = imgHeight;
      ctxOffScreen = canvasOffScreen.getContext("2d");
      canvas = d3.select(el).append("canvas").attr("width", width).attr("height", height).node();
      ctx = canvas.getContext("2d");
      initData(d);
      updateScale();
      initSvgCanvas(el);
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
      var dx = scaleX.domain(), dy = scaleY.domain();
      ctx.drawImage(canvasOffScreen, dx[0], dy[0], dx[1] - dx[0], dy[1] - dy[0], 0, 0, width, height);
    }
    function updateScale() {
      imgWidth = data.x.length;
      imgHeight = data.y.length;
      domain = {
        xs: 0,
        xe: imgWidth,
        ys: 0,
        ye: imgHeight
      };
      scaleX = d3.scale.linear().domain([ domain.xs, domain.xe ]).range([ 0, width ]);
      scaleY = d3.scale.linear().domain([ domain.ys, domain.ye ]).range([ 0, height ]);
    }
    function initSvgCanvas(el) {
      svgCanvas.s = d3.select(el).append("svg").attr("id", "canvas-svg").attr("width", width).attr("height", height);
      var s = svgCanvas.s;
      svgCanvas.xsLabel = s.append("text").attr("class", "rplabel").attr("dy", "-0.25em").text("0");
      svgCanvas.xeLabel = s.append("text").attr("class", "rplabel").attr("dy", "-0.25em").attr("dx", width).attr("text-anchor", "end").text("300");
      svgCanvas.ysLabel = s.append("text").attr("class", "rplabel").attr("dy", "1em").attr("dx", "-0.25em").attr("text-anchor", "end").text("0");
      svgCanvas.yeLabel = s.append("text").attr("class", "rplabel").attr("dx", "-0.25em").attr("dy", height).attr("text-anchor", "end").text("300");
    }
    crp.epsnet = function() {
      return epsnet;
    };
    crp.activeDomain = function(e) {
      if (!arguments.length) return activeDomain;
      var startX = Math.round(scaleX.invert(e[0][0])), endX = Math.round(scaleX.invert(e[1][0])), startY = Math.round(scaleY.invert(e[0][1])), endY = Math.round(scaleY.invert(e[1][1])), v;
      initArray(activeDomain, 0);
      for (var j = startY; j < endY; j++) {
        for (var i = startX; i < endX; i++) {
          v = rpdata[imgWidth * j + i];
          if (v <= eps) {
            activeDomain[i] = 1;
            activeDomain[j] = 1;
          }
        }
      }
      return activeDomain;
    };
    crp.update = function() {
      if (data !== null) {
        update();
      }
      return crp;
    };
    crp.distfn = function(_) {
      if (!arguments.length) return distfn;
      var old = distfn, t = typeof _;
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
    crp.range = function(_) {
      if (!arguments.length) return range;
      range = _;
      var xs = ~~(range.xs * imgWidth), ys = ~~(range.ys * imgHeight), xe = ~~(range.xe * imgWidth), ye = ~~(range.ye * imgHeight);
      scaleX.domain([ xs, xe ]);
      scaleY.domain([ ys, ye ]);
      svgCanvas.xsLabel.text(xs + "");
      svgCanvas.xeLabel.text(xe + "");
      svgCanvas.ysLabel.text(ys + "");
      svgCanvas.yeLabel.text(ye + "");
      return crp;
    };
    crp.data = function(_) {
      if (!arguments.length) return data;
      initData(_);
      return crp;
    };
    crp.highlight = function(_) {
      offScreenDirty = true;
      if (_ === null || _.length === 0) {
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
    console.log(eps);
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
  if (typeof define === "function" && define.amd) {
    define(rep);
  } else if (typeof module === "object" && module.exports) {
    module.exports = rep;
  } else {
    this.rep = rep;
  }
}();
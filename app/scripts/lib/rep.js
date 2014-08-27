!function() {
  var rep = {
    version: "1.0.0"
  };
  rep.crp = function() {
    var data = null, rpdata = null, rpimage = null, image = null, canvas = null, ctx = null, svgCanvas = {}, eps = .5, distfn = rep.norms.l2, imgWidth, imgHeight, width = 100, height = 100, range = {
      xs: 0,
      xe: 1,
      ys: 0,
      ye: 1
    }, domain = {
      xs: 0,
      xe: width,
      ys: 0,
      ye: height
    }, activeDomain, scaleX, scaleY;
    function initData(d) {
      var m = d.x.length, n = d.y.length;
      data = d;
      rpdata = Array.apply(null, new Array(m * n)).map(Number.prototype.valueOf, 0);
      activeDomain = Array.apply(null, new Array(m)).map(Number.prototype.valueOf, 1);
    }
    function crp(d, el) {
      initData(d);
      updateScale();
      canvas = d3.select(el).append("canvas").attr("width", width).attr("height", height).node();
      ctx = canvas.getContext("2d");
      initSvgCanvas(el);
      image = new Image();
      update();
      return crp;
    }
    function update() {
      ctx.clearRect(0, 0, width, height);
      rpimage = ctx.getImageData(0, 0, imgWidth, imgHeight);
      rpdata = rep_rp(rpdata, data, distfn, eps);
      rep.toimg(rpdata, rpimage.data);
      ctx.putImageData(rpimage, 0, 0);
      ctx.imageSmoothingEnabled = false;
      image.src = canvas.toDataURL();
      ctx.drawImage(image, ~~(range.xs * imgWidth), ~~(range.ys * imgHeight), ~~((range.xe - range.xs) * imgWidth), ~~((range.ye - range.ys) * imgHeight), 0, 0, width, height);
    }
    function updateNoDist() {
      ctx.clearRect(0, 0, width, height);
      ctx.putImageData(rpimage, 0, 0);
      ctx.imageSmoothingEnabled = false;
      image.src = canvas.toDataURL();
      ctx.drawImage(image, ~~(range.xs * imgWidth), ~~(range.ys * imgHeight), ~~((range.xe - range.xs) * imgWidth), ~~((range.ye - range.ys) * imgHeight), 0, 0, width, height);
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
    crp.activeDomain = function(e) {
      if (!arguments) return activeDomain;
      var startX = Math.round(scaleX.invert(e[0][0])), endX = Math.round(scaleX.invert(e[1][0])), startY = Math.round(scaleY.invert(e[0][1])), endY = Math.round(scaleY.invert(e[1][1])), v;
      console.log(startX, endX, startY, endY);
      activeDomain.forEach(function(d, k, a) {
        a[k] = 0;
      });
      for (var j = startY; j < endY; j++) {
        for (var i = startX; i < endX; i++) {
          v = rpdata[imgWidth * j + i];
          if (v > 0) {
            activeDomain[i] = 1;
            activeDomain[j] = 1;
          }
        }
      }
      return activeDomain;
    };
    crp.resetActiveDomain = function() {
      activeDomain.forEach(function(d, i, a) {
        a[i] = 0;
      });
    };
    crp.update = function() {
      if (data !== null) {
        updateScale();
        update();
      }
      return crp;
    };
    crp.distfn = function(_) {
      if (!arguments.length) return distfn;
      var t = typeof _;
      if (t === "string") distfn = rep.norms._ ? rep.norms._ : rep.norms.l2; else if (t === "function") distfn = _; else {
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
      var xs = ~~(range.xs * imgWidth), ys = ~~(range.ys * imgHeight), xe = ~~((range.xe - range.xs) * imgWidth), ye = ~~((range.ye - range.ys) * imgHeight);
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
      if (_ === null || _.length === 0) {
        update();
        return;
      }
      rpimage = ctx.getImageData(0, 0, imgWidth, imgHeight);
      var d = rpimage.data, a = [ 255, 0, 0 ], indx1, indx2, s1, s2, f, v;
      for (var i = 0; i < imgHeight; i++) {
        for (var j = i; j < imgWidth; j++) {
          s1 = imgWidth * i + j;
          s2 = imgWidth * j + i;
          indx1 = 4 * s1;
          indx2 = 4 * s2;
          f = _[i] === 1 && _[j] === 1;
          for (var k = 0; k < 3; k++) {
            v = 255 * rpdata[s1];
            d[indx1 + k] = f === true ? .5 * (a[k] + v) : v;
            d[indx2 + k] = d[indx1 + k];
          }
          d[indx2 + k] = d[indx1 + k] = 255;
        }
      }
      updateNoDist();
    };
    return crp;
  };
  function rep_rp(a, d, fn, eps) {
    var x = d.x, y = d.y, n = x.length, i, j;
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
    max: rep_dist_max,
    min: rep_dist_min
  };
  function rep_dist_l2(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
    var n = a.length, s = 0, i;
    for (i = 0; i < n; s += (a[i] - b[i]) * (a[i] - b[i]), i++) ;
    return Math.sqrt(s);
  }
  function rep_dist_l1(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
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
  function rep_dist_min(a, b) {
    if (typeof a === "number") return Math.abs(a - b);
    var n = a.length, s = [], i;
    for (i = 0; i < n; s.push(Math.abs(a[i] - b[i])), i++) ;
    return Math.min.apply(null, s);
  }
  if (typeof define === "function" && define.amd) {
    define(rep);
  } else if (typeof module === "object" && module.exports) {
    module.exports = rep;
  } else {
    this.rep = rep;
  }
}();
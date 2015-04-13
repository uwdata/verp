!function() {
  var stat = {
    version: "1.0.0"
  };
  stat.extrama = function(X) {
    if (!(arguments.length && X)) return;
    var min = X[0], max = min, n = X.length, f = n % 2, i = 1, v0, v1;
    for (;i < n; i += 2) {
      if (X[i] > X[i + 1]) {
        v0 = X[i + 1];
        v1 = X[i];
      } else {
        v0 = X[i];
        v1 = X[i + 1];
      }
      min = min > v0 ? v0 : min;
      max = max < v1 ? v1 : max;
    }
    if (!f) {
      v0 = X[n - 1];
      if (min > v0) min = v0; else if (max < v0) max = v0;
    }
    return {
      min: min,
      max: max
    };
  };
  stat.min = function(X) {
    return stat.extrama(X).min;
  };
  stat.max = function(X) {
    return stat.extrama(X).max;
  };
  stat.numeric = function(a, b) {
    return a - b;
  };
  stat.initArray = function(a, v) {
    var n = a.length, i = 0;
    for (;i < n; i++) a[i] = v;
    return a;
  };
  stat.array = function(s, v) {
    return v ? new Array(s) : stat.initArray(new Array(s), v);
  };
  stat.uint8ClampedArray = function(s, v) {
    return v ? new Uint8ClampedArray(s) : stat.initArray(new Uint8ClampedArray(s), v);
  };
  stat.uint8Array = function(s, v) {
    return v ? new Uint8Array(s) : stat.initArray(new Uint8Array(s), v);
  };
  stat.uint8ArrayCopy = function(a) {
    var n = a.length, acopy = new Uint8Array(n), i;
    for (i = 0; i < n; i++) acopy[i] = a[i];
    return acopy;
  };
  stat.uint32Array = function(s, v) {
    return v ? new Uint32Array(s) : stat.initArray(new Uint32Array(s), v);
  };
  stat.float32Array = function(s, v) {
    return v ? new Float32Array(s) : stat.initArray(new Float32Array(s), v);
  };
  stat.equalArray = function(a, b) {
    var n = a.length, m = b.length, i = 0;
    if (!(n === m)) return false;
    for (;i < n; i++) if (!(a[i] === b[i])) return false;
    return true;
  };
  stat.mean = function(X) {
    if (!(arguments.length && X.length)) console.error("Invalid parameter!");
    return stat_mean(X);
  };
  function stat_mean(X) {
    var n = X.length, m = 0, i = 0;
    if (n < 2) return X[0];
    for (;i < n; i++) m += (X[i] - m) / (i + 1);
    return m;
  }
  stat.median = function(X) {
    if (!(arguments.length && X.length)) console.error("Invalid parameter!"); else return stat_median(X);
  };
  function stat_median(X) {
    var n = X.length;
    if (n === 1) return {
      val: X[0],
      array: X
    };
    var Xs = X.sort(stat.numeric), v = stat_quant(Xs, .5);
    return {
      val: v,
      array: Xs
    };
  }
  stat.var = function(X) {
    if (!(arguments.length && X.length)) console.error("Invalid parameter!"); else return stat_var(X);
  };
  function stat_var(X) {
    var n = X.length, s = 0, sigmsqr = 0, i;
    if (n < 2) return {
      val: sigmsqr,
      mean: X[0]
    };
    var mu = stat.mean(X), musqr = mu * mu;
    for (i = 0; i < n; i++) s += X[i] * (X[i] - 2 * mu);
    sigmsqr = (s + n * musqr) / (n - 1);
    return {
      val: sigmsqr,
      mean: mu
    };
  }
  stat.std = function(X) {
    return Math.sqrt(stat.var(X).val);
  };
  function kurt() {}
  function skew() {}
  stat.entropy = function(X, P) {
    if (!(arguments.length === 2 && X.length)) console.error("Invalid parameter!"); else stat_entropy(X, P);
  };
  function stat_log(x) {
    return x === 0 ? 0 : Math.log(x);
  }
  function stat_entropy(X, P) {
    var n = X.length, H = 0, i = 0, p;
    for (;i < n; i++) {
      p = P(X(i));
      H += p * stat_log(p);
    }
    return -H;
  }
  stat.hist = function(X, cnt) {
    if (!(arguments.length && X && X.length)) return;
    var k = cnt || stat_bincnt(X, "fd");
    return stat_hist(X.sort(stat.numeric), k);
  };
  function stat_hist(X, k) {
    var n = X.length, w = (X[n - 1] - X[0]) / k, h = stat.array(k, 0), i = 0, j = 0, e = 0, f;
    for (;i < k; i++) {
      e = X[0] + (i + 1) * w;
      while (X[j] <= e && (f = j++ < n)) ++h[i];
      if (!f) break;
    }
    return h;
  }
  function stat_bincnt(X, type) {
    var n = X.length, t = type || "fd", w = 2 * stat.iqr(X) / Math.pow(n, 1 / 3), e = stat.extrama(X), k = ~~((e.max - e.min) / w);
    return k;
  }
  stat.hist2 = function(X, kx, Y, ky) {
    if (arguments.length && X && kx) {
      Y = Y || X;
      ky = ky || kx;
      return stat_hist2(X, kx, Y, ky);
    }
  };
  function stat_hist2(X, kx, Y, ky) {
    var n = X.length, extx = stat.extrama(X), wx = (extx.max - extx.min) / kx, exty = stat.extrama(Y), wy = (exty.max - exty.min) / ky, k = kx * ky, h = stat.array(k, 0), i = 0, jx = 0, jy = 0, ex = stat.array(kx + 1, 0).map(function(d, i) {
      return extx.min + i * wx;
    }), ey = stat.array(ky + 1, 0).map(function(d, i) {
      return exty.min + i * wy;
    }), j;
    ex[0] = -Infinity;
    ex[kx] = Infinity;
    ey[0] = -Infinity;
    ey[ky] = Infinity;
    for (;i < n; i++) {
      j = 0;
      for (jy = 0; jy < ky; jy++) {
        for (jx = 0; jx < kx; jx++) {
          if (X[i] > ex[jx] && X[i] <= ex[jx + 1] && Y[i] > ey[jy] && Y[i] <= ey[jy + 1]) {
            ++h[j];
          }
          ++j;
        }
      }
    }
    return h;
  }
  stat.intensity = function() {
    var width = 256, height = 256, canvasWidth = width, canvasHeight = height, xscale = d3.scale.linear().domain([ 0, width ]).range([ 0, canvasWidth ]), yscale = d3.scale.linear().domain([ 0, height ]).range([ 0, canvasHeight ]), gray = [ "#000", "#eee" ], colormap = d3.scale.linear().range(gray), canvas, ctx, img, ext;
    function intensity(s, v) {
      console.log(v);
      canvas = s.append("canvas").attr("width", canvasWidth).attr("height", canvasHeight).node();
      ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      img = ctx.createImageData(width, height);
      initImg(s.datum());
      ctx.putImageData(img, 0, 0);
      draw();
    }
    function initImg(d) {
      var n = width * height, i = 0, j = 0, a = 255, rgb, r, g, b;
      ext = stat.extrama(d);
      colormap.domain([ ext.min, ext.max ]);
      var imgdata = img.data;
      for (;i < n; i++, j += 4) {
        rgb = d3.rgb(colormap(d[i]));
        r = Math.round(rgb.r);
        g = Math.round(rgb.g);
        b = Math.round(rgb.b);
        imgdata[j] = r;
        imgdata[j + 1] = g;
        imgdata[j + 2] = b;
        imgdata[j + 3] = a;
      }
    }
    function draw() {
      var dx = xscale.domain(), rx = xscale.range(), dy = yscale.domain(), ry = yscale.range();
      ctx.drawImage(canvas, dx[0], dy[0], dx[1] - dx[0], dy[1] - dy[0], rx[0], ry[0], rx[1] - rx[0], ry[1] - ry[0]);
    }
    intensity.width = function(_) {
      if (!arguments.length) return width;
      width = _;
      xscale.domain([ 0, width ]);
      return intensity;
    };
    intensity.height = function(_) {
      if (!arguments.length) return height;
      height = _;
      yscale.domain([ 0, height ]);
      return intensity;
    };
    intensity.canvasWidth = function(_) {
      if (!arguments.length) return canvasWidth;
      canvasWidth = _;
      xscale.range([ 0, canvasWidth ]);
      return intensity;
    };
    intensity.canvasHeight = function(_) {
      if (!arguments.length) return canvasHeight;
      canvasHeight = _;
      yscale.range([ 0, canvasHeight ]);
      return intensity;
    };
    return intensity;
  };
  stat.vector = {};
  stat.vector.add = function(v0, v1) {
    var v = [], n = v0.length, i = 0;
    for (;i < n; i++) v.push(v0[i] + v1[i]);
    return v;
  };
  stat.vector.subtract = function(v0, v1) {
    var v = [], n = v0.length, i = 0;
    for (;i < n; i++) v.push(v0[i] - v1[i]);
    return v;
  };
  stat.vector.normSquared = function(v) {
    var s = 0, n = v.length, i = 0;
    for (;i < n; i++) s += v[i] * v[i];
    return s;
  };
  stat.vector.norm = function(v) {
    return Math.sqrt(stat.vector.normSquared(v));
  };
  stat.vector.normalize = function(v0) {
    var v = [], eps = 1 / 256, r = stat.vector.norm(v0);
    if (r < eps) {
      console.error("The vector [" + v0 + "] has almost zero norm!");
      return;
    }
    var n = v0.length, i = 0;
    for (;i < n; i++) v.push(v0[i] / r);
    return v;
  };
  stat.vector.dot = function(v0, v1) {
    if (!(v0 && v1)) {
      console.error("Undefined vectors! Returning 0 ...");
      return 0;
    }
    var n = v0.length, s = 0, i = 0;
    for (;i < n; i++) s += v0[i] * v1[i];
    return s;
  };
  stat.vector.degree = function(v0, v1) {
    return 360 * (stat.vector.radian(v0, v1) / (2 * Math.PI));
  };
  stat.vector.radian = function(v0, v1) {
    var normalize = stat.vector.normalize, dot = stat.vector.dot;
    return Math.acos(dot(normalize(v0), normalize(v1)));
  };
  if (typeof define === "function" && define.amd) {
    define(stat);
  } else if (typeof module === "object" && module.exports) {
    module.exports = stat;
  } else {
    this.stat = stat;
  }
}();
!function() {
  var stat = {
    version: "0.1.0"
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
    var n = a.length, i;
    if (typeof v === "function") for (i = 0; i < n; a[i++] = v(i)) ; else for (i = 0; i < n; a[i++] = v) ;
    return a;
  };
  stat.slice = function(a, dim, i) {
    if (dim === 1) return a.slice(i)[0];
    var n = a.length, slice = stat.array(n), j;
    for (j = 0; j < n; j++) slice[j] = a[j][i];
    return slice;
  };
  stat.array = function(s, v) {
    return arguments.length === 1 ? new Array(s) : stat.initArray(new Array(s), v);
  };
  stat.range = function(s) {
    var a = stat.array(s), i;
    for (i = 0; i < s; a[i] = i++) ;
    return a;
  };
  stat.uint8ClampedArray = function(s, v) {
    return arguments.length === 1 ? new Uint8ClampedArray(s) : stat.initArray(new Uint8ClampedArray(s), v);
  };
  stat.uint8Array = function(s, v) {
    return arguments.length === 1 ? new Uint8Array(s) : stat.initArray(new Uint8Array(s), v);
  };
  stat.uint8ArrayCopy = function(a) {
    var n = a.length, acopy = new Uint8Array(n), i;
    for (i = 0; i < n; i++) acopy[i] = a[i];
    return acopy;
  };
  stat.uint32Array = function(s, v) {
    return arguments.length === 1 ? new Uint32Array(s) : stat.initArray(new Uint32Array(s), v);
  };
  stat.uint32Range = function(s) {
    var a = stat.uint32Array(s), i;
    for (i = 0; i < s; a[i] = i++) ;
  };
  stat.float32Array = function(s, v) {
    return arguments.length === 1 ? new Float32Array(s) : stat.initArray(new Float32Array(s), v);
  };
  stat.equalArray = function(a, b) {
    var n = a.length, m = b.length, i;
    if (!(n === m)) return false;
    for (i = 0; i < n; i++) if (!(a[i] === b[i])) return false;
    return true;
  };
  stat.mean = function(X, dim) {
    var n = arguments.length;
    if (!(n && X.length)) console.error("Invalid parameter!");
    return stat_mean(X);
  };
  function stat_mean(X) {
    var n = X.length, m = 0, i = 0;
    if (n < 2) return X[0];
    for (;i < n; i++) m += (X[i] - m) / (i + 1);
    return m;
  }
  stat.median = function(X, dim) {
    var n = arguments.length;
    if (!(n && X.length) || n > 1 && dim > 1) return console.error("Invalid parameter!"); else if (n === 1) return stat_median(X); else return stat_dim_median(X, dim);
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
  function stat_dim_median(X, dim) {
    var n0 = X.length, n1 = X[0].length, i, x;
    if (dim === 0) {
      x = stat.array(n1);
      for (i = 0; i < n1; i++) x[i] = stat_median(stat.slice(X, dim, i)).val;
    } else {
      x = stat.array(n0);
      for (i = 0; i < n0; i++) x[i] = stat_median(stat.slice(X, dim, i)).val;
    }
    return x;
  }
  stat.quant = function(X, k, q) {
    if (!(arguments.length === 3 && q > 1 && k > 0 && k < q)) console.error("Invalid input args!"); else return stat_quant(X.sort(stat.numeric), k / q);
  };
  function stat_quant(X, i) {
    var n = X.length, h = i * (n - 1), i0 = Math.floor(h), i1 = i0 + 1, w = h - i0;
    return (1 - w) * X[i0] + w * X[i1];
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
    var n = X.length, H = 0, i, p;
    for (i = 0; i < n; i++) {
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
          if (X[i] > ex[jx] && X[i] <= ex[jx + 1] && Y[i] > ey[jy] && Y[i] <= ey[jy + 1]) df;
          ++h[j];
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
    var v = [], n = v0.length, i;
    for (i = 0; i < n; i++) v.push(v0[i] + v1[i]);
    return v;
  };
  stat.vector.scalar = function(v0, s) {
    var v = [], n = v0.length, i;
    for (i = 0; i < n; i++) v.push(s * v0[i]);
    return v;
  };
  stat.vector.subtract = function(v0, v1) {
    var v = [], n = v0.length, i;
    for (i = 0; i < n; i++) v.push(v0[i] - v1[i]);
    return v;
  };
  stat.vector.normSquared = function(v) {
    var s = 0, n = v.length, i;
    for (i = 0; i < n; i++) s += v[i] * v[i];
    return s;
  };
  stat.vector.norm = function(v) {
    return Math.sqrt(stat.vector.normSquared(v));
  };
  stat.vector.normalize = function(v0) {
    var v = [], eps = 1 / 1024, r = stat.vector.norm(v0), n = v0.length, i;
    if (r < eps) {
      console.error("The vector [" + v0 + "] has almost zero norm!");
      return;
    }
    for (i = 0; i < n; i++) v.push(v0[i] / r);
    return v;
  };
  stat.vector.cross = function(u, v) {
    return [ u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0] ];
  };
  stat.vector.dot = function(v0, v1) {
    var n = v0.length, s = 0, i;
    for (i = 0; i < n; i++) s += v0[i] * v1[i];
    return s;
  };
  stat.vector.degree = function(v0, v1) {
    return 180 * (stat.vector.radian(v0, v1) / Math.PI);
  };
  stat.vector.radian = function(v0, v1) {
    var normalize = stat.vector.normalize, dot = stat.vector.dot, c = dot(normalize(v0), normalize(v1));
    return c < -1 ? Math.PI : c > 1 ? 0 : Math.acos(c);
  };
  stat.matrix = {};
  stat.matrix.new = function(numrow, numcol, val) {
    var m = [], initval = val || 0, i;
    for (i = 0; i < numrow; i++) m.push(stat.array(numcol, initval));
    return m;
  };
  stat.matrix.assignScalar = function(m, s) {
    var numrow = m.length, numcol = m[0].length, i, j;
    for (i = 0; i < numrow; i++) for (j = 0; j < numcol; j++) m[i][j] = s;
    return m;
  };
  stat.matrix.add = function(m0, m1) {};
  stat.matrix.scalar = function(s, m0) {};
  stat.matrix.subtract = function(m0, m1) {};
  if (typeof define === "function" && define.amd) {
    define(stat);
  } else if (typeof module === "object" && module.exports) {
    module.exports = stat;
  }
  this.stat = stat;
}();
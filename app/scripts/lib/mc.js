!function() {
  var mc = {
    version: "1.0.0"
  };
  if (typeof define === "function" && define.amd) {
    define(mc);
  } else if (typeof module === "object" && module.exports) {
    module.exports = mc;
  } else {
    this.mc = mc;
  }
}();
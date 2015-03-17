  if (typeof define === "function" && define.amd) {
    define(chopper);
  } else if (typeof module === "object" && module.exports) {
    module.exports = chopper;
  } else {
    this.chopper = chopper;
  }
}();

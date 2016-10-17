(function (global) {
var Camera = function (options) {
  _.extend(this, _.defaults(options || {}, {
    map: null,
    x: 0,
    y: 0,
    scale_x: 1,
    scale_y: 1
  }));
};
Camera.prototype = {
  ij: function (i, j) {
    var loc = this.map.get_location(i, j);
    var x = -loc.x;
    var y = -loc.y;
    this.map.cont.x = x;
    this.map.cont.y = y;
  }
};

global.Camera = Camera;
})(this);

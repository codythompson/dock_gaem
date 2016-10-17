(function (global) {
var Camera = function (options) {
  _.extend(this, _.defaults(options || {}, {
    i: 0,
    j: 0,
    map: null
  }));
  this.ij();
};
Camera.prototype = {
  ij: function (i, j) {
    if (arguments.length === 0) {
      i = this.i;
      j = this.j;
    }

    this.i = i;
    this.j = j;
    var loc = this.map.get_location(i, j);
    var x = -(loc.x * this.map.cont.scale.x);
    var y = -(loc.y * this.map.cont.scale.y);
    this.map.cont.x = x;
    this.map.cont.y = y;

    return {
      i: i,
      j: j
    };
  },
  pan: function (x, y) {
    var coord = this.map.get_tile_coord(x, y);
    return this.ij(this.i + coord.i, this.j + coord.j);
  },
  scale: function (x, y) {
    if (arguments.length === 1) {
      y = x;
    }

    this.map.cont.scale.set(x, y);
    this.ij();

    return {
      scale_x: this.map.cont.scale.x,
      scale_y: this.map.cont.scale.y
    };
  }
};

global.Camera = Camera;
})(this);

var Controls = function (options) {
  _.extend(this, _.defaults(options || {}, {
    el: window,
    camera: null,
  }));

  this.touchstart = this.touchstart.bind(this);
  this.touchmove = this.touchmove.bind(this);
  this.touchend = this.touchend.bind(this);
  this.el.addEventListener('touchstart', this.touchstart);
  this.el.addEventListener('touchmove', this.touchmove);
  this.el.addEventListener('touchend', this.touchend);
};
Controls.prototype = {
  last_loc: null,

  get_loc: function (e) {
    var x = e.changedTouches[e.changedTouches.length - 1].pageX;
    var y = e.changedTouches[e.changedTouches.length - 1].pageY;
    return {
      x: x,
      y: y
    };
  },
  get_diff: function (start_loc, end_loc) {
    var x = end_loc.x - start_loc.x;
    var y = end_loc.y - start_loc.y;
    return {
      x: x,
      y: y
    };
  },

  touchstart: function (e) {
    this.last_loc = this.get_loc(e);
  },
  touchmove: function (e) {
    if (!this.last_loc) {
      return;
    }

    var loc = this.get_loc(e);
    var diff = this.get_diff(this.last_loc, loc);
    camera.pan(-diff.x, -diff.y);
    this.last_loc = loc;
  },
  touchend: function (e) {
    this.touchmove(e);
    this.last_loc = null;
  },
};

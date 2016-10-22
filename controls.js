var Controls = function (options) {
  _.extend(this, _.defaults(options || {}, {
    mode: Controls.modes.drag,
    drag_controls: new DragControls(options),
    select_box_controls: new SelectBoxControls(options),
  }));
  this.set_mode();
};
Controls.prototype = {
  set_mode: function (mode) {
    if (arguments.length === 0) {
      mode = this.mode;
    }

    this.drag_controls.locked = true;
    if (mode === Controls.modes.drag) {
      this.drag_controls.locked = false;
    }

    this.select_box_controls.locked = true;
    if (mode === Controls.modes.select_box) {
      this.select_box_controls.locked = false;
    }
  }
};
Controls.modes = {
  drag       : 0,
  select_box : 1
};
var DragControls = function (options) {
  _.extend(this, _.defaults(options || {}, {
    el: window,
    camera: null,
  }));
  this.last_loc = null;
  this.locked = true;

  this.touchstart = this.touchstart.bind(this);
  this.touchmove = this.touchmove.bind(this);
  this.touchend = this.touchend.bind(this);
  this.el.addEventListener('touchstart', this.touchstart);
  this.el.addEventListener('touchmove', this.touchmove);
  this.el.addEventListener('touchend', this.touchend);
};
DragControls.prototype = {
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
    if (this.locked) {
      this.last_loc = null;
      return;
    }
    this.last_loc = this.get_loc(e);
  },
  touchmove: function (e) {
    if (this.locked) {
      this.last_loc = null;
      return;
    }
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

var SelectBoxControls = function (options) {
  _.extend(this, _.defaults(options || {}, {
    el: window,
    camera: null
  }));
  this.start_loc = null;
  this.locked = true;

  this.touchstart = this.touchstart.bind(this);
  this.touchmove = this.touchmove.bind(this);
  this.touchend = this.touchend.bind(this);
  this.el.addEventListener('touchstart', this.touchstart);
  this.el.addEventListener('touchmove', this.touchmove);
  this.el.addEventListener('touchend', this.touchend);
};
SelectBoxControls.prototype = {
  get_loc: function (e) {
    var x = e.changedTouches[e.changedTouches.length - 1].pageX;
    var y = e.changedTouches[e.changedTouches.length - 1].pageY;
    return {
      x: x,
      y: y
    };
  },
  touchstart: function (e) {
    if (this.locked) {
      return;
    }

    var loc = this.get_loc(e);
    var ij = this.camera.ij_from_xy(loc.x, loc.y);
    this.camera.map.select(Math.floor(ij.i), Math.floor(ij.j));
  },
  touchmove: function (e) {},
  touchend: function (e) {}
};

var Controls = function (options) {
  _.extend(this, _.defaults(options || {}, {
    mode: Controls.modes.drag,
    drag_controls: new DragControls(options),
    select_box_controls: new SelectBoxControls(options),
  }));
  this.set_mode();
};
Controls.prototype = {
  update: function () {
    this.select_box_controls.update();
  },

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
    camera: null,
    on_select: null
  }));
  this.start_loc = null;
  this.end_loc = null;
  this.ended = false;
  this.locked = true;
  this.selected = [];

  this.touchstart = this.touchstart.bind(this);
  this.touchmove = this.touchmove.bind(this);
  this.touchend = this.touchend.bind(this);
  this.el.addEventListener('touchstart', this.touchstart);
  this.el.addEventListener('touchmove', this.touchmove);
  this.el.addEventListener('touchend', this.touchend);
};
SelectBoxControls.prototype = {
  update: function () {
    // unselect everything
    for (var i = 0; i < this.selected.length; i++) {
      var sel_ij = this.selected[i];
      this.camera.map.deselect(sel_ij.i, sel_ij.j);
    }
    this.selected = [];

    // if no start loc or locked, reset and exit early
    if (!this.start_loc || this.locked) {
      this.start_loc = null;
      this.end_loc = null;
      return;
    }

    var start = this.camera.ij_from_xy(this.start_loc.x, this.start_loc.y);
    var end = (this.end_loc && this.camera.ij_from_xy(this.end_loc.x, this.end_loc.y)) || start;
    var start_i = Math.floor(Math.min(start.i, end.i));
    var start_j = Math.floor(Math.min(start.j, end.j));
    var end_i = Math.floor(Math.max(start.i, end.i));
    var end_j = Math.floor(Math.max(start.j, end.j));

    for (var i = start_i; i <= end_i; i++) {
      for (var j = start_j; j <= end_j; j++) {
        this.selected.push({i: i, j: j});
        this.camera.map.select(i, j);
      }
    }

    if (this.ended) {
      this.ended = false;
      this.on_select && this.on_select(this.selected);
    }
  },

  clear: function () {
    this.start_loc = null;
  },

  get_loc: function (e) {
    var x = e.changedTouches[e.changedTouches.length - 1].pageX;
    var y = e.changedTouches[e.changedTouches.length - 1].pageY;
    return {
      x: x,
      y: y
    };
  },
  touchstart: function (e) {
    this.start_loc = this.get_loc(e);
  },
  touchmove: function (e) {
    this.end_loc = this.get_loc(e);
  },
  touchend: function (e) {
    this.end_loc = this.get_loc(e);
    this.ended = true;
  },
};

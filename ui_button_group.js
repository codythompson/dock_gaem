(function (global) {
var UIButtonGroup = function (options) {
  options = _.defaults(options || {}, {
    buttons: [],
    on_select: null,
  });
  _.extend(this, options);
  this.selected = null;

  var self = this;
  var create_on_tap = function (ix, orig_cb) {
    return function () {
      orig_cb && orig_cb();
      self.select(ix);
    };
  };
  var create_on_touch_out = function (ix, orig_cb) {
    return function () {
      orig_cb && orig_cb();
      if (ix === self.selected) {
        self.buttons[ix].select();
      }
    };
  };
  for (var i = 0; i < options.buttons.length; i++) {
    var button = options.buttons[i];
    var orig_tap = button.on_tap || null;
    button.on_tap = create_on_tap(i, orig_tap);
    var orig_out = button.on_touch_out || null;
    button.on_touch_out = create_on_touch_out(i, orig_out);
  }
};
UIButtonGroup.prototype = {
  select: function (ix) {
    for (var i = 0; i < this.buttons.length; i++) {
      var button = this.buttons[i];
      if (ix === i) {
        this.selected = ix;
        button.select();
      } else {
        button.deselect();
      }
    }
    this.on_select && this.on_select(ix);
  }
};

global.UIButtonGroup = UIButtonGroup;
})(this);

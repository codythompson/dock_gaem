(function (global) {
var UIButtonGroup = function (options) {
  options = _.defaults(options || {}, {
    buttons: [],
    on_select: null,
  });

  var self = this;
  var create_on_tap = function (ix, orig_cb) {
    return function () {
      orig_cb.apply(this, arguments);
      var button = self.buttons[ix];
      for (var i = 0; i < self.buttons.length; i++) {
        var button = self.buttons[i];
        if (ix !== i) {
          button.deselect();
        }
      }
      self.on_select && self.on_select(ix);
    }
  };
  for (var i = 0; i < options.buttons.length; i++) {
    var button = options.buttons[i];
    var orig_tap =  button.on_tap || null;
    button.on_tap = create_on_tap(i, orig_tap);
  }
};

global.UIButtonGroup = UIButtonGroup;
})(this);

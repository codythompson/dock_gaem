(function (global) {
var ui_manager = {
  controls: null,
  el: null,

  init: function (options) {
    _.extend(this, _.defaults(options || {}, {
      controls: null,
      el: document.getElementById('dock_gaem_ui_left')
    }));
  }
};
})(this);

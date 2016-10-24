(function (global) {
var UIContainer = function (options) {
  options = _.defaults(options || {}, {
    bg_color: 0xffffff,
    bg_opacity: 0.5,
    x: window.innerWidth / -2,
    y: window.innerHeight / -2,
    w: 200,
    h: window.innerHeight,
    visible: false
  });

  this.bg = new PIXI.Graphics();
  this.bg.beginFill(options.bg_color, options.bg_opacity);
  this.bg.lineStyle(0, 0, 0);
  this.bg.drawRect(0, 0, options.w, options.h);
  this.bg.endFill();

  this.cont = new PIXI.Container();
  this.cont.x = options.x;
  this.cont.y = options.y;
  this.cont.visible = options.visible;
  this.cont.addChild(this.bg);

  dock_gaem.stage.addChild(this.cont);
};
UIContainer.prototype = {
  add_button: function (ui_button) {
    this.cont.addChild(ui_button.cont);
  }
};

global.UIContainer = UIContainer;
})(this);

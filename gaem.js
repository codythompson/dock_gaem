(function (global) {

var test_setup = function (gaem) {
  // TileSet.create_sprites('dock', 0, 0, null);
  // TileSet.create_sprites('dock', 0, 0, null);
  // TileSet.create_sprites('water', 1, 1, null);
  tm = new TileMap();
  gaem.stage.scale.set(0.5);
};

var dock_gaem = {
  renderer: null,
  stage: null,

  init: function () {
    this.renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0x88ff88});
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    init_assets();

    test_setup(this);

    var self = this;
    this._update_closure = function () {
      self.update();
    };
    this._update_closure();
  },

  update: function () {
    requestAnimationFrame(this._update_closure);

    this.renderer.render(this.stage);
  },
};

global.dock_gaem = dock_gaem;

window.addEventListener('load', function () {
  dock_gaem.init();
});

})(this);

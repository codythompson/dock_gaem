(function (global) {

var test_setup = function (gaem) {
  SpritePool.create('rect_med', 'assets/rect_med.png');
  var sprots = TileSet.sets.ground.create_sprites(0, 0, null);
  for (var i = 0; i < sprots.length; i++) {
    sprots[i].visible = true;
  }
  sprots = TileSet.sets.ground.create_sprites(2, 1, null);
  for (var i = 0; i < sprots.length; i++) {
    sprots[i].visible = true;
  }
};

var dock_gaem = {
  renderer: null,
  stage: null,

  init: function () {
    this.renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor : 0x88ff88});
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

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

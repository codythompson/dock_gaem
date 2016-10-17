(function (global) {

var test_setup = function (gaem) {
  tm = new TileMap({
  });
  gaem.stage.addChild(tm.cont);

  camera = new Camera({map: tm});
  camera.ij((tm.get_tiles_wide()-1)/2, (tm.get_tiles_high()-1)/2);
  camera.scale(0.3);

  cross_hair = PIXI.Sprite.fromImage('assets/rect_med.png');
  cross_hair.anchor.x = 0.5;
  cross_hair.anchor.y = 0.5;
  cross_hair.scale.set(0.1);
  cross_hair.tint = 0xff0000;
  gaem.stage.addChild(cross_hair);


};

var dock_gaem = {
  renderer: null,
  stage: null,
  camera: null,
  w: null,
  h: null,

  init: function () {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    this.renderer = PIXI.autoDetectRenderer(this.w, this.h, {backgroundColor : 0x88ff88});
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.stage.x = this.renderer.width / 2;
    this.stage.y = this.renderer.height / 2;

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

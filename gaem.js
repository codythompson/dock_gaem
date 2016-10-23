(function (global) {

var test_setup = function (gaem) {
  tm = new TileMap({
    tiles_wide: 5,
    tiles_high: 5,
  });
  gaem.stage.addChild(tm.cont);

  var camera = new Camera({map: tm});
  camera.ij((tm.get_tiles_wide()-1)/2, (tm.get_tiles_high()-1)/2);
  camera.scale(0.3);

  var ctrls = new Controls({
    camera: camera,
    mode: Controls.modes.select_box
  });

  dock_gaem.camera = camera;
  dock_gaem.controls = ctrls;

  cross_hair = PIXI.Sprite.fromImage('assets/rect_med.png');
  cross_hair.anchor.x = 0.5;
  cross_hair.anchor.y = 0.5;
  cross_hair.scale.set(0.1);
  cross_hair.tint = 0xff0000;
  gaem.stage.addChild(cross_hair);

  stats = new Stats();
  document.body.appendChild(stats.dom);
};

var dock_gaem = {
  renderer: null,
  stage: null,
  camera: null,
  controls: null,
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

    stats.begin();

    this.controls && this.controls.update();
    this.renderer.render(this.stage);

    stats.end();
  },
};

global.dock_gaem = dock_gaem;

window.addEventListener('load', function () {
  dock_gaem.init();
});

})(this);

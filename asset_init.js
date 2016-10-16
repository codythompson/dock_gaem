(function (global) {

var init_assets = function () {
  SpritePool.create('land', {
    path: 'assets/noise_med.png',
    color: 0xcccc66
  });
  SpritePool.create('dock', {
    path: 'assets/dock_med.png',
    color: 0xffffff
  });
  SpritePool.create('water', {
    path: 'assets/water_med.png',
    color: 0xffffff
  });

  TileSet.create('land');
  TileSet.create('dock');
  TileSet.create('water');
};

global.init_assets = init_assets;

})(this);

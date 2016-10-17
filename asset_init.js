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
  SpritePool.create('grid', 'assets/rect_med.png');

  TileSet.create('land');
  TileSet.create('dock');
  TileSet.create('water');
  TileSet.create('grid');
};

global.init_assets = init_assets;

})(this);

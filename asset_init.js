(function (global) {

var init_assets = function () {
  SpritePool.create('land', 'assets/rect_med.png');
  SpritePool.create('dock', {
    path: 'assets/rect_med.png',
    color: 0xdddd88
  });
  SpritePool.create('water', {
    path: 'assets/rect_med.png',
    color: 0x88dddd
  });

  TileSet.create('land');
  TileSet.create('dock');
  TileSet.create('water');
};

global.init_assets = init_assets;

})(this);

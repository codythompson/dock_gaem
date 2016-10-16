(function (global) {

var TileMap = function (options) {
  options = _.defaults(options || {}, {
    default_tile_set: 'land',
    tiles_wide: 10,
    tiles_high: 10,
  });

  var tiles = []
  for (var j = 0; j < options.tiles_high; j++) {
    var row = [];
    for (var i = 0; i < options.tiles_wide; i++) {
      var cont = TileSet.create_sprites(options.default_tile_set, i, j, this);
      dock_gaem.stage.addChild(cont);
      row.push({
        tile_set: options.default_tile_set,
        cont: cont
      });
    }
    tiles.push(row);
  }
};

global.TileMap = TileMap;

})(this);

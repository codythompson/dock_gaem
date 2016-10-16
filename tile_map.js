(function (global) {

var TileMap = function (options) {
  options = _.defaults(options || {}, {
    default_tile_set: 'land',
    tiles_wide: 10,
    tiles_high: 10,
  });

  var tiles = []
  for (var i = 0; i < options.tiles_wide; i++) {
    var column = [];
    for (var j = 0; j < options.tiles_high; j++) {
      var cont = TileSet.create_sprites(options.default_tile_set, i, j);
      dock_gaem.stage.addChild(cont);
      column.push({
        tile_set: options.default_tile_set,
        cont: cont
      });
    }
    tiles.push(column);
  }
  this.tiles = tiles;
};
TileMap.prototype = {
  set: function (tile_set, i, j) {
    this.release(i, j);
    var cont = TileSet.create_sprites(tile_set, i, j);
    this.tiles[i][j].tile_set = tile_set;
    this.tiles[i][j].cont = cont;
    dock_gaem.stage.addChild(cont);
  },

  release: function (i, j) {
    var tile = this.tiles[i][j];
    dock_gaem.stage.removeChild(tile.cont);
    TileSet.release_sprites(tile.tile_set, tile.cont, i, j);
    tile.tile_set = null;
  },
};

global.TileMap = TileMap;

})(this);
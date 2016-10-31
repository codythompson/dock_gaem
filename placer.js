(function (global) {
var Placer = {
  place_tiles: function (tile_set, tiles, map) {
    for (var i = 0; i < tiles.length; i++) {
      var tile = tiles[i];
      map.set(tile_set, tile.i, tile.j);
    }
  }
};
global.Placer = Placer;
})(this);

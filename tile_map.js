(function (global) {

var TileMap = function (options) {
  options = _.defaults(options || {}, {
    default_tile_set: 'land',
    grid_tile_set: 'grid',
    tiles_wide: 10,
    tiles_high: 10,
    tile_w: 256,
    tile_h: 256,
    cont: new PIXI.Container(),
  });
  this.tile_w = options.tile_w;
  this.tile_h = options.tile_h;
  this.cont = options.cont;
  this.tile_cont = new PIXI.Container();
  this.grid_cont = new PIXI.Container();
  this.cont.addChild(this.tile_cont);
  this.cont.addChild(this.grid_cont);

  var tiles = []
  for (var i = 0; i < options.tiles_wide; i++) {
    var column = [];
    for (var j = 0; j < options.tiles_high; j++) {
      var cont = TileSet.create_sprites(options.default_tile_set, i, j, this);
      this.tile_cont.addChild(cont);
      var grid_cont = TileSet.create_sprites(options.grid_tile_set, i, j, this);
      this.grid_cont.addChild(grid_cont);
      column.push({
        tile_set: options.default_tile_set,
        cont: cont,
        grid_cont: grid_cont,
        selected: false
      });
    }
    tiles.push(column);
  }
  this.tiles = tiles;
};
TileMap.prototype = {
  get: function (i, j) {
    return (this.tiles[i] && this.tiles[i][j]) || null;
  },

  select: function (i, j) {
    var tile = this.get(i, j);
    if (!tile) {
      return;
    }
    tile.selected = true;
    TileSet.select(tile.tile_set, tile.cont, i, j, this);
  },
  deselect: function (i, j) {
    var tile = this.get(i, j);
    if (!tile) {
      return;
    }
    tile.selected = false;
    TileSet.deselect(tile.tile_set, tile.cont, i, j, this);
  },

  set: function (tile_set, i, j) {
    this.release(i, j);
    var cont = TileSet.create_sprites(tile_set, i, j, this);
    this.tiles[i][j].tile_set = tile_set;
    this.tiles[i][j].cont = cont;
    dock_gaem.stage.addChild(cont);
  },

  release: function (i, j) {
    var tile = this.tiles[i][j];
    dock_gaem.stage.removeChild(tile.cont);
    TileSet.release_sprites(tile.tile_set, tile.cont, i, j, this);
    tile.tile_set = null;
  },

  get_location: function (i, j) {
    var x = i * this.tile_w;
    var y = j * this.tile_h;

    return {
      x: x,
      y: y
    };
  },

  get_tile_coord: function (x, y) {
    var i = x / (this.tile_w * this.cont.scale.x);
    var j = y / (this.tile_h * this.cont.scale.y);

    return {
      i: i,
      j: j
    };
  },

  get_tiles_wide: function () {
    return this.tiles.length;
  },
  get_tiles_high: function () {
    return this.tiles[0].length;
  },
};

global.TileMap = TileMap;

})(this);

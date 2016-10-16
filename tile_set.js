(function (global) {
var TileSet = function (options) {
  _.extend(this, _.defaults(options, {
    name: null,
    tile_w: 256,
    tile_h: 256,
    create_sprites: function (i, j, map) {
      throw '[dock][TileSet][create_sprites] no create_sprites function specified for: ' + options.name;
    }
  }));
};
TileSet.prototype = {
  get_location: function (i, j) {
    var x = (i * this.tile_w) + (this.tile_w / 2);
    var y = (j * this.tile_h) + (this.tile_h / 2);
    return {
      x: x,
      y: y
    };
  }
};
TileSet.sets = {
  ground : new TileSet({
    name: 'ground',
    create_sprites: function (i, j, map) {
      var sprite = SpritePool.get('rect_med');
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;

      var loc = this.get_location(i, j);
      sprite.x = loc.x;
      sprite.y = loc.y;

      return [sprite];
    }
  }),

};


global.TileSet = TileSet;

})(this);

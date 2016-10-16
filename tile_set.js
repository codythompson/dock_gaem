(function (global) {
var TileSet = function (options) {
  _.extend(this, _.defaults(options, {
    name: null,
    tile_w: 256,
    tile_h: 256,
    create_sprites: function (i, j) {
      throw '[dock][TileSet][create_sprites] no create_sprites function specified for: ' + options.name;
    },
    release_sprites: function (cont, i, j) {
      throw '[dock][TileSet][release_sprites] no release_sprites function specified for: ' + options.name;
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
TileSet.sets = {};
TileSet.create = function (name, options) {
  options = _.defaults(options || {}, {
    name: name,
    create_sprites: function (i, j) {
      var sprite = SpritePool.get(name);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;

      var loc = this.get_location(i, j);
      sprite.x = loc.x;
      sprite.y = loc.y;

      var cont = new PIXI.Container();
      cont.addChild(sprite);

      return cont;
    },
    release_sprites: function (cont, i, j) {
      cont.visible = false;
      SpritePool.release(name, cont.children[0]);
      cont.removeChildAt(0);
    }
  });
  var tile_set = new TileSet(options);
  TileSet.sets[tile_set.name] = tile_set;
};
TileSet.create_sprites = function (name, i, j) {
  return TileSet.sets[name].create_sprites(i, j);
};
TileSet.release_sprites = function (name, cont, i, j) {
  TileSet.sets[name].release_sprites(cont, i, j);
};

global.TileSet = TileSet;

})(this);
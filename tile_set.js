(function (global) {
var TileSet = function (options) {
  _.extend(this, _.defaults(options, {
    name: null,
    tile_w: 256,
    tile_h: 256,
    create_sprites: function (i, j, map) {
      throw '[dock][TileSet][create_sprites] no create_sprites function specified for: ' + options.name;
    },
    release_sprites: function (cont, i, j, map) {
      throw '[dock][TileSet][release_sprites] no release_sprites function specified for: ' + options.name;
    }
  }));
};
TileSet.sets = {};
TileSet.create = function (name, options) {
  options = _.defaults(options || {}, {
    name: name,
    create_sprites: function (i, j, map) {
      var sprite = SpritePool.get(name);
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;


      var cont = new PIXI.Container();
      var loc = map.get_location(i, j);
      cont.x = loc.x;
      cont.y = loc.y;
      cont.addChild(sprite);

      return cont;
    },
    release_sprites: function (cont, i, j, map) {
      cont.visible = false;
      SpritePool.release(name, cont.children[0]);
      cont.removeChildAt(0);
    }
  });
  var tile_set = new TileSet(options);
  TileSet.sets[tile_set.name] = tile_set;
};
TileSet.create_sprites = function (name, i, j, map) {
  return TileSet.sets[name].create_sprites(i, j, map);
};
TileSet.release_sprites = function (name, cont, i, j, map) {
  TileSet.sets[name].release_sprites(cont, i, j, map);
};

global.TileSet = TileSet;

})(this);

(function (global) {

var SpritePool = function (options) {
  options = _.defaults(options, {
    path: null,
    color: 0xffffff,
    initial_size: 10
  });
  this.texture = new PIXI.Texture.fromImage(options.path);
  this.color = options.color;
  this.pool = [];
  for (var i = 0; i < options.initial_size; i++) {
    var pool_obj = {
      in_use: false,
      sprite: new PIXI.Sprite(this.texture)
    };
    // pool_obj.sprite.visible = false;
    pool_obj.sprite.tint = this.color;
    this.pool.push(pool_obj);
  }

};
SpritePool.prototype = {
  release: function (sprite) {
    for (var i = 0; i < this.pool.length; i++) {
      var pool_obj = this.pool[i];
      if (pool_obj.sprite == sprite) {
        // pool_obj.sprite.visible = false;
        pool_obj.in_use = false;
        return;
      }
    }
    throw '[dock][SpritePool][release] sprite not found';
  },

  get: function () {
    // TODO don't start the search from 0 every time
    for (var i = 0; i < this.pool.length; i++) {
      var pool_obj = this.pool[i];
      if (!pool_obj.in_use) {
        pool_obj.in_use = true;
        return pool_obj.sprite;
      }
    }
    // we need to create a new sprite
    var sprite = new PIXI.Sprite(this.texture);
    sprite.tint = this.color;
    var pool_obj = {
      in_use: true,
      sprite: sprite
    };
    this.pool.push(pool_obj);
    return sprite;
  }
};
SpritePool.pools = {};
SpritePool.get = function (name) {
  return SpritePool.pools[name].get();
};
SpritePool.release = function (name, sprite) {
  SpritePool.pools[name].release(sprite);
}
SpritePool.create = function (name, options) {
  if (typeof options === 'string') {
    options = {
      path: options
    };
  }
  SpritePool.pools[name] = new SpritePool(options);
};

global.SpritePool = SpritePool;
})(this);

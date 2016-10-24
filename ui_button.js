(function (global) {
var UIButton = function (options) {
  options = _.defaults(options || {}, {
    up_sprites: [],
    down_sprites: [],
    x: 0,
    y: 0,
    w: null,
    h: null,
    ui_containter: null
  });

  if (options.w === null) {
    options.w = 0;
    for (var i = 0; i < options.up_sprites.length; i++) {
      if (options.w < options.up_sprites[i].width) {
        options.w = options.up_sprites[i].width;
      }
    }
    for (var i = 0; i < options.down_sprites.length; i++) {
      if (options.w < options.down_sprites[i].width) {
        options.w = options.down_sprites[i].width;
      }
    }
  }
  if (options.h === null) {
    options.h = 0;
    for (var i = 0; i < options.up_sprites.length; i++) {
      if (options.h < options.up_sprites[i].height) {
        options.h = options.up_sprites[i].height;
      }
    }
    for (var i = 0; i < options.down_sprites.length; i++) {
      if (options.h < options.down_sprites[i].height) {
        options.h = options.down_sprites[i].height;
      }
    }
  }
  this.up_sprites = options.up_sprites;
  this.down_sprites = options.down_sprites;

  this.cont = new PIXI.Container();
  this.cont.x = options.x;
  this.cont.y = options.y;
  this.cont.width = options.w;
  this.cont.height = options.h;
  this.cont.interactive = true;

  var self = this;
  this.cont.touchstart = function (e) {
    self.touchstart(e);
  };
  this.cont.touchend = function (e) {
    self.touchend(e);
  };

  for (var i; i < options.up_sprites.length; i++) {
    this.cont.addChild(options.up_sprites[i]);
  }
  for (var i; i < options.down_sprites.length; i++) {
    this.cont.addChild(options.down_sprites[i]);
  }
};
UIButton.prototype = {
  select: function () {
    for (var i = 0; i < this.down_sprites.length; i++) {
      this.down_sprites[i].visible = true;
    }
    for (var i = 0; i < this.up_sprites.length; i++) {
      this.up_sprites[i].visible = false;
    }
  },
  deselect: function () {
    for (var i = 0; i < this.up_sprites.length; i++) {
      this.up_sprites[i].visible = true;
    }
    for (var i = 0; i < this.down_sprites.length; i++) {
      this.down_sprites[i].visible = false;
    }
  },
  touchstart: function (e) {
    this.select();
  },
  touchend: function (e) {
    this.deselect();
  },
};

global.UIButton = UIButton;
})(this);

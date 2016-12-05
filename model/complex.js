'use strict';

(function (scope) {

var Complex = function (init_obj) {
  init_obj = init_obj || {};
  init_obj.data_type = init_obj.data_type || 'Complex';
  scope.model.DataObject.call(this, init_obj);

  this.tiles = this.tiles || [];
  this.x = this.x || 0;
  this.y = this.y || 0;
  this.scale_x = this.scale_x || 0;
  this.scale_y = this.scale_y || 0;
  this.rotation = this.rotation || 0;
};
Complex.prototype = Object.create(scope.model.DataObject.prototype);

Complex.prototype.expand = function (w, h) {
  if (!this.tiles) {
    this.tiles = [];
  }
  for (var i = this.tiles.length; i < w; i++) {
    this.tiles.push([]);
  }
  for (i = 0; i < this.tiles.length; i++) {
    var col = this.tiles[i];
    for (var j = col.length; j < h; j++) {
      col.push(null);
    }
  }
};

Complex.prototype.tiles_wide = function () {
  if (!this.tiles) {
    return 0;
  }
  return this.tiles.length;
};

Complex.prototype.tiles_high = function (at_i) {
  at_i = at_i || 0;

  if (!this.tiles || this.tiles.length <= at_i) {
    return 0;
  } else {
    return this.tiles[at_i].length;
  }
};

Complex.prototype.get_tile = function (i, j) {
  if (i < 0 || i >= this.tiles_wide() || j < 0 || j >= this.tiles_high()) {
    return null;
  } else {
    return this.tiles[i][j];
  }
};

Complex.prototype.set_tile = function (i, j, tile) {
  if (i < 0 || j < 0 || isNaN(i) || isNaN(j)) {
    throw '[model][Complex][set_tile] bad indices: ('+i+','+j+')';
  }

  this.expand(i+1, j+1);
  this.tiles[i][j] = tile;
};

scope.model.Complex = Complex;

})(window.$dock_game);

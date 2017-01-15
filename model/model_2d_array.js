'use strict';

(function (scope) {

var Model2DArray = function (args) {
  scope.ModelObject.call(this, 'ModelTileArray');
  args = scope.ModelObject.defaults(args, {
    width: 0,
    height: 0,
    array: null
  });

  var array = [];
  if (args.array) {
    for (var i = 0; i < args.array.length; i++) {
      var col_copy = [];
      var col = args.array[i];
      for (var j = 0; j < col.length; j++) {
        var obj = col[j];
        if (obj instanceof scope.ModelObject) {
          obj.parent = this;
        }
        col_copy.push(obj);
      }
      array.push(col_copy);
    }
  } else {
    for (var i = 0; i < args.width; i++) {
      var col = [];
      for (var j = 0; j < args.height; j++) {
        col.push(null);
      }
      array.push(col);
    }
  }

  /*
   * properties
   */
  Object.defineProperty(this, 'width', {
    get: function () { return array.length; }
  });
  Object.defineProperty(this, 'height', {
    get: function () { return array.length && array[0].length; }
  });

  /*
   * methods
   */
  this.set = (function (i, j, obj) {
    this.check_bounds(i, j);
    this.dirty = true;
    var old_obj = this.get(i, j);
    if (old_obj instanceof scope.ModelObject) {
      old_obj.parent = null;
    }
    if (obj instanceof scope.ModelObject) {
      obj.parent = this;
    }
    array[i][j] = obj;
  }).bind(this);

  this.get = (function (i, j) {
    this.check_bounds(i, j);
    return array[i][j];
  }).bind(this);
};

Model2DArray.prototype = Object.create(scope.ModelObject.prototype);

Model2DArray.prototype.check_bounds = function (i, j) {
  if (i < 0 || j < 0 || i >= this.width || j >= this.height) {
    throw '[Model2DArray] '+i+','+j+' out of bounds';
  }
};

scope.Model2DArray = Model2DArray;

})(window.$dock.model);

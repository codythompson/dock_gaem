'use strict';

(function (scope) {

var ModelArray = function (args) {
  scope.ModelObject.call(this, 'ModelArray');
  args = scope.ModelObject.defaults(args, {
    length: 0,
    array: null
  });

  var array = [];
  if (args.array) {
    for (var i = 0; i < args.array.length; i++) {
      var obj = args.array[i];
      if (obj instanceof scope.ModelObject) {
        obj.parent = this;
      }
      array.push(obj);
    }
  } else {
    for (var i = 0; i < args.length; i++) {
      array.push(null);
    }
  }

  /*
   * properties
   */
  Object.defineProperty(this, 'length', {
    get: function () { return array.length; }
  });

  /*
   * methods
   */
  this.set = (function (i, obj) {
    this.check_boundss(i);
    this.dirty = true;
    var old_obj = this.get(i);
    if (old_obj instanceof scope.ModelObject) {
      old_obj.parent = null;
    }
    if (obj instanceof scope.ModelObject) {
      obj.parent = this;
    }
    array[i] = obj;
  }).bind(this);

  this.get = (function (i) {
    this.check_bounds(i);
    return array[i];
  }).bind(this);
};

ModelArray.prototype = Object.create(scope.ModelObject.prototype);

ModelArray.prototype.check_bounds = function (i) {
  if (i < 0 || i >= this.width) {
    throw '[ModelArray] '+i+' out of bounds';
  }
};

scope.ModelArray = ModelArray;

})(window.$dock_game.model);

'use strict';

(function (scope) {

var Type = function (init_obj) {
  init_obj = init_obj || {};
  init_obj.type = init_obj.type || 'Type';

  scope.model.DataObject.call(this, init_obj);

  this.names = [];
};

Type.prototype = Object.create(scope.model.DataObject.prototype);

Type.prototype.get_name = function (level) {
  level = level || 0;

  if (level >= 0 && level < this.names.length) {
    return this.names[level];
  } else {
    return null;
  }
};

Type.prototype.set_name = function (level, name) {
  this.names[level] = name;
};

scope.model.Type = Type;

})(window.$dock_game);

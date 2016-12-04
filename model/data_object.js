'use strict';

(function (scope) {

var DataObject = function (init_obj) {
  this.dirty = false;

  if (typeof init_obj === 'object') {
    this.type = init_obj.type || 'DataObject';

    var val;
    for (var field in init_obj) {
      val = init_obj[field];
      if (typeof val === 'object' && val.type) {
        this[field] = new scope.model[val.type](val);
      } else {
        this[field] = val;
      }
    }
  } else {
    this.type = 'DataObject';
  }
};
DataObject.prototype = {
  to_obj: function () {
    var obj = {};
    var val;
    for (var field in this) {
      val = this[field];
      if (typeof val === 'function') {
        continue;
      } else if (typeof val === 'object' && val instanceof DataObject) {
        obj[field] = val.to_obj();
      } else {
        obj[field] = val;
      }
    }
    return obj;
  }
};

scope.model.DataObject = DataObject;

})(window.$dock_game);

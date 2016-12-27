'use strict';

(function (scope) {

var Floor = function (init_obj) {
  init_obj = init_obj || {};
  init_obj.data_type = init_obj.data_type || 'Floor';
  scope.model.DataObject.call(this, init_obj);

  this.complexes = this.complexes || [];
};

scope.model.Floor = Floor;

})(window.$dock_game);

'use strict';

(function (scope) {

var World = function (init_obj) {
  init_obj = init_obj || {};
  init_obj.data_type = init_obj.data_type || 'World';
  scope.model.DataObject.call(this, init_obj);

  this.floors = this.floors || [];
  this.visible_floor = 0;

  this.x = this.x || 0;
  this.y = this.y || 0;
  this.scale_x = this.scale_x || 1;
  this.scale_y = this.scale_y || 1;
  this.rotation = this.rotation || 0;
};

scope.model.World = World;

})(window.$dock_game);

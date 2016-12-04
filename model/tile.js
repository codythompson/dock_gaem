(function (scope) {

var Tile = function (init_obj) {
  init_obj = init_obj || {};
  init_obj.data_type = init_obj.data_type || 'Tile';
  scope.model.DataObject.call(this, init_obj);

  this.type = this.type || null;
};
Tile.prototype = Object.create(scope.model.DataObject.prototype);

scope.model.Tile = Tile;

})(window.$dock_game);

(function (scope) {
var Tile = function (args) {
  scope.ModelObject.call(this, 'Tile', args, 
    [],
    {
      type: null
    }
  );
};
Tile.prototype = Object.create(scope.ModelObject.prototype);

scope.Tile = Tile;

})(window.$dock.model);

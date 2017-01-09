'use strict';

(function (scope) {
var Type = function (args) {
  args = args || {};
  if (Array.isArray(args.names)) {
    args.names = new scope.ModelArray({
      array: args.names
    });
  }
  scope.ModelObject.call(this, 'Type', args,
    [],
    {
      names: []
    }
  );
};
Type.prototype = Object.create(scope.ModelObject.prototype);

scope.Type = Type;

})(window.$dock_game.model);

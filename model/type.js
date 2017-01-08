'use strict';

(function (scope) {
var Type = function (args) {
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

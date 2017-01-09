'use strict';

(function (scope) {

var Floor = function (args) {
  if (Array.isArray(args.complexes)) {
    args.complexes = new scope.ModelArray({
      array: args.complexes
    });
  }
  scope.ModelObject.call(this, 'ModelObject', args, [], {
    complexes: null
  });
};

Floor.prototype = Object.create(scope.ModelObject.prototype);

scope.Floor = Floor;

})(window.$dock_game.model);

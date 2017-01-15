'use strict';

(function (scope) {

var World = function (args) {
  args = args || {};
  if (Array.isArray(args.floors)) {
    args.floors = new scope.ModelArray({
      array: args.floors
    });
  }
  scope.ModelObject.call(this, 'ModelObject', args, [], {
    floors: null,
    visible_floor: 0,
    x: 0,
    y: 0,
    scale_x: 1,
    scale_y: 1,
    rotation: 0
  });
};
World.prototype = Object.create(scope.ModelObject.prototype);

scope.World = World;

})(window.$dock_game.model);

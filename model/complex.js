'use strict';

(function (scope) {

var Complex = function (args) {
  args = args || {};
  if (Array.isArray(args.tile_array)) {
    args.tile_array = new scope.Model2DArray({
      array: args.tile_array
    });
  }
  scope.ModelObject.call(this, 'Complex', args, [], {
    tile_aray: null,
    x: 0,
    y: 0,
    scale_x: 1,
    scale_y: 1,
    rotation: 0
  });
};
Complex.prototype = Object.create(scope.ModelObject.prototype);

scope.Complex = Complex;

})(window.$dock.model);

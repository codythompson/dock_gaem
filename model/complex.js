'use strict';

(function (scope) {

var Complex = function (args) {
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

})(window.$dock_game.model);

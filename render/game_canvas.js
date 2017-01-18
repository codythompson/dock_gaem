'use strict';

(function (scope) {

var utils = $dock.utils;

/*
 * constructor
 */
var GameCanvas = function (args) {
  args = utils.process_args('GameCanvas', args, null, {
    parent_el: document.body,
    canvas: null,
    canvas_id: null
  });

  var canvas = this.build_canvas(args);
  this.size_canvas(args, canvas);
  if (typeof args.parent_el === 'string') {
    var parent_el = document.getElementById(args.parent_el) || null;
    if (parent_el) {
      parent_el.appendChild(canvas);
    }
  } else if (typeof args.parent_el.appendChild === 'function') {
    args.parent_el.appendChild(canvas);
  }

  this.canvas = canvas;

  var gl = canvas.getContext('webgl') || null;
  if (!gl) {
    utils.throw_error('GameCanvas', 'couldn\'t creat webgl context.');
  }
  this.gl = gl;
};
GameCanvas.prototype.size_canvas = function (args, el) {
  el.width = window.innerWidth;
  el.height = window.innerHeight;
  el.style.width = '100%';
  el.style.height = '100%';
  el.style.position = 'absolute';
  el.style.left = '50%';
  el.style.top = '50%';
  el.style.transform = 'translate(-50%, -50%)';
  el.style.webkitTransform = 'translate(-50%, -50%)';
};
GameCanvas.prototype.build_canvas = function (args) {
  if (args.canvas) {
    if (typeof args.canvas === 'string') {
      return document.getElementById(args.canvas) || null;
    } else {
      return args.canvas;
    }
  }

  var canvas = document.createElement('canvas');
  if (args.canvas_id) {
    canvas.id = args.canvas_id;
  }
  return canvas;
};

scope.GameCanvas = GameCanvas;

})($dock.render);

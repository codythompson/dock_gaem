(function (global) {
/*******************************************************************************
 * control selector - left panel - init
*******************************************************************************/
var init_control_selector = function (game, controls) {
  left_panel = new UIContainer();
  left_panel.cont.visible = true;

  var move_up = PIXI.Sprite.fromImage('assets/box_drag_icon.png');
  move_up.x = 8;
  move_up.y = 8;
  var move_skirt = PIXI.Sprite.fromImage('assets/button_up.png');
  var move_down = PIXI.Sprite.fromImage('assets/box_drag_icon.png');
  move_down.x = -8;
  move_down.y = -8;
  var move_button = new UIButton({
    up_sprites: [move_up, move_skirt],
    down_sprites: [move_down],
    y: 150,
    x: left_panel.cont.width / 2,
  });
  left_panel.add_button(move_button);

  var grid_up = PIXI.Sprite.fromImage('assets/box_select_icon.png');
  grid_up.x = 8;
  grid_up.y = 8;
  var grid_skirt = PIXI.Sprite.fromImage('assets/button_up.png');
  var grid_down = PIXI.Sprite.fromImage('assets/box_select_icon.png');
  grid_down.x = -8;
  grid_down.y = -8;
  var grid_button = new UIButton({
    up_sprites: [grid_up, grid_skirt],
    down_sprites: [grid_down],
    y: 300,
    x: left_panel.cont.width / 2
  });
  left_panel.add_button(grid_button);

  mode_group = new UIButtonGroup({
    buttons: [move_button, grid_button],
    on_select: function (ix) {
      game.controls.set_mode(ix);
    }
  });
  mode_group.select(0);

  game.stage.addChild(left_panel.cont);
};

/*******************************************************************************
 * ui init - entry point
*******************************************************************************/
var init_ui = function (game, tile_map) {
  var camera = new Camera({map: tile_map});
  camera.ij((tile_map.get_tiles_wide()-1)/2, (tile_map.get_tiles_high()-1)/2);
  camera.scale(0.3);
  game.camera = camera;

  var ctrls = new Controls({
    camera: camera,
    mode: Controls.modes.select_box
  });
  game.controls = ctrls;

  init_control_selector(game, ctrls);
};

global.init_ui = init_ui;
})(this);

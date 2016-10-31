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

  tile_panel = new UIContainer({
    x: (window.innerWidth / 2) - 200,
    visible: true
  });

  var grass_up = PIXI.Sprite.fromImage('assets/noise_med.png');
  grass_up.scale.x = 0.5;
  grass_up.scale.y = 0.5;
  grass_up.tint = 0xcccc66;
  grass_up.x = 8;
  grass_up.y = 8;
  var grass_skirt = PIXI.Sprite.fromImage('assets/button_up.png');
  var grass_down = PIXI.Sprite.fromImage('assets/noise_med.png');
  grass_down.scale.x = 0.5;
  grass_down.scale.y = 0.5;
  grass_down.tint = 0xcccc66;
  grass_down.x = -8;
  grass_down.y = -8;
  var grass_button = new UIButton({
    up_sprites: [grass_up, grass_skirt],
    down_sprites: [grass_down],
    x: tile_panel.cont.width / 2,
    y: 150
  });
  tile_panel.add_button(grass_button);

  var water_up = PIXI.Sprite.fromImage('assets/water_med.png');
  water_up.scale.x = 0.5;
  water_up.scale.y = 0.5;
  water_up.x = 8;
  water_up.y = 8;
  var water_skirt = PIXI.Sprite.fromImage('assets/button_up.png');
  var water_down = PIXI.Sprite.fromImage('assets/water_med.png');
  water_down.scale.x = 0.5;
  water_down.scale.y = 0.5;
  water_down.x = -8;
  water_down.y = -8;
  var water_button = new UIButton({
    up_sprites: [water_up, water_skirt],
    down_sprites: [water_down],
    x: tile_panel.cont.width / 2,
    y: 300
  });
  tile_panel.add_button(water_button);

  var dock_up = PIXI.Sprite.fromImage('assets/dock_med.png');
  dock_up.scale.x = 0.5;
  dock_up.scale.y = 0.5;
  dock_up.x = 8;
  dock_up.y = 8;
  var dock_skirt = PIXI.Sprite.fromImage('assets/button_up.png');
  var dock_down = PIXI.Sprite.fromImage('assets/dock_med.png');
  dock_down.scale.x = 0.5;
  dock_down.scale.y = 0.5;
  dock_down.x = -8;
  dock_down.y = -8;
  var dock_button = new UIButton({
    up_sprites: [dock_up, dock_skirt],
    down_sprites: [dock_down],
    x: tile_panel.cont.width / 2,
    y: 450
  });
  tile_panel.add_button(dock_button);
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

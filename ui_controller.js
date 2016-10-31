(function (global) {
var Controller = {
  gaem: null,
  selected: [],

  init: function (gaem) {
    this.gaem = gaem;
    var self = this;
    gaem.controls.select_box_controls.on_select = function (tiles) {
      self.selected = tiles;
    };
  },

  place_tiles: function (tile_set) {
    if (this.selected.length > 0) {
      Placer.place_tiles(tile_set, this.selected, this.gaem.map);
    } else {
      console.log('[Controll] no tiles selected');
    }
  }
};

global.Controller = Controller;
})(this);

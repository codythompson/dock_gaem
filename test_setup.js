// model namespace
var dgm = $dock_game.model;

var MoTest = function (args) {
  dgm.ModelObject.call(this, 'MoTest', args,
    [
      'mmk', 
      'right'
    ], {
      well: true,
      truest: 'nope',
      ok: null
    }
  );
};
MoTest.prototype = Object.create(dgm.ModelObject.prototype);

var motest;
try {
  motest = new MoTest();
  console.log('bad a');
} catch (e) {
  console.log(e);
}
try {
  motest = new MoTest({
    right: 'wellp',
    well: 0,
  });
  console.log('bad b');
} catch (e) {
  console.log(e);
}
motest = new MoTest({
  mmk: 'yp',
  right: 0
});
console.log(motest);
motest = new MoTest({
  mmk: 'wat',
  right: 23,
  ok: true
});
console.log(motest);

motest.dirty = false;
console.log('false?:', motest.dirty, motest._meta.dirty);
motest.mmk = null;
console.log('true?:', motest.dirty, motest._meta.dirty);

/*******************************************************************************
 * Type
*******************************************************************************/
var Type = dgm.Type;
var typeEmpty = new Type();
console.log(typeEmpty.names);

var typeA = new Type({
  names: ['A']
});
console.log(typeA.names);

typeA.dirty = false;
console.log(typeA.dirty);
typeA.names = ['A', 'a'];
console.log(typeA.names);
console.log(typeA.dirty);

var Model2DArray = dgm.Model2DArray;

var Tile = dgm.Tile;
var tileA = new Tile({
  type: typeA
});
var tiles = [[
  tileA
]];
var arr_a = new Model2DArray({
  array: tiles
});
tileA.dirty = false;
arr_a.dirty = false;

console.log('tileA dirty', tileA.dirty);
console.log('arr_a dirty', arr_a.dirty);
console.log(tileA.parent);
tileA.type = new Type({
  names: ['B']
});
console.log('tileA dirty', tileA.dirty);
console.log('arr_a dirty', arr_a.dirty);

var Complex = dgm.Complex;
var complex = new Complex({
  tile_array: arr_a
});
tileA.dirty = false;
arr_a.dirty = false;
complex.dirty = false;
console.log('complex dirty', complex.dirty);

tileA.type.names = ['aaa'];
console.log('complex dirty', complex.dirty);


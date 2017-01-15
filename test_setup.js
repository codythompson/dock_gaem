// model namespace
var dgm = $dock.model;

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
motest = new MoTest({
  mmk: 'wat',
  right: 23,
  ok: true
});

motest.dirty = false;
console.log('false?:', motest.dirty, motest._meta.dirty);
motest.mmk = null;
console.log('true?:', motest.dirty, motest._meta.dirty);

/*******************************************************************************
 * Type
*******************************************************************************/
var ModelArray = dgm.ModelArray;
var Model2DArray = dgm.Model2DArray;

var Type = dgm.Type;
var typeEmpty = new Type();
console.log('null?', typeEmpty.names);

var typeA = new Type({
  names: ['A']
});
console.log('[A]?', typeA.names);

typeA.dirty = false;
console.log('false?', typeA.dirty);
typeA.names = new ModelArray({array: ['A', 'a']});;
console.log('[A, a]?', typeA.names);
console.log('true?', typeA.dirty);

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

console.log('false?', tileA.dirty);
console.log('false?', arr_a.dirty);
console.log(tileA.parent);
tileA.type = new Type({
  names: ['B']
});
console.log('true?', tileA.dirty);
console.log('true?', arr_a.dirty);

var Complex = dgm.Complex;
var complex = new Complex({
  tile_array: arr_a
});
tileA.dirty = false;
arr_a.dirty = false;
complex.dirty = false;
console.log('false?', complex.dirty);

tileA.type.names = new ModelArray({array: ['aaa']});
console.log('true?', complex.dirty);

var Floor = dgm.Floor;
var floor = new Floor({
  complexes: [complex]
});
typeA.dirty = false;
tileA.dirty = false;
arr_a.dirty = false;
complex.dirty = false;
floor.dirty = false;

console.log('false?', floor.dirty);
tileA.type.names.push('a');
console.log('true?', floor.dirty);

console.log('world------');

var World = dgm.World;
var world = new World({
  floors: [floor]
});
typeA.dirty = false;
tileA.dirty = false;
arr_a.dirty = false;
complex.dirty = false;
floor.dirty = false;
world.dirty = false;

console.log('false?', world.dirty);
tileA.type.names.push('Aa');
console.log('true?', world.dirty);


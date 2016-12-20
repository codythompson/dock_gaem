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


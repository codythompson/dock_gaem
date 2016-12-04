// model namespace
var dgm = $dock_game.model;

var typeA = new dgm.Type();
typeA.set_name(0, 'a');
typeA.set_name(1, 'A');

var typeB = new dgm.Type({
  names: ['b', 'B', 'bee']
});

var tileA = new dgm.Tile({
  type: typeA.to_obj()
});

var tileB = new dgm.Tile();
tileB.type = typeB;

// console.log(tileA.to_obj());
console.log(tileA);

// console.log(tileB.to_obj());
console.log(tileB);

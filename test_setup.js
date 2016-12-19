// model namespace
var dgm = $dock_game.model;

var typeA = new dgm.Type();
typeA.set_name(0, 'a');
typeA.set_name(1, 'A');

var typeB = new dgm.Type({
  names: ['b', 'B', 'bee']
});

complex0 = new dgm.Complex();

complex0.set_tile(0, 0, new dgm.Tile({type: typeA}));
complex0.set_tile(0, 1, new dgm.Tile({type: typeA}));
complex0.set_tile(0, 2, new dgm.Tile({type: typeA}));

complex0.set_tile(1, 0, new dgm.Tile({type: typeB}));
complex0.set_tile(1, 1, new dgm.Tile({type: typeB}));
complex0.set_tile(1, 2, new dgm.Tile({type: typeB}));

complex0.set_tile(2, 0, new dgm.Tile({type: typeA}));
complex0.set_tile(2, 1, new dgm.Tile({type: typeA}));
complex0.set_tile(2, 2, new dgm.Tile({type: typeB}));

var floor0 = new dgm.Floor({
  complexes: [complex0]
});

console.log(floor0);


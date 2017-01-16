/*******************************************************************************
 * utils test script
*******************************************************************************/
(function (scope) {
var dg = scope.$dock;
var utils = dg.utils;

/*
 * throw_error test
 */
var fn = function () {
  utils.throw_error(['ok', 'wat'], 'crazee stuff');
};
var test_fn = function () {
  chai.expect(fn).to.throw('[ok][wat] crazee stuff');
  chai.expect(fn).to.not.throw('something else');
}
scope.run_test(test_fn, 'utils', 'throw_error');

var test_obj_a = {
  a: false,
  b: null,
  c: 'ok',
  d: 2,
  f: {
    wat: 'ok'
  }
};

/*
 * missing_required tests
 */
var fna = function () {
  return utils.missing_required(test_obj_a, ['a', 'c']);
};
var fnb = function () {
  return utils.missing_required(test_obj_a,  ['c', 'g']);
};
var fnc = function () {
  return utils.missing_required(test_obj_a, ['d', ['f', 'e']]);
}
var fnd = function () {
  return utils.missing_required(test_obj_a, ['a', ['e', 'g']]);
}
var fne = function () {
  return utils.missing_required(test_obj_a, [['f', 'e'], 'b']);
}

test_fn = function () {
  chai.expect(fna()).to.be.false;
  chai.expect(fnb()).to.equal('g');
  chai.expect(fnc()).to.be.false;
  chai.expect(fnd()).to.deep.equal(['e', 'g']);
  chai.expect(fne()).to.equal('b');
};

scope.run_test(test_fn , 'utils', 'missing_required');

/*
 * defaults tests
 */
test_obj_a = {
  a: false,
  b: null,
  c: 'ok',
  d: 2,
  f: {
    wat: 'ok'
  }
};

fna = function () {
  return utils.defaults(test_obj_a, {
    c: 'nooo',
    b: 22,
    g: 'yep'
  });
}
fnb = function () {
  return utils.defaults(test_obj_a, {
    a: true,
    c: 'nok',
    d: {wellp: true},
    f: 'nok'
  });
};

test_fn = function () {
  chai.expect(fna()).to.deep.equal({
    a: false,
    b: 22,
    c: 'ok',
    d: 2,
    f: {
      wat: 'ok'
    },
    g: 'yep'
  });
  chai.expect(fnb()).to.deep.equal({
    a: false,
    b: null,
    c: 'ok',
    d: 2,
    f: {
      wat: 'ok'
    }
  });
};

scope.run_test(test_fn, 'utils', 'defaults');

/*
 * process_args tests
 */
test_obj_a = {
  a: false,
  b: null,
  c: 'ok',
  d: 2,
  f: {
    wat: 'ok'
  }
};

fn = function () {
  return utils.process_args(['wellp','ok'], test_obj_a, [['blah', 'ablah']], {
    mmk: ['lk'],
    b: 'yep'
  }); 
};

fna = function () {
  return utils.process_args(['wellp','ok'], test_obj_a, [['f', 'g']], {
    mmk: ['lk'],
    b: 'yep'
  }); 
};
fnb = function () {
  return utils.process_args(['wellp','ok'], test_obj_a, [['b', 'a'], 'c']); 
};
fnc = function () {
  return utils.process_args(['wellp','ok'], test_obj_a); 
};

test_fn = function () {
  chai.expect(fn).to.throw('[wellp][ok] You must supply at least one of the following arguments: [blah, ablah]');
  chai.expect(fna()).to.deep.equal({
    a: false,
    b: 'yep',
    c: 'ok',
    d: 2,
    f: {wat: 'ok'},
    mmk: ['lk']
  });
  chai.expect(fnb()).to.deep.equal({
    a: false,
    b: null,
    c: 'ok',
    d: 2,
    f: {wat: 'ok'}
  });
  chai.expect(fnc()).to.deep.equal({
    a: false,
    b: null,
    c: 'ok',
    d: 2,
    f: {wat: 'ok'}
  });
};

scope.run_test(test_fn, 'utils', 'process_args');

})(this);

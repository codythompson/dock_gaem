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

})(this);

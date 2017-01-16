(function (scope) {

var run_test = function (test_func, suite_label, test_label) {
  try {
    test_func();
  } catch (e) {
    console.log(e);
    show_msg(null, 'error', e.message+'<hr/>'+e.stack, test_label, suite_label);
    return false;
  }
  show_msg(null, 'success', 'passed', test_label, suite_label);
  return true;
};
scope.run_test = run_test;

var show_msg = function (parent_el, modifier, msg, title, code_ref) {
  parent_el = parent_el || document.body;

  var el = document.createElement('div');
  el.className = modifier + ' msg-cont';

  if (typeof title !== 'undefined' || typeof code_ref !== 'undefined') {
    var title_el = document.createElement('div');
    title_el.className = 'msg-title';

    if (typeof title !== 'undefined') {
      var title_text_el = document.createElement('span');
      title_text_el.className = 'msg-title-text';
      title_text_el.innerHTML = title;
      title_el.appendChild(title_text_el);
    }

    if (typeof code_ref !== 'undefined') {
      var title_cr_el = document.createElement('div');
      title_cr_el.className = 'msg-title-code-ref';
      title_cr_el.innerHTML = code_ref;
      title_el.appendChild(title_cr_el);
    }

    el.appendChild(title_el);
  }

  if (typeof msg !== 'undefined' && msg !== null) {
    var msg_el = document.createElement('div');
    msg_el.className = 'msg-body';
    msg = '' + msg;
    msg = msg.split('\n').join('<br/>');
    msg_el.innerHTML = msg;
    el.appendChild(msg_el);
  }

  parent_el.appendChild(el);
};

window.addEventListener('load', function () {
  if (!window.location || typeof location.search === 'undefined') {
    show_msg(null, 'error', 'bad window.location browser support.');
  }

  var test_script = location.search; 
  if (test_script[0] === '?') {
    test_script = test_script.substr(1);
  }

  if (!test_script) {
    var avail_tests = '';
    for (var i in scope.test_manifest) {
      var test_name = scope.test_manifest[i];
      avail_tests += '<a href="?'+test_name+'">'+test_name+'</a><br/>';
    }
    show_msg(null, 'info', avail_tests, 'available tests');
    return;
  }

  var script_el = document.createElement('script');
  script_el.type = 'text/javascript';
  script_el.onerror = function () {
    show_msg(null, 'error', 'Couldn\'t load the script:'+test_script+'.js', 'test script error');
  };
  script_el.onload = function () {
    console.log(test_script+' test script finished');
  };
  script_el.src = 'tests/'+test_script+'.js';
  document.head.appendChild(script_el);
});

scope.show_msg = show_msg;

})(this);

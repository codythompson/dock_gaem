'use strict';

(function (scope) {

var utils = {
  throw_error: function (label, message) {
    var str = '';
    if (Array.isArray(label)) {
      for (var i = 0; i < label.length; i++) {
        str += '['+label[i]+']';
      }
    } else {
      str += label;
    }

    str += ' ' + message;

    throw str;
  },
  missing_required: function (args, required) {
    if (!args || !required) {
      return false;
    }

    for (var i = 0; i < required.length; i++) {
      var req = required[i];

      // if the req is an array, we assume only one of the items in the array
      // is required
      if (Array.isArray(req)) {
        var found = false;
        for (j = 0; j < req.length; j++) {
          if (args[req[j]]) {
            found = true;
            break;
          }
        }
        if (!found) {
          return req;
        }

      // if req isn't an array, see if it's a key in args
      } else {
        var arg = args[req];
        if (typeof arg === 'undefined' || arg === null) {
          return req;
        }
      }
    }
  },
  defaults: function (args, defaults) {
    args = args || {};
    defaults = defaults || {};

    var new_args = {};

    // step one, shallow clone args
    var key;
    for (key in args) {
      new_args[key] = args[key];
    }

    // fill in missing values from defaults
    for (key in defaults) {
      if (typeof args[key] === 'undefined') {
        new_args[key] = defaults[key];
      }
    }

    return new_args;
  },
  process_args: function (label, args, reqs, defaults) {
    args = this.defaults(args || {}, defaults);
    var missing = this.missing_required(args, reqs);
    if (!missing) {
      // if nothing is missing we can exit
      return;
    }

    var message;
    if (Array.isArray(missing)) {
      var missing_str = '[ ';
      for (i in missing) {
        missing_str += missing[i];
        if (i < missing.length - 1) {
          missing_str += ', ';
        }
      }
      missing_str += ' ]';
      message = 'You must supply at least one of the following arguments: ' + missing_str;
    } else {
      message = 'You must supply the following argument: ' + missing;
    }

    this.throw_error(label, message);
  },  
};

})($dock);

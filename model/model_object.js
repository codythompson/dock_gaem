'use strict';

(function (scope) {

var ModelObject = function (type, args, required, defaults, parent) {
  if (typeof type !== 'string') {
    ModelObject.throw_error('"type" is a required argument', 'ModelObject');
  }

  if (args && typeof args._meta !== 'undefined') {
    ModelObject.throw_error('"_meta" is not allowed as an argument name', 'ModelObject');
  }

  if (args && typeof args.dirty !== 'undefined') {
    ModelObject.throw_error('"dirty" is not allowed as an argument name', 'ModelObject');
  }
  ModelObject.check_required(type, args, required);
  args = ModelObject.defaults(args, defaults);

  this._meta = {
    type: type,
    dirty: true,
    props: null,
    parent: parent || null
  };
  ModelObject.define_props(this, args);

  Object.defineProperty(this, 'parent', {
    get: function () { return this._meta.parent; },
    set: function (val) {
      this._meta.parent = val;
    }
  });

  Object.defineProperty(this, 'dirty', {
    get: function () { return this._meta.dirty; },
    set: function (val) {
      this._meta.dirty = val;
      if (val && this._meta.parent) {
        this._meta.parent.dirty = true;
      }
    },
  });
};

ModelObject.prototype.to_json = function () {
  return ModelObject.to_json(this);
};

ModelObject.to_json = function (obj) {
  var name, val, j_obj;
  if (typeof obj === 'string' ||
      typeof obj === 'number' ||
      typeof obj === 'string' ||
      (typeof obj === 'object' && Array.isArray(obj))) {
    return obj;
  } else if (typeof obj === 'object' && obj instanceof ModelObject) {
    j_obj = {
      _meta: {
        type: obj._meta.type,
        dirty: obj._meta.dirty
        // TODO don't omit parent from this
      }
    };
    for (name in obj._meta.props) {
      val = ModelObject.to_json(obj._meta.props[name]);
      if (val !== null) {
        j_obj[name] = val;
      }
    }
    return j_obj;
  } else if (typeof obj === 'object') {
    j_obj = {};
    for (name in obj) {
      val = ModelObject.to_json(obj[name]);
      if (val !== null) {
        j_obj[name] = val;
      }
    }
    return j_obj;
  } else {
    return null;
  }
};

// TODO inflate from json

ModelObject.throw_error = function (message, type, method) {
  var str = '';
  if (type) {
    str += '['+type+']';
    if (!method) {
      str += ' ';
    }
  }
  if (method) {
    str += '['+method+'] ';
  }
  str += message;

  throw str;
};
ModelObject.check_required = function (type, args, required) {
  if (!required) {
    return;
  }
  args = args || {};

  var i, j, req, arg, sub_req, found, not_found_list;
  for (i = 0; i < required.length; i++) {
    req = required[i];

    // loop through the req list and see if one of them exists in args
    if (Array.isArray(req)) {
      found = false;
      not_found_list = '';
      for (j = 0; j < req.length && !found; j++) {
        sub_req = req[j];
        arg = args[sub_req];
        not_found_list += ' ' + sub_req;
        if (typeof arg !== 'undefined' && arg !== null) {
          found = true; // breaks loop
        }
      }
      if (!found) {
        var err_msg = 'you must supply at least one of the following args:'
          +not_found_list;
        ModelObject.throw_error(err_msg, type);
      }

    // else there's no 'or list', it's just a single arg we're looking for
    } else {
      arg = args[req];
      if (typeof arg === 'undefined' || arg === null) {
        ModelObject.throw_error('arg "'+req+'" is a required argument', type);
      }
    }
  }
};
ModelObject.defaults = function (args, defaults) {
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
};
ModelObject.define_prop = function (instance, props, name, value) {
  // props[name] = value;
  Object.defineProperty(instance, name, {
    get: function () { return props[name]; },
    set: function (val) {
      instance._meta.dirty = true;
      if (props[name] instanceof ModelObject) {
        props[name].parent = null;
      }
      if (val instanceof ModelObject) {
        val.parent = this;
      }
      if (instance._meta.parent) {
        instance._meta.parent.dirty = true;
      }
      props[name] = val;
    }
  });
  instance[name] = value;
};
ModelObject.define_props = function (instance, args) {
  var props = {};

  var prop;
  for (prop in args) {
    ModelObject.define_prop(instance, props, prop, args[prop]);
  }

  return props;
};

scope.ModelObject = ModelObject;

})(window.$dock_game.model);

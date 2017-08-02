require('./../Mock20_Output');
require('./../Functions/API_Events/On');
var Bank = require('./../Mock20_ObjectBank');
var canRemove = {
  graphic: true,
  text: true,
  path: true,
  character: true,
  ability: true,
  attribute: true,
  handout: true,
  rollabletable: true,
  tableitem: true,
  macro: true
};

class MOCK20prevObject{
  constructor(obj) {
    for (var k in obj.MOCK20data) {
      this[k] = obj.MOCK20data[k];
    }
  }

  get(property) {
    return this[property];
  }

  set(property, newValue) {
    return this[property] = newValue;
  }
}

class MOCK20object{
  constructor(_id, input, data) {
    this.MOCK20data = data || {
      _id: '',
      _type: 'object',
    };
    input = input || {};
    for (var k in input) {
      if (this.MOCK20data[k] != undefined) {
        this.MOCK20data[k] = input[k];
      }
    }

    this.MOCK20data._id = _id;
  }

  get id() {
    return this.MOCK20data._id;
  }

  get(property) {
    if (this.MOCK20data[property] != undefined) {
      return this.MOCK20data[property];
    }

    MOCK20warning(this.MOCK20data._type + ' does not have a ' + property + ' property.');
  }

  set(property, newValue) {
    if (typeof property == 'object') {
      for (var k in property) {
        this.set(k, property[k]);
      }

      return;
    }

    if (newValue == undefined) {
      MOCK20warning('You cannot set a value to undefined.');
      return;
    }

    if (/^_/.test(property)) {
      MOCK20warning(property + ' is a protected property.');
      return;
    }

    if (this.MOCK20data[property] == undefined) {
      MOCK20warning(this.MOCK20data._type + ' does not have a ' + property + ' property.');
      return;
    }

    return this.MOCK20update(property, newValue);
  }

  MOCK20update(property, newValue) {
    var prev = new MOCK20prevObject(this);
    if (newValue != undefined) {
      this.MOCK20data[property] = newValue;
    }

    if (property != undefined) {
      MOCK20trigger('change:' + this.MOCK20data._type + ':' + property, this, prev);
    }

    MOCK20trigger('change:' + this.MOCK20data._type, this, prev);
    return this.MOCK20data[property];
  }

  remove(options) {
    options = options || {};
    if (!canRemove[this.get('_type')] && !options.MOCK20override) {
      MOCK20warning('Cannot remove ' + this.get('_type') + ' objects.');
      return;
    }
    Bank.remove(this.get('_type'), this.id, options);
  }
}

module.exports = MOCK20object;

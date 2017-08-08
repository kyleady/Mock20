//see https://wiki.roll20.net/API:Objects#Creating_Objects
var Bank = require('./../../Objects/Mock20_ObjectBank');
var Objects = require('./../../Objects/Mock20_Objects');
require('./../../Mock20_Output');
var validObjs = {
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

module.exports = function (type, attributes, options) {
  if (!options || typeof options != 'object') options = {};
  if (typeof type != 'string' || (!validObjs[type] && !options.MOCK20override) || !Objects[type]) {
    return MOCK20warning('creatObj() cannot create ' + type + ' objects.');
  }

  if (typeof attributes != 'object') {
    throw 'Invalid attributes for creatObj(\"' + type + '\").';
  }

  return Bank.create(Objects[type], attributes);
};

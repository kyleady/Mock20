//see https://wiki.roll20.net/API:Objects#Creating_Objects
var Bank = require('./../../Mock20_ObjectBank');
var Objects = require('./../../Mock20_Objects');
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

  if (attributes && typeof attributes != 'object') {
    MOCK20warning('Invalid attributes for creatObj(\"' + type + '\").');
    attributes = {};
  }

  return Bank.create(Objects[type], attributes);
};

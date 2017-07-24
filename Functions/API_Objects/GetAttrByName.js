//see https://wiki.roll20.net/API:Objects#Working_with_Character_Sheets
var findObjs = require('./FindObjs');
require('./../../Mock20_Output');
module.exports = function (characterID, attributeName, valueType) {
  if (attributeName == undefined) {
    MOCK20warning('Invalid attribute_name for getAttrByName(). Roll20 would break here.');
    return undefined;
  }

  if (characterID == undefined) {
    MOCK20warning('Invalid character_id for getAttrByName()');
    return undefined;
  }

  var attrs = { _type: 'attribute', _characterid: characterID, name: attributeName };
  var attributes = findObjs(attrs);
  if (!attributes || attributes.length <= 0) {
    attrs._characterid = 'default_character_sheet';
    var attributes = findObjs(attrs);
  }

  if (!attributes || attributes.length <= 0) {
    var warning = 'No attribute or sheet field found for character_id ';
    warning += characterID + ' named ' + attributeName;
    MOCK20warning(warning);
    return undefined;
  }

  valueType = valueType || 'current';
  return attributes[0].get(valueType);
};

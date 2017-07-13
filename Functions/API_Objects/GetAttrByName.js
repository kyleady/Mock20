//see https://wiki.roll20.net/API:Objects#Working_with_Character_Sheets
var findObjs = require('./FindObjs');
require('./../../Mock20_Output');
module.exports = function(character_id, attribute_name, value_type){
  if(attribute_name == undefined){
    Mock20_warning("Invalid attribute_name for getAttrByName(). Roll20 would break here.");
    return undefined;
  }
  if(character_id == undefined){
    Mock20_warning("Invalid character_id for getAttrByName()");
    return undefined;
  }
  var attrs = {_type: "attribute", _characterid: character_id, name: attribute_name};
  var attributes = findObjs(attrs);
  if(!attributes || attributes.length <= 0){
    attrs._characterid = "default_character_sheet";
    var attributes = findObjs(attrs);
  }
  if(!attributes || attributes.length <= 0){
    Mock20_warning("No attribute or sheet field found for character_id " + character_id + " named " + attribute_name);
    return undefined;
  }
  value_type = value_type || "current";
  return attributes[0].get(value_type);
}

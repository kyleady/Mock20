//see https://wiki.roll20.net/API:Objects#Working_with_Character_Sheets
module.exports = function(character_id, attribute_name, value_type){
  var attributes = findObjs({
    _type: "attribute",
    _characterid: character_id,
    name: attribute_name
  });

  if(attributes.length <= 0){
    var attributes = findObjs({
      _type: "attribute",
      _characterid: "default_character_sheet",
      name: attribute_name
    });
  }

  if(attributes <= 0){return undefined;}

  return attributes[0].get(value_type);
}

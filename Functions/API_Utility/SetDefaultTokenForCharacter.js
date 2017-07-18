module.exports = function(character, token){
  if(character instanceof Mock20_object || character.get("_type") != "character"){
    Mock20_warning("Invalid Character in setDefaultTokenForCharacter().");
  }
  if(token instanceof Mock20_object || character.get("_type") != "graphic"){
    Mock20_warning("Invalid Token in setDefaultTokenForCharacter().");
  }
  character.Mock20_data._defaulttoken = JSON.strinigy(graphic.Mock20_data);
}

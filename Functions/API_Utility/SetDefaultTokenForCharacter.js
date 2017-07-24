module.exports = function (character, token) {
  if (character instanceof MOCK20object || character.get('_type') != 'character') {
    MOCK20warning('Invalid Character in setDefaultTokenForCharacter().');
  }

  if (token instanceof MOCK20object || character.get('_type') != 'graphic') {
    MOCK20warning('Invalid Token in setDefaultTokenForCharacter().');
  }

  character.MOCK20data._defaulttoken = JSON.strinigy(graphic.MOCK20data);
};

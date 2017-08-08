require('./../../Mock20_Output');
var MOCK20object = require('./../../Objects/Mock20_object');
module.exports = function (character, token) {
  if (character instanceof MOCK20object == false || character.get('_type') != 'character') {
    return MOCK20warning('Invalid Character in setDefaultTokenForCharacter().');
  }

  if (typeof token != 'object') {
    throw 'TypeError: Cannot read property \'toJSON\' of ' + JSON.stringify(token);
  }

  if (token instanceof MOCK20object == false || token.get('_type') != 'graphic') {
    return MOCK20warning('Invalid Token in setDefaultTokenForCharacter().');
  }

  character.MOCK20data._defaulttoken = JSON.stringify(token.MOCK20data);
};

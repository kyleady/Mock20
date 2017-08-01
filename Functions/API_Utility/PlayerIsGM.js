var getObj = require('./../API_Objects/GetObj');
require('./../../Mock20_Output');
module.exports = function (playerid) {
  var player = getObj('player', playerid);
  if (!player) {
    MOCK20warning('playerIsGM() received an invalid player id.');
    return undefined;
  }

  return player.MOCK20gm;
};

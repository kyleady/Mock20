module.exports = function(playerid){
  var player = getObj("player", playerid);
  if(!player){
    Mock20_warning("playerIsGM() received an invalid player id.");
    return undefined;
  }
  return player.Mock20_gm;
}

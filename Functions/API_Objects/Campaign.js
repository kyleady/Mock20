//see https://wiki.roll20.net/API:Objects#Campaign.28.29_.28function.29
var Mock20_campaign = require('./../../Objects/Mock20_campaign')
var campaign = new Mock20_campaign("root");

module.exports = function(){
  return campaign;
}

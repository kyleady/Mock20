//see https://wiki.roll20.net/API:Objects#getObj.28type.2C_id.29
var Bank = require('./../../Mock20_ObjectBank');
module.exports = function(type, id){
  if(Bank[type]){
    return Bank[type][id];
  }
}

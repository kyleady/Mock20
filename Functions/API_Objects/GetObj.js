//see https://wiki.roll20.net/API:Objects#getObj.28type.2C_id.29
var Bank = require('./../../Mock20_ObjectBank');
require('./../../Mock20_Output');
module.exports = function(type, id){
  if(typeof type != "string" || !Bank[type]){
    Mock20_warning("getObj() cannot get " + type + " objects.");
    return undefined;
  }
  if(typeof id != "string"){
    Mock20_warning(id + " is an invalid id for getObj().");
    return undefined;
  }
  if(Bank[type]){
    return Bank[type][id];
  }
}

//see https://wiki.roll20.net/API:Objects#getObj.28type.2C_id.29
var Bank = require('./../../Mock20_ObjectBank');
require('./../../Mock20_Output');
var validObjs = {
  ability: true,
  attribute: true,
  card: true,
  character: true,
  deck: true,
  graphic: true,
  hand: true,
  handout: true,
  jukeboxtrack: true,
  macro: true,
  page: true,
  path: true,
  player: true,
  rollabletable: true,
  tableitem: true,
  text: true
};
module.exports = function(type, id, options){
  if(!options || typeof options != 'object'){
    options = {};
  }
  if(typeof type != "string" || (!validObjs[type] && !options.Mock20_override)){
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

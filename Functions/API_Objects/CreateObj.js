//see https://wiki.roll20.net/API:Objects#Creating_Objects
var Objects = require('./../../Mock20_Objects');
var Bank = require('./../../Mock20_ObjectBank');
require('./../API_Events/On');
require('./../../Mock20_Output');

var Mock20_objCounter = 0;

module.exports = function(type, attributes){
  if(typeof type != "string" || !Bank[type]){
    Mock20_warning("creatObj() cannot create " + type + " objects.");
    return undefined;
  }
  if(attributes && typeof attributes != "object"){
    Mock20_warning("Invalid attributes for creatObj(\"" + type + "\").");
    attributes = {};
  }
  var id = Mock20_objCounter.toString(16);
  Mock20_objCounter++;
  Bank[type][id] = new Objects[type](id, attributes);
  Mock20_trigger("add:" + type, Bank[type][id]);
  return Bank[type][id];
}

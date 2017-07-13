//see https://wiki.roll20.net/API:Objects#Creating_Objects
var Objects = require('./../../Mock20_Objects');
var Bank = require('./../../Mock20_ObjectBank');

var Mock20_objCounter = 0;

module.exports = function(type, attributes){
  if(!Bank[type]){
    Mock20_warning("creatObj() cannot create " + type + " objects.");
  }
  var id = Mock20_objCounter.toString(16);
  Mock20_objCounter++;
  Bank[type][id] = new Objects[type](id, attributes);
  return Bank[type][id];
}

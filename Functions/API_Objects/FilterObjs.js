//see https://wiki.roll20.net/API:Objects#filterObjs.28callback.29
var Bank = require('./../../Mock20_ObjectBank');
module.exports = function(testFunc){
  if(typeof testFunc != 'function'){return undefined;}
  var Found = [];
  for(var type in Bank){
    for(var id in Bank[type]){
      if(testFunc(Bank[type][id])){
        Found.push(Bank[type][id]);
      }
    }
  }
  return Found;
}

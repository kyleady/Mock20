//see https://wiki.roll20.net/API:Objects#getAllObjs.28.29
var filterObjs = require('./FilterObjs');
module.exports = function(){
  return filterObjs(function(obj){
    return true;
  });
}

//see https://wiki.roll20.net/API:Objects#findObjs.28attrs.29
var Bank = require('./../../Mock20_ObjectBank');
module.exports = function(attrs, options){
  options = options || {
    caseInsensitive: false
  };
  if(typeof attrs != "object"){return undefined;}
  var types = {};
  if(attrs._type){
    if(Bank[attrs._type] == undefined){return undefined;}
    types[attrs._type] = true;
  } else {
    for(var type in Bank){
      types[type] = true;
    }
  }
  return findObjsInTypes(attrs, types, options);
}

function findObjsInTypes(attrs, types, options){
  var Found = [];
  for(var type in types){
    Found = Found.concat(findObjsInType(attrs, Bank[type], options));
  }
  return Found;
}

function findObjsInType(attrs, type, options){
  var Found = [];
  for(var obj in type){
    if(matchingObj(attrs, type[obj], options)){
      Found.push(type[obj]);
    }
  }
}

function matchingObj(attrs, obj, options){
  var matching = true;
  for(var prop in attrs){
    if(options.caseInsensitive
      && typeof obj.get(prop) == 'string' && typeof attrs[prop] == 'string'){
      if(obj.get(prop).toLowerCase() != attrs[prop].toLowerCase()){
        matching = false;
      }
    } else if(obj.get(prop) != attrs[prop]){
      matching = false;
    }
  }
  return matching;
}

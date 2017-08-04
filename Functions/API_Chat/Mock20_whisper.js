var filterObjs = require('./../API_Objects/FilterObjs');

var getTarget = function (msg) {
  var re = /^\s*"([^"]+)"\s/;
  var matches = msg.content.match(re);
  var target = undefined;
  if (matches) {
    target = getPlayerOrCharacter(matches[1], false);
  } else {
    re = /^\s*(\S+)\s/;
    matches = msg.content.match(re);
    if (matches) target = getPlayerOrCharacter(matches[1], true);
  }

  if (!target) {
    msg.type = undefined;
    return msg;
  }

  msg.content = msg.content.replace(re, '');
  if (typeof target == 'object' && target.get('_type') == 'character'
  && target.get('controlledby') == '') target = 'gm';
  if (typeof target == 'string' && target == 'gm') {
    msg.target = 'gm';
    msg.target_name = 'GM';
  } else if (target.get('_type') == 'player') {
    msg.target = target.get('_id');
    msg.target_name = target.get('_displayname');
  } else {
    msg.target = target.get('controlledby');
    msg.target_name = target.get('name');
  }

  return msg;
};

var getPlayerOrCharacter = function (name, firstWordOnly) {
  if (name.toLowerCase() == 'gm') return 'gm';
  var obj = findObjCI('player', name, firstWordOnly);
  if (!obj) obj = findObjCI('character', name, firstWordOnly);
  return obj;
};

var findObjCI = function (type, name, firstWordOnly) {
  name = name.toLowerCase();
  return filterObjs(function (obj) {
    if (obj.get('_type') == type) {
      if (type == 'player') {
        var objName = obj.get('_displayname');
      } else {
        var objName = obj.get('name');
      }

      if (firstWordOnly) objName = objName.replace(/^\s*(\S+).*$/, '$1');
      return objName.toLowerCase() == name;
    }
  })[0];
};

module.exports = getTarget;

//see https://wiki.roll20.net/API:Objects#filterObjs.28callback.29
var Bank = require('./../../Objects/Mock20_ObjectBank');
require('./../../Mock20_Output');
module.exports = function (testFunc, options) {
  if (!options || typeof options != 'object') options = {};
  if (typeof testFunc != 'function') {
    MOCK20warning('Invalid testFunc for filterObjs()');
    return [];
  }

  var Found = [];
  for (var type in Bank) {
    if ((type == 'folder' || type == 'playlist') && !options.MOCK20override) continue;
    for (var id in Bank[type]) {
      if (testFunc(Bank[type][id])) Found.push(Bank[type][id]);
    }
  }

  return Found;
};

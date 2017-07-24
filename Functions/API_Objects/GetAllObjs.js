//see https://wiki.roll20.net/API:Objects#getAllObjs.28.29
var filterObjs = require('./FilterObjs');
require('./../../Mock20_Output');
module.exports = function (options) {
  return filterObjs(function (obj) {
    return true;
  }, options);
};

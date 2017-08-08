module.exports.spawnFx = function (x, y, type, pageid) {
  if (typeof type != 'string') {
    throw 'TypeError: Cannot read property \'indexOf\' of ' + JSON.stringify(type);
  }
};

module.exports.spawnFxBetweenPoints = function (point1, point2, type, pageid) {
  if (typeof point1 != 'object') {
    throw 'TypeError: Cannot read property \'x\' of ' + JSON.stringify(point1);
  }

  if (typeof point2 != 'object') {
    throw 'TypeError: Cannot read property \'x\' of ' + JSON.stringify(point2);
  }

  if (typeof type != 'string') {
    throw 'TypeError: Cannot read property \'indexOf\' of ' + JSON.stringify(type);
  }

};

module.exports.spawnFxWithDefinition = function (x, y, definitionJSON, pageid) {

};

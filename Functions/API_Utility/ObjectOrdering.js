module.exports.toFront = function (obj) {
  reorderObjs(obj, 'toFront');
};

module.exports.toBack = function (obj) {
  reorderObjs(obj, 'toBack');
};

function reorderObjs(obj, action) {
  if (typeof obj != 'object' || obj.get('_pageid') == undefined) {
    return MOCK20warning(action + '() received an invalid obj.');
  }

  var page = getObj('page', obj.get('_pageid'));
  if (page == undefined) {
    return MOCK20warning('Invalid pageid for ' + action + '().');
  }

  var ids = page.get('_zorder').split(',');
  var validIDs = [];
  if (action == 'toBack') validIDs.push(obj.id);
  for (var id of ids) {
    if (id == obj.id) continue;
    var item = findObjs({ _id: id })[0];
    if (item) validIDs.push(id);
  }

  if (action == 'toFront') validIDs.push(obj.id);
  page.MOCK20update('_zorder', validIDs.join());
}

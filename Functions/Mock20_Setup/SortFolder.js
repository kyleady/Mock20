var MOCK20folder = require('./../../Objects/Mock20_folder');
var MOCK20playlist = require('./../../Objects/Mock20_playlist');
var Bank = require('./../../Objects/Mock20_ObjectBank');

module.exports = function (folder) {
  if (folder instanceof MOCK20folder == false) return;
  var objs = [];
  for (var item of folder.get('_i')) {
    var obj = Bank.get(item._type, item._id);
    if (obj) objs.push(obj);
  }

  objs.sort(function (a, b) {
    var obj = { a: a, b: b };
    var name = {};
    ['a', 'b'].forEach(function (x) {
      if (obj[x] instanceof MOCK20folder) {
        name[x] = obj[x].get('n');
      } else if (obj[x].get('_type') == 'jukeboxtrack') {
        name[x] = obj[x].get('title');
      } else {
        name[x] = obj[x].get('name');
      }
    });

    if (name.a < name.b) {
      return -1;
    } else if (name.a > name.b) {
      return 1;
    } else {
      return 0;
    }
  });

  folder.MOCK20data._i = [];
  for (var item of objs) {
    folder.addItem(item);
  }

  folder.MOCK20update();
};

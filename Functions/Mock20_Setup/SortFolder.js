var Mock20_folder = require('./../../Objects/Mock20_folder');
var Mock20_playlist = require('./../../Objects/Mock20_playlist');
var Bank = require('./../../Mock20_ObjectBank');

module.exports = function(folder){
  var objs = [];
  for(var item of folder.get("_i")){
    var obj = Bank.get(item._type, item._id);
    if(obj){
      objs.push(obj);
    }
  }
  objs.sort(function(a,b){
    var obj = {
      a: a,
      b: b
    };
    var name = {};
    ["a", "b"].forEach(function(x){
      if(obj[x] instanceof Mock20_folder){
        name[x] = obj[x].get("n");
      } else if(obj[x].get("_type") == "jukeboxtrack"){
        name[x] = obj[x].get("title");
      } else {
        name[x] = obj[x].get("name");
      }
    });
    if(name.a < name.b){
      return -1;
    } else if(name.a > name.b){
      return 1;
    } else {
      return 0;
    }
  });
  folder.Mock20_data._i = [];
  for(var item of objs){
    folder.addItem(item);
  }
  folder.Mock20_update();
}

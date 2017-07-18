module.exports.toFront = function(obj){
  reorderObjs(obj, "toFront");
}

module.exports.toBack = function(obj){
  reorderObjs(obj, "toBack");
}

function reorderObjs(obj, action){
  if(typeof obj != 'object' || obj.get('_pageid') == undefined){
    return Mock20_warning(action + "() received an invalid obj.");
  }
  var page = getObj("page", obj.get('_pageid'));
  if(page == undefined){
    return Mock20_warning("Invalid pageid for " + action + "().");
  }
  var ids = page.get("_zorder").split(",");
  var valid_ids = [];
  if(action == "toBack"){
    valid_ids.push(obj.id);
  }
  for(var id of ids){
    if(id == obj.id){continue;}
    var item = findObjs({_id: id})[0];
    if(item){
      valid_ids.push(id);
    }
  }
  if(action == "toFront"){
    valid_ids.push(obj.id);
  }
  page.Mock20_update("_zorder", valid_ids.join());
}

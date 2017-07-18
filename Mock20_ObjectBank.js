require('./Functions/API_Events/On');

class Mock20_bank {
  constructor(){
    this.objCounter = 0;
  }

  create(proto, attributes){
    var id = this.objCounter.toString(16);
    var obj = new proto(id, attributes);
    var type = obj.get("_type");
    if(!this.addToPage(obj)){return;}
    if(obj.addToJournal){obj.addToJournal();}
    if(obj.addToJukebox){obj.addToJukebox();}
    this.objCounter++;
    if(this[type] == undefined){this[type] = {};}
    this[type][id] = obj;
    Mock20_trigger("add:" + type, obj);
    return obj;
  }

  remove(type, id){
    if(!this[type] || !this[type][id]){return;}
    var obj = this[type][id];
    //this.removeFromPage(this[type][id]); Roll20 currently fails to send an event for removing an object from a page
    if(obj.removeFromJournal){obj.removeFromJournal();} //Roll20 currently fails to send an event for removing a character/handout from the journal
    if(obj.removeFromJukebox){obj.removeFromJukebox();} //Roll20 currently fails to send an event for removing a jukeboxtrack from the jukebox
    delete this[type][id];
  }

  addToPage(obj){
    if(obj.Mock20_data._pageid != undefined){
      var page = this["page"][obj.get("_pageid")];
      if(!page){
        Mock20_warning("Invalid page id for " + type);
        return false;
      }
      page.Mock20_update("_zorder", page.get("_zorder") + "," + obj.id);
    }
    return true;
  }

  removeFromPage(obj){
    if(obj.Mock20_data._pageid != undefined){
      var page = this["page"][obj.get("_pageid")];
      if(!page){
        Mock20_warning("Invalid page id for " + type);
        return false;
      }
      var zorder = page.get("_zorder").split(",");
      for(var i = 0; i < zorder.length; i++){
        if(zorder[i] == obj.id){
          zorder.splice(i,1);
          i--;
        }
      }
      page.Mock20_update("_zorder", zorder.join());
    }
  }
};

var bank = new Mock20_bank();
module.exports = bank;

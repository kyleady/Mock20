var Bank = require('./../Mock20_ObjectBank');
var Campaign = require("./../Functions/API_Objects/Campaign");
var Mock20_object = require('./Mock20_object');

class Mock20_folder extends Mock20_object{
  constructor(_id, input, data){
    var data = data || {
      _id: "",
      _type: "folder",
      n: "Folder",
      _i: []
    }
    super(_id, input, data);
  }

  Mock20_update(property, newValue, journal){
    journal = journal || "_journalfolder";
    var oldValue = this.Mock20_data[property];
    this.Mock20_data[property] = newValue;
    var newStructure = this.getRootFolder(journal).getStructure()._i;
    this.Mock20_data[property] = oldValue;
    Campaign().Mock20_update(journal, JSON.stingify(newStructure));
    this.Mock20_data[property] = newValue;
  }

  getRootFolder(journal){
    journal = journal || "_journalfolder";
    var items = [];
    var rootInventory = JSON.parse("[" + Campaign().get(journal) + "]");
    for(var item of rootInventory){
      if(typeof item == "object"){
        items.push({
          _id: item.id.toString(),
          _type: "folder"
        });
      } else {
        items.push({
          _id: item.toString(),
          _type: "handout"
        });
      }
    }

    var rootfolder = new this.constructor("root", {
      n: "Root Folder",
      _i: items
    });
    return rootfolder;
  }

  folderObj(){
    return {
      n: this.Mock20_data.n,
      i: [],
      id: this.Mock20_data._id
    };
  }

  getStructure(){
    var folder = this.folderObj();
    for(var item of this.Mock20_data._i){
      if(item._type == "folder" || item._type == "playlist"){
        var subfolder = Bank["folder"][item._id];
        if(subfolder){
          folder.i.push(subfolder.getStructure());
        }
      } else {
        folder.i.push(item._id);
      }
    }
    return folder;
  }

  addItem(obj){
    var newItem = {};
    if(obj instanceof Mock20_object){
      newItem._type = obj.get("_type");
      newItem._id = obj.id;
    } else {
      newItem = obj;
    }
    this.Mock20_data._i.push(newItem);
  }

  removeItem(id){
    var homelessObjs = [];
    for(var j = 0; j < this.Mock20_data._i.length; j++){
      if(this.Mock20_data._i[j]._type == "folder"){
        var subfolder = Bank["folder"][this.Mock20_data._i[j]._id];
        if(this.Mock20_data._i[j]._id == id){
          homelessObjs = homelessObjs.concat(subfolder.containedObjs());
          this.Mock20_data._i.splice(j,1);
        } else {
          homelessObjs = homelessObjs.concat(subfolder.remove(id));
        }
      } else if(this.Mock20_data._i[j]._id == id){
        this.Mock20_data._i.splice(j,1);
      }
    }
    return homelessObjs;
  }

  containedObjs(){
    var objs = [];
    for(var item of this.Mock20_data._i){
      if(item._type == "folder" || item._type == "playlist"){
        var subfolder = Bank["folder"][item._type];
        if(subfolder){
          objs = objs.concat(subfolder.containedObjs());
        }
      } else {
        objs.push(item._id);
      }
    }
    return objs;
  }

  addToJournal(journal){
    journal = journal || "_journalfolder";
    var newList = JSON.stringify(this.getStructure()) + "," + Campaign().get(journal);
    newList = newList.replace(/,$/,"");
    Campaign().Mock20_update(journal, newList);
  }

  removeFromJournal(journal){
    journal = journal || "_journalfolder";
    var rootfolder = this.getRootFolder(journal);
    var homelessObjs = rootfolder.removeItem(this.id);
    for(var item of homelessObjs){
      if(Bank[item._type][item._id]){
        rootfolder.addItem(item);
      }
    }
    var newStructure = rootfolder.getStructure()._i;
    Campaign().Mock20_update("_journalfolder", JSON.stringify(newStructure));
  }
}

module.exports = Mock20_folder;

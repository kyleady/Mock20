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
    var rootfolder = this.constructor.getRootFolder(journal);
    rootfolder.saveAsRoot(journal);
  }

  static getRootFolder(journal, type){
    journal = journal || "_journalfolder";
    type = type || "folder";
    var items = [];
    var rootInventory = JSON.parse("[" + addQuotesToEachString(Campaign().get(journal)) + "]");
    for(var item of rootInventory){
      if(typeof item == "object"){
        items.push({
          _id: item.id.toString(),
          _type: type
        });
      } else {
        var obj = findObjs({_id: item.toString()})[0];
        if(!obj){continue;}
        items.push({
          _id: obj.id,
          _type: obj.get("_type")
        });
      }
    }

    var rootfolder = new this("root_folder", {
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
      if(item._type == this.get("_type")){
        var subfolder = Bank.get(item._type, item._id);
        if(subfolder){
          folder.i.push(subfolder.getStructure());
        }
      } else {
        folder.i.push(item._id);
      }
    }
    return folder;
  }

  findItem(itemid){
    for(var item of this.Mock20_data._i){
      if(item._id == itemid){
        return this.id;
      } else if(item._type == this.get("_type")){
        var subfolder = Bank.get(item._type, item._id);
        var found = undefined;
        if(subfolder){
          found = subfolder.findItem(itemid);
        }
        if(found){
          return found;
        }
      }
    }
  }

  addItem(obj, beforeid){
    var newItem = {};
    if(obj instanceof Mock20_object){
      newItem._type = obj.get("_type");
      newItem._id = obj.id;
    } else {
      newItem = obj;
    }
    for(var i = 0; i < this.Mock20_data._i.length; i++){
      if(this.Mock20_data._i[i]._id == beforeid){
        this.Mock20_data._i.splice(i, 0, newItem);
        return;
      }
    }
    this.Mock20_data._i.push(newItem);
  }

  removeItem(id){
    var homelessObjs = [];
    for(var j = 0; j < this.Mock20_data._i.length; j++){
      if(this.Mock20_data._i[j]._type == this.get("_type")){
        var subfolder = Bank.get(this.get("_type"), this.Mock20_data._i[j]._id);
        if(this.Mock20_data._i[j]._id == id){
          homelessObjs = homelessObjs.concat(subfolder.containedObjs());
          this.Mock20_data._i.splice(j,1);
        } else {
          homelessObjs = homelessObjs.concat(subfolder.removeItem(id));
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
      if(item._type == this.get("_type")){
        var subfolder = Bank.get(item._type, item._id);
        if(subfolder){
          objs = objs.concat(subfolder.containedObjs());
        }
      } else {
        objs.push(item);
      }
    }
    return objs;
  }

  deleteSubfolders(){
    for(var item of this.Mock20_data._i){
      if(item._type == this.get("_type")){
        var subfolder = Bank.get(item._type, item._id);
        if(subfolder){
          subfolder.deleteSubfolders();
          subfolder.remove({Mock20_override: true, Mock20_messyDelete: true});
        }
      }
    }
  }

  addToJournal(journal){
    journal = journal || "_journalfolder";
    var newList = JSON.stringify(this.getStructure()) + "," + Campaign().get(journal);
    newList = newList.replace(/,$/,"");
    Campaign().Mock20_update(journal, newList);
  }

  removeFromJournal(journal){
    journal = journal || "_journalfolder";
    var rootfolder = this.constructor.getRootFolder(journal);
    var homelessObjs = rootfolder.removeItem(this.id, true);
    this.deleteSubfolders();
    for(var item of homelessObjs){
      if(Bank.get(item._type, item._id)){
        rootfolder.addItem(item);
      }
    }
    rootfolder.saveAsRoot(journal);
  }

  saveAsRoot(journal){
    journal = journal || "_journalfolder";
    var output = "";
    var rootArray = this.getStructure().i;
    for(var item of rootArray){
      if(typeof item == "object"){
        output += JSON.stringify(item);
      } else {
        output += item;
      }
      output += ","
    }
    output = output.replace(/,$/,"");
    Campaign().Mock20_update(journal, output);
  }
}

var addQuotesToEachString = function(content){
  var depth = 0;
  var objectStart = undefined;
  var objectEnd = undefined;
  var removedObjects = [];
  for(var i = 0; i < content.length; i++){
    if(content[i] == "{"){
      if(depth == 0){objectStart = i;}
      depth++;
    } else if(content[i] == "}"){
      depth--;
      if(depth == 0){
        objectEnd = i+1;
        removedObjects.push(content.substring(objectStart, objectEnd));
        i -= objectEnd - objectStart;
        content = content.substring(0, objectStart) + "$" + (removedObjects.length-1) + content.substring(objectEnd);
      }
    }
  }
  content = content.replace(/[^,]+/g, "\"$&\"");
  content = content.replace(/\"\$(\d+)\"/g, function(match, p1, offset, string){
    return removedObjects[Number(p1)];
  });
  content = content.replace(/^,/, "\"\",");
  return content;
}

module.exports = Mock20_folder;

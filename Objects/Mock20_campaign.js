var Mock20_object = require('./Mock20_object');

class Mock20_campaign extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "root",
      _type: "campaign",
      turnorder: "",
      initiativepage: false,
      playerpageid: false,
      playerspecificpages: false,
      _journalfolder: "",
      _jukeboxfolder: ""
    }
    super(_id, input, data);
  }

  getFolderItems(folderType){
    var journalName = getJournalType(folderType);
    var journal = this.get(journalName);
    journal = "[" + addQuotesToEachString(journal) + "]";
    var rootInventory = JSON.parse(journal);
    var items = [];
    for(var item of rootInventory){
      if(typeof item == "object"){
        items.push({
          _id: item.id.toString(),
          _type: folderType
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
    return items;
  }

  addObjToJournal(obj){
    switch(obj.get("_type")){
      case "folder": case "playlist":
        var objInfo = JSON.stringify(obj.getStructure());
        break;
      case "handout": case "character": case "jukeboxtrack":
        var objInfo = obj.id;
        break;
      default:
        return;
    }
    var journal = getJournalType(obj);
    var newList = objInfo + "," + this.get(journal);
    newList = newList.replace(/,$/,"");
    this.Mock20_update(journal, newList);
  }

  saveRootFolder(folder){
    var rootArray = folder.getStructure().i;
    var output = "";
    for(var item of rootArray){
      if(typeof item == "object"){
        output += JSON.stringify(item);
      } else {
        output += item;
      }
      output += ","
    }
    output = output.replace(/,$/,"");
    var journal = getJournalType(folder);
    this.Mock20_update(journal, output);
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

function getJournalType(input){
  if(typeof input == 'object'){
    var input = input.get("_type");
  }
  if(input == "playlist" || input == "jukeboxtrack"){
    return "_jukeboxfolder";
  } else {
    return "_journalfolder";
  }
}

module.exports = Mock20_campaign;

var MOCK20object = require('./Mock20_object');
var findObjs = require('./../Functions/API_Objects/FindObjs');
var Bank = require('./Mock20_ObjectBank');
var on = require('./../Functions/API_Events/On');
var state = require('./../Functions/API_Objects/State');
class MOCK20campaign extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _id: 'root',
      _type: 'campaign',
      turnorder: '',
      initiativepage: false,
      playerpageid: false,
      playerspecificpages: false,
      _journalfolder: '',
      _jukeboxfolder: ''
    };
    super(_id, input, data);
  }

  getFolderItems(folderType) {
    var journalName = getJournalType(folderType);
    var journal = this.get(journalName);
    journal = '[' + addQuotesToEachString(journal) + ']';
    var rootInventory = JSON.parse(journal);
    var items = [];
    for (var item of rootInventory) {
      if (typeof item == 'object') {
        items.push({
          _id: item.id.toString(),
          _type: folderType,
        });
      } else {
        var obj = findObjs({ _id: item.toString() })[0];
        if (!obj) continue;
        items.push({
          _id: obj.id,
          _type: obj.get('_type'),
        });
      }
    }

    return items;
  }

  addObjToJournal(obj) {
    switch (obj.get('_type')) {
      case 'folder': case 'playlist':
        var objInfo = JSON.stringify(obj.getStructure());
        break;
      case 'handout': case 'character': case 'jukeboxtrack':
        var objInfo = obj.id;
        break;
      default:
        return;
    }
    var journal = getJournalType(obj);
    var newList = objInfo + ',' + this.get(journal);
    newList = newList.replace(/,$/, '');
    this.MOCK20update(journal, newList);
  }

  saveRootFolder(folder) {
    var rootArray = folder.getStructure().i;
    var output = '';
    for (var item of rootArray) {
      if (typeof item == 'object') {
        output += JSON.stringify(item);
      } else {
        output += item;
      }

      output += ',';
    }

    output = output.replace(/,$/, '');
    var journal = getJournalType(folder);
    this.MOCK20update(journal, output);
  }

  MOCK20reset() {
    Bank.MOCK20reset();
    on({ MOCK20reset: true });
    state = {};
    this.MOCK20data = {
      _id: 'root',
      _type: 'campaign',
      turnorder: '',
      initiativepage: false,
      playerpageid: false,
      playerspecificpages: false,
      _journalfolder: '',
      _jukeboxfolder: ''
    };
  }
}

var addQuotesToEachString = function (content) {
  var depth = 0;
  var objectStart = undefined;
  var objectEnd = undefined;
  var removedObjects = [];
  for (var i = 0; i < content.length; i++) {
    if (content[i] == '{') {
      if (depth == 0) objectStart = i;
      depth++;
    } else if (content[i] == '}') {
      depth--;
      if (depth == 0) {
        objectEnd = i + 1;
        removedObjects.push(content.substring(objectStart, objectEnd));
        i -= objectEnd - objectStart;
        var oldContent = content;
        content = oldContent.substring(0, objectStart);
        content += '$' + (removedObjects.length - 1);
        content += oldContent.substring(objectEnd);
      }
    }
  }

  content = content.replace(/[^,]+/g, '\"$&\"');
  content = content.replace(/\"\$(\d+)\"/g, function (match, p1, offset, string) {
    return removedObjects[Number(p1)];
  });

  content = content.replace(/^,/, '\"\",');
  return content;
};

function getJournalType(input) {
  if (typeof input == 'object') input = input.get('_type');
  if (input == 'playlist' || input == 'jukeboxtrack') {
    return '_jukeboxfolder';
  } else {
    return '_journalfolder';
  }
}

module.exports = MOCK20campaign;

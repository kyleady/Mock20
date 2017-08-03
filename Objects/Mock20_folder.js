var Bank = require('./../Objects/Mock20_ObjectBank');
var Campaign = require('./../Functions/API_Objects/Campaign');
var MOCK20object = require('./Mock20_object');

class MOCK20folder extends MOCK20object{
  constructor(_id, input, data) {
    var data = data || {
      _id: '',
      _type: 'folder',
      n: 'Folder',
      _i: []
    };
    super(_id, input, data);
  }

  MOCK20update(property, newValue) {
    super.MOCK20update(property, newValue);
    var rootfolder = this.constructor.getRootFolder();
    Campaign().saveRootFolder(rootfolder);
  }

  static getRootFolder() {
    var items = Campaign().getFolderItems(this.name.replace('MOCK20', ''));
    var rootfolder = new this('root_folder', {
      n: 'Root Folder',
      _i: items,
    });
    return rootfolder;
  }

  folderObj() {
    return {
      n: this.MOCK20data.n,
      i: [],
      id: this.MOCK20data._id,
    };
  }

  getStructure() {
    var folder = this.folderObj();
    for (var item of this.MOCK20data._i) {
      if (item._type == this.get('_type')) {
        var subfolder = Bank.get(item._type, item._id);
        if (subfolder) {
          folder.i.push(subfolder.getStructure());
        }
      } else {
        folder.i.push(item._id);
      }
    }

    return folder;
  }

  findItem(itemid) {
    for (var item of this.MOCK20data._i) {
      if (item._id == itemid) {
        return this.id;
      } else if (item._type == this.get('_type')) {
        var subfolder = Bank.get(item._type, item._id);
        var found = undefined;
        if (subfolder) found = subfolder.findItem(itemid);
        if (found) return found;
      }
    }
  }

  addItem(obj, beforeid) {
    var newItem = {};
    if (obj instanceof MOCK20object) {
      newItem._type = obj.get('_type');
      newItem._id = obj.id;
    } else {
      newItem = obj;
    }

    for (var i = 0; i < this.MOCK20data._i.length; i++) {
      if (this.MOCK20data._i[i]._id == beforeid) {
        this.MOCK20data._i.splice(i, 0, newItem);
        return;
      }
    }

    this.MOCK20data._i.push(newItem);
  }

  MOCK20addToJournal() {
    return Campaign().addObjToJournal(this);
  }

  removeItem(id) {
    var homelessObjs = [];
    for (var j = 0; j < this.MOCK20data._i.length; j++) {
      if (this.MOCK20data._i[j]._type == this.get('_type')) {
        var subfolder = Bank.get(this.get('_type'), this.MOCK20data._i[j]._id);
        if (this.MOCK20data._i[j]._id == id) {
          homelessObjs = homelessObjs.concat(subfolder.containedObjs());
          this.MOCK20data._i.splice(j, 1);
        } else {
          homelessObjs = homelessObjs.concat(subfolder.removeItem(id));
        }
      } else if (this.MOCK20data._i[j]._id == id) {
        this.MOCK20data._i.splice(j, 1);
      }
    }

    return homelessObjs;
  }

  containedObjs() {
    var objs = [];
    for (var item of this.MOCK20data._i) {
      if (item._type == this.get('_type')) {
        var subfolder = Bank.get(item._type, item._id);
        if (subfolder) objs = objs.concat(subfolder.containedObjs());
      } else {
        objs.push(item);
      }
    }

    return objs;
  }

  deleteSubfolders() {
    for (var item of this.MOCK20data._i) {
      if (item._type == this.get('_type')) {
        var subfolder = Bank.get(item._type, item._id);
        if (subfolder) {
          subfolder.deleteSubfolders();
          subfolder.remove({ MOCK20override: true, MOCK20messyDelete: true });
        }
      }
    }
  }

  removeFromJournal() {
    var rootfolder = this.constructor.getRootFolder();
    var homelessObjs = rootfolder.removeItem(this.id);
    this.deleteSubfolders();
    for (var item of homelessObjs) {
      if (Bank.get(item._type, item._id)) rootfolder.addItem(item);
    }

    Campaign().saveRootFolder(rootfolder);
  }
}

module.exports = MOCK20folder;

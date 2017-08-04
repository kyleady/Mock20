var MOCK20folder = require('./../../Objects/Mock20_folder');
var MOCK20playlist = require('./../../Objects/Mock20_playlist');
var Bank = require('./../../Objects/Mock20_ObjectBank');
var Campaign = require('./../API_Objects/Campaign');
require('./../../Mock20_Output');
module.exports.MOCK20moveToFolder = function (item, folderid) {
  moveToFolder(item, folderid, undefined);
};

module.exports.MOCK20moveBeforeFolderItem = function (item, targetid) {
  moveToFolder(item, undefined, targetid);
};

module.exports.MOCK20moveToPlaylist = function (item, folderid) {
  moveToFolder(item, folderid, undefined, '_jukeboxfolder', 'playlist');
};

module.exports.MOCK20moveBeforePlaylistItem = function (item, targetid) {
  moveToFolder(item, undefined, targetid, '_jukeboxfolder', 'playlist');
};

function moveToFolder(item, folderid, targetid, journal, type) {
  type = type || 'folder';
  var proto = (type == 'folder') ? MOCK20folder : MOCK20playlist;
  var rootfolder = proto.getRootFolder();
  if (typeof item != 'object' || !item.MOCK20addToJournal) {
    return MOCK20warning('moveToFolder: invalid item');
  }

  if (item.id == targetid) return;

  if (!folderid && targetid) folderid = rootfolder.findItem(targetid);
  if (folderid == 'root_folder') {
    var folder = rootfolder;
  } else {
    if (!folderid || !Bank.get(type, folderid)) {
      return MOCK20warning('moveToFolder: invalid folder');
    }

    var folder = Bank.get(type, folderid);
  }

  if (item.get('_type') == 'playlist' && folder.id != 'root_folder') {
    return MOCK20warning('moveToFolder: cannot move a playlist inside of a playlist');
  }

  if (item.get('_type') == type && (item.id == folder.id || item.findItem(folder.id))) {
    return MOCK20warning('moveToFolder: cannot move a folder into itself');
  }

  rootfolder.removeItem(item.id);
  folder.addItem(item, targetid);
  Campaign().saveRootFolder(rootfolder);
}

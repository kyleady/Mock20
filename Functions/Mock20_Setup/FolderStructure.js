var MOCK20folder = require('./../../Objects/Mock20_folder');
var MOCK20playlist = require('./../../Objects/Mock20_playlist');
var Bank = require('./../../Mock20_ObjectBank');
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
  rootfolder.removeItem(item.id);
  if (!folderid && targetid) var folderid = rootfolder.findItem(targetid);
  if (folderid && folderid != 'root_folder' && Bank.get(type, folderid)) {
    var folder = Bank.get(type, folderid);
  } else {
    var folder = rootfolder;
  }

  folder.addItem(item, targetid);
  Campaign().saveRootFolder(rootfolder);
}

var Mock20_folder = require('./../../Objects/Mock20_folder');
var Mock20_playlist = require('./../../Objects/Mock20_playlist');
var Bank = require('./../../Mock20_ObjectBank');
module.exports.Mock20_moveToFolder = function(item, folderid){
  moveToFolder(item, folderid, undefined);
}

module.exports.Mock20_moveBeforeFolderItem = function(item, targetid){
  moveToFolder(item, undefined, targetid);
}

module.exports.Mock20_moveToPlaylist = function(item, folderid){
  moveToFolder(item, folderid, undefined, "_jukeboxfolder", "playlist");
}

module.exports.Mock20_moveBeforePlaylistItem = function(item, targetid){
  moveToFolder(item, undefined, targetid, "_jukeboxfolder", "playlist");
}

function moveToFolder(item, folderid, targetid, journal, type){
  type = type || "folder";
  var proto = (type == "folder") ? Mock20_folder : Mock20_playlist;
  var rootfolder = proto.getRootFolder();
  rootfolder.removeItem(item.id);
  if(!folderid && targetid){
    var folderid = rootfolder.findItem(targetid);
  }
  if(folderid && folderid != "root_folder" && Bank.get(type, folderid)){
    var folder = Bank.get(type, folderid);
  } else {
    var folder = rootfolder;
  }
  folder.addItem(item, targetid);
  Campaign().saveRootFolder(rootfolder);
}

var Mock20_folder = require('./Mock20_folder');
var Campaign = require("./../Functions/API_Objects/Campaign");

class Mock20_playlist extends Mock20_folder{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "playlist",
      n: "Playlist",
      _i: [],
      s: "s"
    }
    super(_id, input, data);
    this.addToJournal = false;
    this.removeFromJournal = false;
  }
  folderObj(){
    return {
      n: this.Mock20_data.n,
      i: [],
      id: this.Mock20_data._id,
      s: this.Mock20_data.s
    };
  }
  Mock20_update(property, newValue, journal){
    return super.Mock20_update(property, newValue, "_jukeboxfolder");
  }
  backToBack(){
    return this.set("s", "b");
  }
  shuffle(){
    return this.set("s", "s");
  }
  allAtOnce(){
    return this.set("s", "a");
  }
  addToJukebox(){
    super.addToJournal("_jukeboxfolder");
  }
  removeFromJukebox(){
    super.removeFromJournal("_jukeboxfolder");
  }
  static getRootFolder(journal, type){
    return super.getRootFolder("_jukeboxfolder", "playlist");
  }
  saveAsRoot(){
    super.saveAsRoot("_jukeboxfolder");
  }
}

module.exports = Mock20_playlist;

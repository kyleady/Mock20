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
  }
  folderObj(){
    return {
      n: this.Mock20_data.n,
      i: [],
      id: this.Mock20_data._id,
      s: this.Mock20_data.s
    };
  }
}

module.exports = Mock20_playlist;

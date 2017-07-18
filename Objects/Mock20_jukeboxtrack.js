var Mock20_object = require('./Mock20_object');
var Campaign = require("./../Functions/API_Objects/Campaign");

class Mock20_jukeboxtrack extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "jukeboxtrack",
      playing: false,
      softstop: false,
      title: "",
      volume: 30,
      loop: false
    }
    super(_id, input, data);
  }

  addToJukebox(){
    Campaign().Mock20_update("_jukeboxfolder", Campaign().get("_jukeboxfolder") + "," + this.id);
  }
}

module.exports = Mock20_jukeboxtrack;

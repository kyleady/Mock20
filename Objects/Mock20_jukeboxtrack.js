var Mock20_object = require('./Mock20_object');

class Mock20_hand extends Mock20_object{
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
}

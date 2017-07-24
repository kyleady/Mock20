var MOCK20object = require('./Mock20_object');
var Campaign = require('./../Functions/API_Objects/Campaign');

class MOCK20jukeboxtrack extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'jukeboxtrack',
      playing: false,
      softstop: false,
      title: '',
      volume: 30,
      loop: false
    };
    super(_id, input, data);
  }

  MOCK20addToJournal() {
    return Campaign().addObjToJournal(this);
  }
}

module.exports = MOCK20jukeboxtrack;

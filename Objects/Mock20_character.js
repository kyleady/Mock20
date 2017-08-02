var MOCK20object = require('./Mock20_object');
var Campaign = require('./../Functions/API_Objects/Campaign');

class MOCK20character extends MOCK20object{
  constructor(_id, input, data) {
    data = data || {
      _id: '',
      _type: 'character',
      avatar: '',
      name: '',
      bio: '',
      gmnotes: '',
      archived: false,
      inplayerjournals: '',
      controlledby: '',
      _defaulttoken: ''
    };
    super(_id, input, data);
  }

  get(property, callBack) {
    if (property == 'bio' || property == 'gmnotes' || property == 'notes') {
      var notes = this.MOCK20data[property];
      setTimeout(function () {
        callBack(notes);
      }, 100);
    } else {
      return super.get(property);
    }
  }

  MOCK20addToJournal() {
    return Campaign().addObjToJournal(this);
  }
}

module.exports = MOCK20character;

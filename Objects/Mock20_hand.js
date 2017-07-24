var MOCK20object = require('./Mock20_object');

class MOCK20hand extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _currentHand: '',
      _type: 'hand',
      _parentid: '',
      _id: '',
      currentView: 'bydeck'
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20hand;

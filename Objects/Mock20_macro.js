var MOCK20object = require('./Mock20_object');

class MOCK20macro extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'macro',
      _playerid: '',
      name: '',
      action: '',
      visibleto: '',
      istokenaction: false
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20macro;

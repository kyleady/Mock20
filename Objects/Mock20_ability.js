var MOCK20object = require('./Mock20_object');

class MOCK20ability extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'ability',
      _characterid: '',
      name: 'Untitled_Ability',
      description: '',
      action: '',
      istokenaction: false
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20ability;

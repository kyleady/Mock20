var MOCK20character = require('./Mock20_character');

class MOCK20handout extends MOCK20character{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'handout',
      avatar: '',
      name: '',
      notes: '',
      gmnotes: '',
      inplayerjournals: '',
      archived: false,
      controlledby: ''
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20handout;

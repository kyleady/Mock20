var MOCK20object = require('./Mock20_object');

class MOCK20card extends MOCK20object{
  constructor(_id, input) {
    var data = {
      name: '',
      avatar: '',
      _deckid: '',
      _type: 'card',
      _id: ''
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20card;

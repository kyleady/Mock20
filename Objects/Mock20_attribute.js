var MOCK20object = require('./Mock20_object');

class MOCK20attribute extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'attribute',
      _characterid: '',
      name: 'Untitled',
      current: '',
      max: ''
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20attribute;

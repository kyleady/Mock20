var MOCK20object = require('./Mock20_object');

class MOCK20rollabletable extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'rollabletable',
      name: 'new-table',
      showplayers: true
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20rollabletable;

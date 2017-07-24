var MOCK20object = require('./Mock20_object');

class MOCK20tableitem extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'tableitem',
      _rollabletableid: '',
      avatar: '',
      name: '',
      weight: 1
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20tableitem;

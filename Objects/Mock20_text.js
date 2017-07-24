var MOCK20object = require('./Mock20_object');

class MOCK20text extends MOCK20object{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'text',
      _pageid: '',
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      text: '',
      font_size: 16,
      rotation: 0,
      color: 'rgb(0, 0, 0)',
      font_family: 'unset',
      layer: '',
      controlledby: ''
    };
    super(_id, input, data);
  }
}

module.exports = MOCK20text;

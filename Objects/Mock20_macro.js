var Mock20_object = require('./Mock20_object');

class Mock20_macro extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "macro",
      _playerid: "",
      name: "",
      action: "",
      visibleto: "",
      istokenaction: false
    }
    super(_id, input, data);
  }
}

module.exports = Mock20_macro;
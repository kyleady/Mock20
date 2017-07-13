var Mock20_object = require('./Mock20_object');

class Mock20_ability extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "ability",
      _characterid: "",
      name: "Untitled_Ability",
      description: "",
      action: "",
      istokenaction: false
    }
    super(_id, input, data);
  }
}

module.exports = Mock20_ability;

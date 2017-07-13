var Mock20_character = require('./Mock20_character');

class Mock20_handout extends Mock20_character{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "handout",
      avatar: "",
      name: "",
      notes: "",
      gmnotes: "",
      inplayerjournals: "",
      archived: false,
      controlledby: ""
    }
    super(_id, input, data);
  }
}

module.exports = Mock20_handout;

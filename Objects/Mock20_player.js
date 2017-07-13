var Mock20_object = require('./Mock20_object');

class Mock20_player extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "player",
      _d20userid: "",
      _displayname: "",
      _online: false,
      _lastpage: "",
      _macrobar: "",
      speakingas: "",
      color: "#13B9F0",
      showmacrobar: false
    }
    super(_id, input, data);
  }
}

module.exports = Mock20_player;

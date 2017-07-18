var sendChat = require("./../Functions/API_Chat/SendChat");
var Mock20_object = require('./Mock20_object');

class Mock20_player extends Mock20_object{
  constructor(_id, input, Mock20_gm){
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
    this.Mock20_gm = Mock20_gm == true;
  }

  chat(msg){
    var who = this.get("speakingas") || this.get("_displayname");
    var options = {playerid: this.get("_id")};
    sendChat(who, msg, null, options);
  }
}

module.exports = Mock20_player;

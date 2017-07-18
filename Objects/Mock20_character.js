var Mock20_object = require('./Mock20_object');
var Campaign = require("./../Functions/API_Objects/Campaign");

class Mock20_character extends Mock20_object{
  constructor(_id, input, data){
    data = data || {
      _id: "",
      _type: "character",
      avatar: "",
      name: "",
      bio: "",
      gmnotes: "",
      archived: false,
      inplayerjournals: "",
      controlledby: "",
      _defaulttoken: ""
    }
    super(_id, input, data);
  }

  get(property, callBack){
    if(property == "bio" || property == "gmnotes" || property == "notes"){
      setTimeout(function(){
        callBack(this.Mock20_data[property]);
      }, 1000);
    } else {
      return super.get(property);
    }
  }

  addToJournal(){
    var newList = this.id + "," + Campaign().get("_journalfolder");
    newList = newList.replace(/,$/,"");
    Campaign().Mock20_update("_journalfolder", newList);
  }
}

module.exports = Mock20_character;

var Mock20_object = require('./Mock20_object');

class Mock20_attribute extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "attribute",
      _characterid: "",
      name: "Untitled",
      current: "",
      max: ""
    }
    super(_id, input, data);
  }
}

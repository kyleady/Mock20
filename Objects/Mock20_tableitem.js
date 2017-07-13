var Mock20_object = require('./Mock20_object');

class Mock20_tableitem extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "tableitem",
      _rollabletableid: "",
      avatar: "",
      name: "",
      weight: 1
    }
    super(_id, input, data);
  }
}

module.exports = Mock20_tableitem;

var Mock20_object = require('./Mock20_object');

class Mock20_rollabletable extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "rollabletable",
      name: "new-table",
      showplayers: true
    }
    super(_id, input, data);
  }
}

module.exports = Mock20_rollabletable;

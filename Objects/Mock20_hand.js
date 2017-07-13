var Mock20_object = require('./Mock20_object');

class Mock20_hand extends Mock20_object{
  constructor(_id, input){
    var data = {
      _currentHand: "",
      _type: "hand",
      _parentid: "",
      _id: "",
      currentView: "bydeck"
    }
    super(_id, input, data);
  }
}

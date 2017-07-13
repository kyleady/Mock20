var Mock20_object = require('./Mock20_object');

class Mock20_text extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "text",
      _pageid: "",
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      text: "",
      font_size: 16,
      rotation: 0,
      color: "rgb(0, 0, 0)",
      font_family: "unset",
      layer: "",
      controlledby: ""
    }
    super(_id, input, data);
  }
}

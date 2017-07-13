var Mock20_object = require('./Mock20_object');

class Mock20_path extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "path",
      _pageid: "",
      _path: {},
      fill: "transparent",
      stroke: "#000000",
      rotation: 0,
      layer: "",
      stroke_width: 5,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      scaleX: 1,
      scaleY: 1,
      controlledby: ""
    }
    super(_id, input, data);
  }
}

module.exports = Mock20_path;

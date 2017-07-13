var Mock20_object = require('./Mock20_object');
require('./../Mock20_Output');

class Mock20_statusmarkers {
  constructor(str){
    var markerArray = str.split(",");
    for(var i = 0; i < markerArray.length; i++){
      var matches = markerArray[i].match(/^([^@]+)@?(\d*)$/);
      if(matches){
        if(matches[2]){
          this[matches[1]] = matches[2];
        } else {
          this[matches[1]] = true;
        }
      }
    }
  }

  toString(){
    var markerStr = "";
    for(var k in this){
      if(this[k] && typeof this[k] != "function"){
        markerStr += k;
        if(/\d+/.test(this[k])){
          markerStr += "@" + this[k]
        }
        markerStr += ",";
      }
    }
    return markerStr.replace(/,$/,"");
  }
}

class Mock20_graphic extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "graphic",
      _subtype: "token",
      _cardid: "",
      _pageid: "",
      imgsrc: "",
      bar1_link: "",
      bar2_link: "",
      bar3_link: "",
      represents: "",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      rotation: 0,
      layer: "",
      isdrawing: false,
      flipv: false,
      fliph: false,
      name: "",
      gmnotes: "",
      controlledby: "",
      bar1_value: "",
      bar2_value: "",
      bar3_value: "",
      bar1_max: "",
      bar2_max: "",
      bar3_max: "",
      aura1_radius: "",
      aura2_radius: "",
      aura1_color: 	"#FFFF99",
      aura2_color: 	"#59E594",
      aura1_square: false,
      aura2_square: false,
      tint_color: "transparent",
      statusmarkers: "",
      showname: false,
      showplayers_name: false,
      showplayers_bar1: false,
      showplayers_bar2: false,
      showplayers_bar3: false,
      showplayers_aura1: false,
      showplayers_aura2: false,
      playersedit_name: true,
      playersedit_bar1: true,
      playersedit_bar2: true,
      playersedit_bar3: true,
      playersedit_aura1: true,
      playersedit_aura2: true,
      light_radius: "",
      light_dimradius: "",
      light_otherplayers: false,
      light_hassight: false,
      light_angle: "360",
      light_losangle: "360",
      lastmove: "",
      light_multiplier: "1"
    }
    super(_id, input, data);
    this.valid_markers = [
      "red",
      "blue",
      "green",
      "brown",
      "purple",
      "pink",
      "yellow",
      "dead",
      "skull",
      "sleepy",
      "half-heart",
      "half-haze",
      "interdiction",
      "snail",
      "lightning-helix",
      "spanner",
      "chained-heart",
      "chemical-bolt",
      "death-zone",
      "drink-me",
      "edge-crack",
      "ninja-mask",
      "stopwatch",
      "fishing-net",
      "overdrive",
      "strong",
      "fist",
      "padlock",
      "three-leaves",
      "fluffy-wing",
      "pummeled",
      "tread",
      "arrowed",
      "aura",
      "back-pain",
      "black-flag",
      "bleeding-eye",
      "bolt-shield",
      "broken-heart",
      "cobweb",
      "broken-shield",
      "flying-flag",
      "radioactive",
      "trophy",
      "broken-skull",
      "frozen-orb",
      "rolling-bomb",
      "white-tower",
      "grab",
      "screaming",
      "grenade",
      "sentry-gun",
      "all-for-one",
      "angel-outfit",
      "archery-target"
    ];
  }

  get(property){
    if(/^status_/.test(property)){
      property = property.replace("status_","");
      if(this.valid_markers.indexOf(property) == -1){
        Mock20_warning(this.Mock20_data._type + " does not have a " + property + " status marker.");
        return;
      }
      var markerObj = new Mock20_statusmarkers(this.Mock20_data.statusmarkers);
      if(markerObj[property]){
        return markerObj[property];
      } else {
        return false;
      }
    } else {
      return super.get(property);
    }
  }

  set(property, newValue){
    if(/^status_/.test(property)){
      property = property.replace("status_","");
      if(this.valid_markers.indexOf(property) == -1){
        Mock20_warning(this.Mock20_data._type + " does not have a " + property + " status marker.");
        return;
      }
      var markerObj = new Mock20_statusmarkers(this.Mock20_data.statusmarkers);
      if(typeof newValue == "string" && /^\d+$/.test(newValue)){
        markerObj[property] = newValue;
      } else {
        markerObj[property] = newValue == true;
      }
      super.set("statusmarkers", markerObj.toString());
    } else {
      return super.set(property, newValue);
    }
  }
}

module.exports = Mock20_graphic;

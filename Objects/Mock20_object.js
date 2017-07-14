require('./../Mock20_Output');
require('./../Functions/API_Events/On');
var Bank = require('./../Mock20_ObjectBank');

class Mock20_prevObject{
  constructor(obj){
    for(var k in obj.Mock20_data){
      this[k] = obj.Mock20_data[k];
    }
  }
  get(property){
    return this[property];
  }
  set(property, newValue){
    return this[property] = newValue;
  }
}

class Mock20_object{
  constructor(_id, input, data){
    this.Mock20_data = data || {
      _id: "",
      _type: "object"
    };
    input = input || {};
    for(var k in input){
      if(this.Mock20_data[k] != undefined){
        this.Mock20_data[k] = input[k];
      }
    }
    this.Mock20_data._id = _id;
  }
  get id(){
    return this.Mock20_data._id;
  }

  get(property){
    if(this.Mock20_data[property] != undefined){
      return this.Mock20_data[property];
    }
    Mock20_warning(this.Mock20_data._type + " does not have a " + property + " property.");
  }

  set(property, newValue){
    if(typeof property == "object"){
      for(var k in property){
        this.set(k, property[k]);
      }
    }
    if(newValue == undefined){
      Mock20_warning("You cannot set a value to undefined.")
      return;
    }
    if(/^_/.test(property)){
      Mock20_warning(property + " is a protected property.");
    }
    if(this.Mock20_data[property] != undefined){
      var prev = new Mock20_prevObject(this);
      this.Mock20_data[property] = newValue;
      Mock20_trigger("change:" + this.Mock20_data._type + ":" + property, this, prev);
      Mock20_trigger("change:" + this.Mock20_data._type, this, prev);
      return this.Mock20_data[property];
    }
    Mock20_warning(this.Mock20_data._type + " does not have a " + property + " property.");
  }

  remove(){
    Mock20_trigger("destroy:" + this.Mock20_data._type, this);
    delete Bank[this.Mock20_data._type][this.Mock20_data._id];
  }
}

module.exports = Mock20_object;

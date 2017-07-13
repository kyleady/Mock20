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
      return this.Mock20_data[property] = newValue;
    }
    Mock20_warning(this.Mock20_data._type + " does not have a " + property + " property.");
  }

  remove(){
    var Bank = require('./../Mock20_ObjectBank');
    delete Bank[this.Mock20_data._type][this.Mock20_data._id];
  }
}

module.exports = Mock20_object;

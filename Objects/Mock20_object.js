require('./../Mock20_Output');
require('./../Functions/API_Events/On');
var Bank = require('./../Mock20_ObjectBank');
var canRemove = {
   graphic: true,
   text: true,
   path: true,
   character: true,
   ability: true,
   attribute: true,
   handout: true,
   rollabletable: true,
   tableitem: true,
   macro: true
}

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
      return;
    }
    if(newValue == undefined){
      Mock20_warning("You cannot set a value to undefined.")
      return;
    }
    if(/^_/.test(property)){
      Mock20_warning(property + " is a protected property.");
    }
    if(this.Mock20_data[property] != undefined){
      return this.Mock20_update(property, newValue);
    }
    Mock20_warning(this.Mock20_data._type + " does not have a " + property + " property.");
  }

  Mock20_update(property, newValue){
    var prev = new Mock20_prevObject(this);
    if(newValue != undefined){
      this.Mock20_data[property] = newValue;
    }
    if(property != undefined){
      Mock20_trigger("change:" + this.Mock20_data._type + ":" + property, this, prev);
    }
    Mock20_trigger("change:" + this.Mock20_data._type, this, prev);
    return this.Mock20_data[property];
  }

  remove(options){
    options = options || {};
    if(!canRemove[this.get("_type")] && !options.Mock20_override){
      Mock20_warning("Cannot remove " + this.get("_type") + " objects.");
      return;
    }
    Mock20_trigger("destroy:" + this.get("_type"), this);
    Bank.remove(this.get("_type"), this.id, options);
  }
}

module.exports = Mock20_object;

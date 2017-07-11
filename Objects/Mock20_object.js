class Mock20_object{
  constructor(_id, input){
    var data = data || {
      _id: ""
      _type: "object"
    };
    for(var k in input){
      if(data[k] != undefined){
        data[k] = input[k];
      }
    }
    data._id = _id;
  }
  get id(){
    return data._id;
  }

  get(property){
    if(data[property] != undefined){
      return data[property];
    }
    Mock20_warning(data._type + " does not have a " + property + " property.");
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
    if(data[property] != undefined){
      return data[property] = newValue;
    }
    Mock20_warning(data._type + " does not have a " + property + " property.");
  }
}

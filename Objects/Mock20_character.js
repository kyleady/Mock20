class Mock20_character extends Mock20_object{
  constructor(_id, input, data){
    data = data || {
      _id: "",
      _type: "character",
      avatar: "",
      name: "",
      bio: "",
      gmnotes: "",
      archived: false,
      inplayerjournals: "",
      controlledby: "",
      _defaulttoken: ""
    }
    super(_id, input, data);
  }
}

get(property, callBack){
  if(property == "bio" || property == "gmnotes" || property == "notes"){
    setTimeout(function(){
      callBack(this.Mock20_data[property]);
    }, 1000);
  } else {
    return super.get(property);
  }
}

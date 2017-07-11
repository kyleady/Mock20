class Mock20_character extends Mock20_object{
  constructor(_id, input){
    var data = {
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
    super(_id, input);
  }
}

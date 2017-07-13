class Mock20_handout extends Mock20_character{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "handout",
      avatar: "",
      name: "",
      notes: "",
      gmnotes: "",
      inplayerjournals: "",
      archived: false,
      controlledby: ""
    }
    super(_id, input, data);
  }
}

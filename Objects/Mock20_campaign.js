class Mock20_campaign extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "root",
      _type: "campaign",
      turnorder: "",
      initiativepage: false,
      playerpageid: false,
      playerspecificpages: false,
      _journalfolder: "",
      _jukeboxfolder: ""
    }
    super(_id, input, data);
  }
}

class Mock20_page extends Mock20_object{
  constructor(_id, input){
    var data = {
      _id: "",
      _type: "page",
      _zorder: "",
      name: "",
      showgrid: true,
      showdarkness: false,
      showlighting: false,
      width: 25,
      height: 25,
      snapping_increment: 1,
      grid_opacity: 0.5,
      fog_opacity: 0.35,
      background_color: "#FFFFFF",
      gridcolor: "#C0C0C0",
      grid_type: "square",
      scale_number: 5,
      scale_units: "ft",
      gridlabels: false,
      diagonaltype: "foure",
      archived: false,
      lightupdatedrop: false,
      lightenforcelos: false,
      lightrestrictmove: false,
      lightglobalilim: false
    }
    super(_id, input);
  }
}

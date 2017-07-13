require('./Mock20');

console.log("==Create Objects==")
var graphic = createObj("graphic", {name: "Graphic Name"});
var deck = createObj("deck", {name: "Deck Name"});
var graphic2 = createObj("graphic", {name: "Graphic2"})
console.log(graphic.get("name"));
console.log(deck.get("name"));
console.log(graphic2.get("name"));

console.log("==Get Obj==")
graphic = getObj("graphic", graphic.id);
console.log(graphic.get("name"));

console.log("==Find Objs==");
graphic = findObjs({
  _type: "graphic",
  name: graphic.get("name")
})[0];
console.log(graphic.get("name"));

console.log("==Filter Objs==");
graphic2 = filterObjs(function(obj){
  return !/Name$/.test(obj.get("name"));
})[0];
console.log(graphic2.get("name"));

console.log('==Get Attribute By Name==')
var character = createObj("character", {name: "Chracter Name"});
var attribute = createObj("attribute", {
  name: "Attribute Name",
  _characterid: character.id,
  current: 10,
  max: 100
});
var attribute2 = createObj("attribute", {
  name: "Attribute2",
  _characterid: character.id,
  current: 20,
  max: 200
});
console.log(attribute.get("name"));
console.log(attribute.get("_characterid"));
console.log(getAttrByName(character.id, "Attribute Name", "current"));
console.log(getAttrByName(character.id, "Attribute Name"));
console.log(getAttrByName(character.id, undefined));
console.log(getAttrByName(undefined, "Attribute Name", "current"));
console.log(getAttrByName(character.id, "This Attribute Does Not Exist", "current"))

console.log('==GetAllObjs==');
var everyObj = getAllObjs();
var everyName = "";
for(var k in everyObj){
  everyName += everyObj[k].get("name") + ", ";
}
console.log(everyName);

console.log('==Campaign==')
var turnorder = [];
turnorder.push({
  id: "-1",
  pr: "15",
  custom: "Turn Counter"
});
Campaign().set("turnorder", JSON.stringify(turnorder));
console.log(Campaign().get("turnorder"));

console.log("==State==");
state.mySavedData = "1,2,3";
console.log(state.mySavedData);

console.log('==Underscore==')
_.each(["underscore", "is", "available"], function(text){
  console.log(text);
});

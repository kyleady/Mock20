require('./Mock20');

log("==Create Objects==")
var page = createObj("page", {name: "1st Page"}, {Mock20_override: true});
var graphic = createObj("graphic", {name: "Graphic Name", _pageid: page.id});
var deck = createObj("deck", {name: "Deck Name"}, {Mock20_override: true});
var graphic2 = createObj("graphic", {name: "Graphic2", _pageid: page.id});
log(graphic.get("name"));
log(deck.get("name"));
log(graphic2.get("name"));

log("==Get Obj==")
graphic = getObj("graphic", graphic.id);
log(graphic.get("name"));

log("==Find Objs==");
graphic = findObjs({
  _type: "graphic",
  name: graphic.get("name")
})[0];
log(graphic.get("name"));

log("==Filter Objs==");
graphic2 = filterObjs(function(obj){
  return !/Name$/.test(obj.get("name"));
})[0];
log(graphic2.get("name"));

log('==Get Attribute By Name==')
var character = createObj("character", {name: "Character Name"});
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
log(attribute.get("name"));
log(attribute.get("_characterid"));
log(getAttrByName(character.id, "Attribute Name", "current"));
log(getAttrByName(character.id, "Attribute Name"));
log(getAttrByName(character.id, undefined));
log(getAttrByName(undefined, "Attribute Name", "current"));
log(getAttrByName(character.id, "This Attribute Does Not Exist", "current"))

log('==GetAllObjs==');
var everyObj = getAllObjs();
var everyName = "";
for(var k in everyObj){
  everyName += everyObj[k].get("name") + ", ";
}
log(everyName);

log('==Campaign==')
var turnorder = [];
turnorder.push({
  id: "-1",
  pr: "15",
  custom: "Turn Counter"
});
Campaign().set("turnorder", JSON.stringify(turnorder));
log(Campaign().get("turnorder"));

log("==State==");
state.mySavedData = "1,2,3";
log(state.mySavedData);

log('==On==')
on("ready", function(){log('Campaign ready.')});
on("destroy:path", function(obj, prev){ log(obj.get("_type") + " destroyed.");});
on("change:path", function(obj){ log(obj.get("_type") + " changed.");});
on("change:path:rotation", function(obj, prev){ log(obj.get("_type") + " rotation changed from " + prev["rotation"] + " to " + obj.get("rotation"));});
on("change:path:rotation", function(obj, prev){ log(obj.get("_type") + " rotation changed from " + prev.get("rotation") + " to " + obj.get("rotation") + " (2nd function)");});
on("add:path", function(obj){ log(obj.get("_type") + " added.");});
log("creating path...");
var path = createObj("path", {_pageid: page.id});
log("changing path width...");
path.set("width", 5);
log("changing path rotation...")
path.set("rotation", 10);
log("deleting path...")
path.remove();

log('==Send Chat==')
on("chat:message", function(msg){log(msg);});
var player20 = createObj("player", {_displayname: "player 20"}, {Mock20_override: true});
var tester = createObj("player", {_displayname: "tester"}, {Mock20_override: true});
var character20 = createObj("character", {name: "character 20", controlledby: player20.id});
var everyman = createObj("character", {name: "everyman", controlledby: "all," + tester.id});
sendChat("player|" + player20.id, "This is a test!");
sendChat("The System", "/w Character Hello there, Character Name or character 20. It depends who was found first.");
tester.chat("/w \"Character Name\" Hello there, Character Name.");
tester.chat("/w everyman Hello there, everyone who controls everyman.");
sendChat("character|" + character.id, "/w \"Character 20\" Hello there, player 20 through character 20.");
sendChat("The Tester", "/em shakes his fist.");
player20.set("speakingas", "character|" + character20.id);
player20.chat("[[d20]] [[[[d20]]d20]]");
player20.chat("/r D20");
player20.chat("/gr d20");

log('==Underscore==')
_.each(["underscore", "is", "available"], function(text){
  log(text);
});

log('==Jukebox==');
playJukeboxPlaylist();
stopJukeboxPlaylist();
log("empty functions");

log("==Log==");
log(page);

log("==Object Ordering==");
log(page.get("_zorder"));
toBack(graphic);
log(page.get("_zorder"));
toFront(graphic);
log(page.get("_zorder"));
log("The recently deleted Path 7 disappeared only when we started rearranging objects.")

log("==Player Is GM==")
player20.Mock20_gm = true;
log(playerIsGM(player20.id));
log(playerIsGM(tester.id));

log("==Random Integer==");
var rolls = {};
for(var i = 1; i <= 20; i++){
  rolls[i] = 0;
}
for(var i = 0; i < 2000000; i++){
  rolls[randomInteger(20)]++;
}
for(var i = 1; i <= 20; i++){
  rolls[i] /= 20000;
  rolls[i] += "%";
}
log(JSON.stringify(rolls));

log("==Send Ping==");
sendPing();
log("empty function");

Mock20_endOfLastScript();

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
log("The recently deleted Path 7 disappeared only when we started rearranging objects. This is how Roll20 behaves and I sought to replicate it.")

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

log("==Journal==");
on("change:campaign:_journalfolder", function(obj){log(obj.get("_journalfolder"));});
log("Create Folder 1")
var folder1 = createObj("folder", {n: "Folder 1"}, {Mock20_override: true});
log("Create Suspicious Note")
var handout = createObj("handout", {n: "Suspicious Note"});
log("Create Folder 2")
var folder2 = createObj("folder", {n: "Folder 2"}, {Mock20_override: true});
log("Move Folder 2 into Folder 1")
Mock20_moveToFolder(folder2, folder1.id);
log("Move Suspicious Note into Folder 1")
Mock20_moveToFolder(handout, folder1.id);
log("Move Folder 1 into the Root Folder")
Mock20_moveToFolder(folder1, "root_folder");
log("Move Folder 1 before the Suspicious Note (inside of itself).")
Mock20_moveBeforeFolderItem(folder1, handout.id);
log("Move character 20 into Folder 2")
Mock20_moveToFolder(character20, folder2.id);
log("Move Folder 1 before Chracter Name");
Mock20_moveBeforeFolderItem(folder1, character.id);
log("Delete Folder 1")
folder1.remove({Mock20_override: true});
log("Does the subfolder, Folder 2, exist anymore?")
log(getObj("folder", folder2.id, {Mock20_override: true}) ? "Yep!" : "Nope.");

log("==Jukebox==");
on("change:campaign:_jukeboxfolder", function(obj){log(obj.get("_jukeboxfolder"));});
log("Create Playlist 1")
var playlist1 = createObj("playlist", {n: "Playlist 1"}, {Mock20_override: true});
log("Create Spooky Music")
var spooky = createObj("jukeboxtrack", {n: "Spooky Music"}, {Mock20_override: true});
log("Create Happy Music")
var happy = createObj("jukeboxtrack", {n: "Happy Music"}, {Mock20_override: true});
log("Create Sad Music")
var sad = createObj("jukeboxtrack", {n: "Sad Music"}, {Mock20_override: true});
log("Create Playlist 2")
var playlist2 = createObj("playlist", {n: "Playlist 2"}, {Mock20_override: true});
log("Move Spooky Music into Playlist 1")
Mock20_moveToPlaylist(spooky, playlist1.id);
log("Move Happy Music into Playlist 1")
Mock20_moveToPlaylist(happy, playlist1.id);
log("Move Sad Music into Playlist 2")
Mock20_moveToPlaylist(sad, playlist2.id);
log("Delete Playlist 1")
playlist1.remove({Mock20_override: true});
log("Move Playlist 2 before Happy Music")
Mock20_moveBeforePlaylistItem(playlist2, happy.id);

Mock20_endOfLastScript();

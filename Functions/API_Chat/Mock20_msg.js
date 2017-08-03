var getObj = require('./../API_Objects/GetObj');
var filterObjs = require('./../API_Objects/FilterObjs');
var msg = {};
var getMOCK20msg = function(speakingAs, input, options) {
  msg = {};
  options = options || {};
  parseSpeaker(speakingAs, options);
  parseInput(input);
  if(msg.type == "api" && options.MOCK20selected) msg.selected = options.MOCK20selected;
  return msg;
}

var parseSpeaker = function(speakingAs, options) {
  if (/^character\|/.test(speakingAs)) {
    var id = speakingAs.replace('character|', '');
    var character = getObj('character', id);
    if (character) msg.who = character.get('name');
  } else if (/^player\|/.test(speakingAs)) {
    var id = speakingAs.replace('player|', '');
    var player = getObj('player', id);
    if (player) msg.who = player.get('_displayname');
  }

  if (!msg.who) msg.who = speakingAs;
  msg.playerid = 'API';
  if (options.MOCK20playerid) msg.playerid = options.MOCK20playerid;
}

var parseInput = function(input) {
  msg.content = input.trim();
  getType();
  if (msg.type == 'whisper') getTarget();
  getInline();
  getTemplate();
  if (/rollresult$/.test(msg.type)) getRoll();
}

var getType = function() {
  if (/^!/.test(msg.content)) {
    msg.type = 'api';
  } else if (/^\/(em|me) /.test(msg.content)) {
    msg.type = 'emote';
  } else if (/^\/r(oll)? /i.test(msg.content)) {
    msg.type = 'rollresult';
  } else if (/^\/(gr|gmroll) /i.test(msg.content)) {
    msg.type = 'gmrollresult';
  } else if (/^\/desc /.test(msg.content)) {
    msg.type = 'desc';
  } else if (/^\/w /.test(msg.content)) {
    msg.type = 'whisper';
  } else if (/^\//.test(msg.content)) {
    msg.type = undefined;
  } else {
    msg.type = 'general';
  }

  msg.content = msg.content.replace(/^\/[^ ]* /, '');
}

var getTarget = function() {
  var re = /^\s*"([^"]+)"\s/;
  var matches = msg.content.match(re);
  var target = undefined;
  if (matches) {
    target = getPlayerOrCharacter(matches[1], false);
  } else {
    re = /^\s*(\S+)\s/;
    matches = msg.content.match(re);
    if (matches) target = getPlayerOrCharacter(matches[1], true);
  }

  if (!target) return msg.type = undefined;
  msg.content = msg.content.replace(re, '');
  if (typeof target == 'object' && target.get('_type') == 'character' && target.get('controlledby') == '') target = 'gm';
  if (typeof target == 'string' && target == 'gm') {
    msg.target = 'gm';
    msg.target_name = 'GM';
  } else if (target.get('_type') == 'player') {
    msg.target = target.get('_id');
    msg.target_name = target.get('_displayname');
  } else {
    msg.target = target.get('controlledby');
    msg.target_name = target.get('name');
  }
}

var getInline = function() {
  var counter = 0;
  while (true) {
    var inlineroll = getDeepestInline(msg.content);
    if (inlineroll) {
      var oldContent = msg.content;
      msg.content = oldContent.substring(0, inlineroll.start);
      msg.content += '$[[' + counter + ']]';
      msg.content += oldContent.substring(inlineroll.end+1);
      msg.inlinerolls = msg.inlinerolls || [];
      msg.inlinerolls.push(inlineroll.text);
      counter++;
    } else {
      break;
    }
  }
}

var getTemplate = function() {
  var matches = msg.content.match(/^&\{template:([^\}]+)\}/);
  if (matches) msg.rolltemplate = matches[1];
  msg.content = msg.content.replace(/^&\{[^\}]+\}/, '');
}

var getRoll = function() {
  msg.origRoll = msg.content;
  msg.content = {};
}

var getPlayerOrCharacter = function(name, firstWordOnly) {
  if (name.toLowerCase() == 'gm') return 'gm';
  var obj = findObjCI('player', name, firstWordOnly);
  if (!obj) obj = findObjCI('character', name, firstWordOnly);
  return obj;
}

var findObjCI = function(type, name, firstWordOnly) {
  name = name.toLowerCase();
  return filterObjs(function (obj) {
    if (obj.get('_type') == type) {
      if (type == 'player') {
        var objName = obj.get('_displayname');
      } else {
        var objName = obj.get('name');
      }

      if (firstWordOnly) objName = objName.replace(/^\s*(\S+).*$/, '$1');
      return objName.toLowerCase() == name;
    }
  })[0];
}

var getDeepestInline = function(content) {
  var inline = undefined;
  content = content.replace(/\$\[\[(\d+)\]\]/g, '$$(($1))');
  content.replace(/\[\[([^\]\[]+)\]\]/, function(match, p1, offset, string){
    inline = {
      start: offset,
      text: p1,
      end: offset + p1.length + 3
    }
    inline.text = inline.text.replace(/\$\(\((\d+)\)\)/g, '$$[[$1]]');
  });
  return inline;
}

module.exports = getMOCK20msg;

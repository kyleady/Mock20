var getObj = require('./../API_Objects/GetObj');
var getTarget = require('./GetTarget');
var getInline = require('./GetInline');
var getRoll = require('./GetRoll');
var msg = {};
var getMOCK20msg = function (speakingAs, input, options) {
  msg = {};
  options = options || {};
  parseSpeaker(speakingAs, options);
  parseInput(input);
  if (msg.type == 'api' && options.MOCK20selected) msg.selected = options.MOCK20selected;
  return msg;
};

var parseSpeaker = function (speakingAs, options) {
  msg.who = speakingAs;
  if (/^character\|/.test(speakingAs)) {
    var id = speakingAs.replace('character|', '');
    var character = getObj('character', id);
    if (character) msg.who = character.get('name');
  } else if (/^player\|/.test(speakingAs)) {
    var id = speakingAs.replace('player|', '');
    var player = getObj('player', id);
    if (player) msg.who = player.get('_displayname');
  }

  msg.playerid = 'API';
  if (options.MOCK20playerid) {
    var player = getObj('player', options.MOCK20playerid);
    if (player) msg.playerid = options.MOCK20playerid;
  };
};

var parseInput = function (input) {
  msg.content = input.trim();
  getType();
  if (msg.type == 'whisper') msg = getTarget(msg);
  msg = getInline(msg);
  getTemplate();
  if (/rollresult$/.test(msg.type)) msg = getRoll(msg);
};

var getType = function () {
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
  } else if (/^\/direct /.test(msg.content) && msg.playerid == 'API') {
    msg.type = 'direct';
  } else if (/^\//.test(msg.content)) {
    msg.type = undefined;
    msg.content = 'Unrecognized command: ' + msg.content;
  } else {
    msg.type = 'general';
  }

  msg.content = msg.content.replace(/^\/[^ ]* /, '');
};

var getTemplate = function () {
  var matches = msg.content.match(/^&\{template:([^\}]+)\}/);
  if (!matches) return;
  msg.rolltemplate = matches[1];
  msg.content = msg.content.replace(/^&\{[^\}]+\}/, '');
};

module.exports = getMOCK20msg;

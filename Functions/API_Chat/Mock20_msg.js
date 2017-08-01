var getObj = require('./../API_Objects/GetObj');
var filterObjs = require('./../API_Objects/FilterObjs');
class MOCK20msg{
  constructor(speakingAs, input, options) {
    options = options || {};
    this.parseSpeaker(speakingAs, options);
    this.parseInput(input);
    if(this.type == "api" && options.MOCK20selected) this.selected = options.MOCK20selected;
  }

  parseSpeaker(speakingAs, options) {
    if (/^character\|/.test(speakingAs)) {
      var id = speakingAs.replace('character|', '');
      var character = getObj('character', id);
      if (character) this.who = character.get('name');
    } else if (/^player\|/.test(speakingAs)) {
      var id = speakingAs.replace('player|', '');
      var player = getObj('player', id);
      if (player) this.who = player.get('_displayname');
    }

    if (!this.who) this.who = speakingAs;
    this.playerid = 'API';
    if (options.MOCK20playerid) this.playerid = options.MOCK20playerid;
  }

  parseInput(input) {
    this.content = input.trim();
    this.getType();
    if (this.type == 'whisper') this.getTarget();
    this.getInline();
    this.getTemplate();
    if (/rollresult$/.test(this.type)) this.getRoll();
  }

  getType() {
    if (/^!/.test(this.content)) {
      this.type = 'api';
    } else if (/^\/(em|me) /.test(this.content)) {
      this.type = 'emote';
    } else if (/^\/r(oll)? /i.test(this.content)) {
      this.type = 'rollresult';
    } else if (/^\/(gr|gmroll) /i.test(this.content)) {
      this.type = 'gmrollresult';
    } else if (/^\/desc /.test(this.content)) {
      this.type = 'desc';
    } else if (/^\/w /.test(this.content)) {
      this.type = 'whisper';
    } else if (/^\//.test(this.content)) {
      this.type = undefined;
    } else {
      this.type = 'general';
    }

    this.content = this.content.replace(/^\/[^ ]* /, '');
  }

  getTarget() {
    var re = /^\s*"([^"]+)"\s/;
    var matches = this.content.match(re);
    var target = undefined;
    if (matches) {
      target = getPlayerOrCharacter(matches[1], false);
    } else {
      re = /^\s*(\S+)\s/;
      matches = this.content.match(re);
      if (matches) target = getPlayerOrCharacter(matches[1], true);
    }

    if (!target) return this.type = undefined;
    this.content = this.content.replace(re, '');
    if (typeof target == 'object' && target.get('_type') == 'character' && target.get('controlledby') == '') target = 'gm';
    if (typeof target == 'string' && target == 'gm') {
      this.target = 'gm';
      this.target_name = 'GM';
    } else if (target.get('_type') == 'player') {
      this.target = target.get('_id');
      this.target_name = target.get('_displayname');
    } else {
      this.target = target.get('controlledby');
      this.target_name = target.get('name');
    }
  }

  getInline() {
    var counter = 0;
    while (true) {
      var inlineroll = getDeepestInline(this.content);
      if (inlineroll) {
        var oldContent = this.content;
        this.content = oldContent.substring(0, inlineroll.start);
        this.content += '$[[' + counter + ']]';
        this.content + oldContent.substring(inlineroll.end + 1);
        this.inlinerolls = this.inlinerolls || [];
        this.inlinerolls.push(inlineroll);
        counter++;
      } else {
        break;
      }
    }
  }

  getTemplate() {
    var matches = this.content.match(/^&\{template:([^\}]+)\}/);
    if (matches) this.rolltemplate = matches[1];
    this.content = this.content.replace(/^&\{[^\}]+\}/, '');
  }

  getRoll() {
    this.origRoll = this.content;
    this.content = {};
  }
}

function getPlayerOrCharacter(name, firstWordOnly) {
  if (name.toLowerCase() == 'gm') return 'gm';
  var obj = findObjCI('player', name, firstWordOnly);
  if (!obj) obj = findObjCI('character', name, firstWordOnly);
  return obj;
}

function findObjCI(type, name, firstWordOnly) {
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

function getDeepestInline(content) {
  var inline = {};
  var re = /\[\[[^\]\[]+\]\]/;
  content = content.replace(/\$\[\[(\d+)\]\]/g, '$$(($1))');
  inline.start = content.search(re);
  if (inline.start == -1) return undefined;
  inline.text = content.match(re)[0];
  inline.text = inline.text.replace(/\$\(\((\d+)\)\)/g, '$$[[$1]]');
  inline.end = inline.start + inline.text.length - 1;
  return inline;
}

module.exports = MOCK20msg;

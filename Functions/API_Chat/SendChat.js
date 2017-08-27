var getMOCK20msg = require('./GetMock20msg');
var replaceAttributeAbilityMacro = require('./ReplaceAttributeAbilityMacro');
require('./../../Mock20_Output');

var sendChat = function (speakingAs, input, callback, options) {
  if (speakingAs == undefined || input == undefined) {
    MOCK20error('Error: When using sendChat() you must specify a speakingas and input property.');
    return;
  }

  if (!input) return;
  if (typeof speakingAs != 'string') throw 'TypeError: speakingas.indexOf is not a function';
  if (typeof input != 'string') throw 'TypeError: op.content.replace is not a function';
  if (typeof options != 'object') options = {};

  input = replaceAttributeAbilityMacro(input, !options.MOCK20playerid);
  var inputs = input.split('\n');
  var msgs = [];
  for (var content of inputs) {
    msgs.push(getMOCK20msg(speakingAs, content, options));
  }

  var msgError = false;
  for (var msg of msgs) {
    if (msg.type == undefined) {
      MOCK20error(msg);
      msgError = true;
    }
  }

  if (msgError) return;
  if (typeof callback == 'function') return callback(msgs);
  for (var msg of msgs) {
    if(options.MOCK20tag) MOCK20trigger('chat:message:' + options.MOCK20tag, msg);
    MOCK20trigger('chat:message', msg);
    MOCK20log(JSON.stringify(msg), {}, 'ROLL20 CHAT');
  }
};

module.exports = sendChat;

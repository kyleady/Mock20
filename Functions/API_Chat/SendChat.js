var getMOCK20msg = require('./GetMock20msg');
var replaceAttributeAbilityMacro = require('./ReplaceAttributeAbilityMacro');
require('./../../Mock20_Output');

var sendChat = function (speakingAs, input, callback, options) {
  options = options || {};
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
    MOCK20trigger('chat:message', msg);
    MOCK20log(JSON.stringify(msg), {}, 'ROLL20 CHAT');
  }
};

module.exports = sendChat;

var getMOCK20msg = require('./Mock20_msg');
require('./../../Mock20_Output');

var sendChat = function (speakingAs, input, callback, options) {
  var inputs = input.split('\n');
  var msgs = [];
  for (var content of inputs) {
    msgs.push(getMOCK20msg(speakingAs, content, options));
  }

  var msgError = false;
  for (var msg of msgs) {
    if (msg.type == undefined) {
      var fromAPI = msg.playerid == 'API';
      msg = {
        who: 'error',
        type: 'error',
        content: msg.content
      };
      msgError = true;
      if (fromAPI) {
        MOCK20log(JSON.stringify(msg));
      } else {
        MOCK20log(JSON.stringify(msg), {}, 'ROLL20 CHAT');
      }
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

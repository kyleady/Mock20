var getMOCK20msg = require('./Mock20_msg');
require('./../../Mock20_Output');

module.exports = function (speakingAs, input, callback, options) {
  var msg = getMOCK20msg(speakingAs, input, options);
  if (msg.type == undefined) {
    var fromAPI = msg.playerid == 'API';
    msg = {
      who: 'error',
      type: 'error',
      content: msg.content
    };

    if (fromAPI) return MOCK20log(JSON.stringify(msg));
  }

  if (callback == 'function') callback([msg]);
  if (msg.type != 'error') MOCK20trigger('chat:message', msg);
  MOCK20log(JSON.stringify(msg), {}, 'ROLL20 CHAT');
};

var getMOCK20msg = require('./Mock20_msg');

module.exports = function (speakingAs, input, callback, options) {
  var msg = getMOCK20msg(speakingAs, input, options);
  if(msg.type == undefined) return;
  if (callback == 'function') callback(msg);
  MOCK20trigger('chat:message', msg);
};

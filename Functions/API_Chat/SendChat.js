var MOCK20msg = require('./Mock20_msg');

module.exports = function (speakingAs, input, callback, options) {
  var msg = new MOCK20msg(speakingAs, input, options);
  if (callback == 'function') callback(msg);
  MOCK20trigger('chat:message', msg);
};

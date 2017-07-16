var Mock20_msg = require('./Mock20_msg');

module.exports = function(speakingAs, input, callback, options){
  var msg = new Mock20_msg(speakingAs, input);
  if(callback == 'function'){
    callback(msg);
  }
  Mock20_trigger("chat:message", msg);
}

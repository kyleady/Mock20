require('./../../Mock20_Output');
var responses = {};

module.exports = function(eventName, response){
  if(typeof eventName != 'string'){
    Mock20_warning("Invalid event name given for on().");
    return;
  }
  if(typeof response != 'function'){
    Mock20_warning("Invalid function given for on().");
    return;
  }
  if(!responses[eventName]){
    responses[eventName] = [response];
  } else {
    responses[eventName].push(response);
  }
}

global.Mock20_trigger = function(eventName, obj, prev){
  if(responses[eventName]){
    for(var response of responses[eventName]){
      response(obj, prev);
    }
  }
}

//see https://wiki.roll20.net/API:Events
//MOCK20trigger() is used in
//  -Functions/API_Objects/CreateObj.js
//  -Objects/MOCK20object.js
//  -Mock20.js
require('./../../Mock20_Output');
var responses = {};

module.exports = function (eventName, response) {
  if (typeof eventName != 'string') return MOCK20warning('Invalid event name given for on().');
  if (typeof response != 'function') return MOCK20warning('Invalid function given for on().');
  if (!responses[eventName]) {
    responses[eventName] = [response];
  } else {
    responses[eventName].push(response);
  }
};

global.MOCK20trigger = function (eventName, obj, prev) {
  if (responses[eventName]) {
    for (var response of responses[eventName]) {
      response(obj, prev);
    }
  }
};

//see https://wiki.roll20.net/API:Events
//MOCK20trigger() is used in
//  -Functions/API_Objects/CreateObj.js
//  -Objects/MOCK20object.js
//  -Mock20.js
require('./../../Mock20_Output');
var responses = {};

module.exports = function (eventName, response) {
  if (typeof eventName == 'object' && eventName.MOCK20reset) return responses = {};
  if (typeof eventName != 'string') throw 'invalid or missing channel';
  if (typeof response != 'function') {
    return MOCK20warning('Roll20 would accept the invalid function given for on()'
    + ' and only hit an error when trying to use it.');
  }

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

//Functions - API:Objects
global.Campaign = require('./Functions/API_Objects/Campaign');
global.createObj = require('./Functions/API_Objects/CreateObj');
global.filterObjs = require('./Functions/API_Objects/FilterObjs');
global.findObjs = require('./Functions/API_Objects/FindObjs');
global.getAllObjs = require('./Functions/API_Objects/GetAllObjs');
global.getAttrByName = require('./Functions/API_Objects/GetAttrByName');
global.getObj = require('./Functions/API_Objects/GetObj');
global.state = {};

//Functions - API:Events
global.on = require('./Functions/API_Events/On');
global.Mock20_endOfLastScript = function(){
  Mock20_trigger("ready");
}

//Functions - API:Chat
global.sendChat = require('./Functions/API_Chat/SendChat');

//Functions - API:Utility
global._ = require('underscore');

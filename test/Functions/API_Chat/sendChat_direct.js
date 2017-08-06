var expect = require('chai').expect;
var on = require('./../../../Functions/API_Events/On');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
var sendChat = require('./../../../Functions/API_Chat/SendChat');
describe('sendChat():direct', function(){
  var msg = {};
  var messagesSent = 0;
  on('chat:message', function(message){
    msg = message;
    messagesSent++;
  });
  it('should make a direct msg when starting with /direct', function(){
    sendChat("Mock20", "/direct The msg is still parsed by the API.");
    expect(msg.type).to.equal('direct');
  });
  it('should be unable to send a /direct msg through a player', function(){
    var player = createObj('player', {_displayname: 'test user'}, {MOCK20override: true});
    player.MOCK20gm = true;
    msg = undefined;
    player.MOCK20chat('/direct Not even GMs can send direct msgs.');
    expect(msg).to.be.undefined;
  });
});

var expect = require('chai').expect;
var on = require('./../../../Functions/API_Events/On');
var sendChat = require('./../../../Functions/API_Chat/SendChat');
describe('sendChat():gmrollresult', function(){
  var msg = {};
  var messagesSent = 0;
  on('chat:message', function(message){
    msg = message;
    messagesSent++;
  });
  it('should make a gmrollresult msg when starting with /gr', function(){
    sendChat("Mock20", "/gr D10 for a gmrollresult msg.");
    expect(msg.type).to.equal('gmrollresult');
  });
  it('should also make a gmrollresult msg when starting with /gMrOlL', function(){
    sendChat("Mock20", "/gMrOlL D10 for a gmrollresult msg.");
    expect(msg.type).to.equal('gmrollresult');
  });
  it('should store the original message in msg.origRoll', function(){
    sendChat("Mock20", "/gr D10 for a gmrollresult msg.");
    expect(msg.origRoll).to.equal('D10 for a gmrollresult msg.');
  });
  it('should turn msg.content into an object', function(){
    sendChat("Mock20", "/gr D10 for a gmrollresult msg.");
    expect(msg.content).to.be.an('object');
  });
});

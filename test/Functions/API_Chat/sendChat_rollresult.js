var expect = require('chai').expect;
var on = require('./../../../Functions/API_Events/On');
var sendChat = require('./../../../Functions/API_Chat/SendChat');
describe('sendChat():rollresult', function(){
  var msg = {};
  var messagesSent = 0;
  on('chat:message', function(message){
    msg = message;
    messagesSent++;
  });
  it('should make a rollresult msg when starting with /r', function(){
    sendChat("Mock20", "/r D10 for a rollresult msg.");
    expect(msg.type).to.equal('rollresult');
  });
  it('should also make a rollresult msg when starting with /rOlL', function(){
    sendChat("Mock20", "/rOlL D10 for a rollresult msg.");
    expect(msg.type).to.equal('rollresult');
  });
  it('should store the original message in msg.origRoll', function(){
    sendChat("Mock20", "/r D10 for a rollresult msg.");
    expect(msg.origRoll).to.equal('D10 for a rollresult msg.');
  });
  it('should turn msg.content into an object', function(){
    sendChat("Mock20", "/r D10 for a rollresult msg.");
    expect(msg.content).to.be.an('object');
  });
});

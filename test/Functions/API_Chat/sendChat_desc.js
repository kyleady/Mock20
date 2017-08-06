var expect = require('chai').expect;
var on = require('./../../../Functions/API_Events/On');
var sendChat = require('./../../../Functions/API_Chat/SendChat');
describe('sendChat():desc', function(){
  var msg = {};
  var messagesSent = 0;
  on('chat:message', function(message){
    msg = message;
    messagesSent++;
  });
  it('should make a desc msg when starting with /desc', function(){
    sendChat("Mock20", "/desc The trees sing, \"We are a description.\"");
    expect(msg.type).to.equal('desc');
  });
  it('should save the trimmed down text in msg.content', function(){
    sendChat("Mock20", "/desc The trees sing, \"We are a description.\"");
    expect(msg.content).to.equal('The trees sing, \"We are a description.\"');
  });
});

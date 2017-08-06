var expect = require('chai').expect;
var on = require('./../../../Functions/API_Events/On');
var sendChat = require('./../../../Functions/API_Chat/SendChat');
describe('sendChat():emote', function(){
  var msg = {};
  var messagesSent = 0;
  on('chat:message', function(message){
    msg = message;
    messagesSent++;
  });
  it('should make an emote msg when starting with /em', function(){
    sendChat("Mock20", "/em made an emote msg.");
    expect(msg.type).to.equal('emote');
  });
  it('should also make an emote msg when starting with /me', function(){
    sendChat("Mock20", "/me made an emote msg.");
    expect(msg.type).to.equal('emote');
  });
  it('should save the trimmed down text in msg.content', function(){
    sendChat("Mock20", "/em made an emote msg.");
    expect(msg.content).to.equal('made an emote msg.');
  });
});

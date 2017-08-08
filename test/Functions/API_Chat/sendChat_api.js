var expect = require('chai').expect;
require('./../../../index');
describe('sendChat():api', function(){
  var msg = {};
  var messagesSent = 0;
  on('chat:message', function(message){
    msg = message;
    messagesSent++;
  });
  it('should make an api msg when starting with !', function(){
    sendChat("Mock20", "!create api msg");
    expect(msg.type).to.equal('api');
  });
  it('should not trim down the msg.content', function(){
    sendChat("Mock20", "!create api msg");
    expect(msg.content).to.equal('!create api msg');
  });
  it('should allow you to specify what a player has selected in player.MOCK20chat()', function(){
    var player = createObj('player', {}, {MOCK20override: true});
    player.MOCK20chat('!I am selecting something', {MOCK20selected: [{_id: "not an id", _type: "graphic"}]});
    expect(msg.selected[0]._type).to.equal('graphic');
  });
});

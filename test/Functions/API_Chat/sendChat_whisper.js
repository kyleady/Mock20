var expect = require('chai').expect;
var on = require('./../../../Functions/API_Events/On');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
var sendChat = require('./../../../Functions/API_Chat/SendChat');
describe('sendChat():whisper', function(){
  var msg = {};
  var messagesSent = 0;
  on('chat:message', function(message){
    msg = message;
    messagesSent++;
  });
  it('should make a whisper msg when starting with /w', function(){
    sendChat("Mock20", "/w gm Pst! This is a whisper.");
    expect(msg.type).to.equal('whisper');
  });
  it('should save the trimmed down text in msg.content', function(){
    sendChat("Mock20", "/w gm Pst! This is a whisper.");
    expect(msg.content).to.equal('Pst! This is a whisper.');
  });
  it('should not send a msg when the target is invalid', function(){
    msg = 'has not been sent';
    sendChat("Mock20", "/w \"this is not a character or player\" Pst! This is a whisper.");
    expect(msg).to.equal('has not been sent');
  });
  it('should set msg.target as \"gm\" and msg.target_name as \"GM\" when whispering to the gm', function(){
    sendChat("Mock20", "/w Gm Pst! This is a whisper.");
    expect(msg.target).to.equal('gm');
    expect(msg.target_name).to.equal('GM');
  });
  it('should set msg.target as \"gm\" and msg.target_name as \"GM\" when whispering to a character with no controller', function(){
    var character = createObj('character', {name: "sendChat test character"})
    sendChat("Mock20", "/w \"sendChat test character\" Pst! This is a whisper.");
    expect(msg.target).to.equal('gm');
    expect(msg.target_name).to.equal('GM');
  });
  it('should set msg.target as player.id and msg.target_name as player._displayname when whispering to a player', function(){
    var player = createObj('player', {_displayname: 'sendChat player', speakingas: 'My Avatar'}, {MOCK20override: true});
    sendChat("Mock20", "/w \"sendChat player\" Pst! This is a whisper.");
    expect(msg.target).to.equal(player.id);
    expect(msg.target_name).to.equal(player.get('_displayname'));
  });
  it('should set msg.target as player.id and msg.target_name as player._displayname when whispering to a player', function(){
    var player1 = createObj('player', {_displayname: 'sendChat owner1', speakingas: 'Avatar1'}, {MOCK20override: true});
    var player2 = createObj('player', {_displayname: 'sendChat owner2', speakingas: 'Avatar2'}, {MOCK20override: true});
    var character = createObj('character', {name: 'sendChat character', controlledby: player1.id + "," + player2.id});
    sendChat("Mock20", "/w \"sendChat character\" Pst! This is a whisper.");
    expect(msg.target).to.equal(character.get('controlledby'));
    expect(msg.target_name).to.equal(character.get('name'));
  });
  it('should be able to target players and characters by first name when not using quotes in the target', function(){
    var player = createObj('player', {_displayname: 'playerFIRSTNAME LASTNAME'}, {MOCK20override: true});
    var character = createObj('character', {name: 'characterFIRSTNAME LASTNAME', controlledby: player.id}, {MOCK20override: true});
    sendChat("Mock20", "/w playerFIRSTNAME Pst! This is a whisper.");
    expect(msg.target).to.equal(player.id);
    expect(msg.target_name).to.equal(player.get('_displayname'));
    sendChat("Mock20", "/w characterFIRSTNAME Pst! This is a whisper.");
    expect(msg.target).to.equal(character.get('controlledby'));
    expect(msg.target_name).to.equal(character.get('name'));
  });
});

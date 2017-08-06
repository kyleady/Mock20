var expect = require('chai').expect;
var on = require('./../../../Functions/API_Events/On');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
var sendChat = require('./../../../Functions/API_Chat/SendChat');
describe('sendChat():general', function(){
  var msg = {};
  var messagesSent = 0;
  on('chat:message', function(message){
    msg = message;
    messagesSent++;
  });
  it('should make a general msg by default', function(){
    sendChat("Mock20", "This is a normal msg.");
    expect(msg.type).to.equal('general');
  });
  it('should not send a msg with an invalid type after /', function(){
    msg = 'has not been sent';
    sendChat('Mock20', '/invalid msg type');
    expect(msg).to.equal('has not been sent');
  });
  it('should save the text of the message in msg.content', function(){
    sendChat('Mock20', 'This is the text of the msg');
    expect(msg.content).to.equal('This is the text of the msg');
  });
  it('should save speakingAs in msg.who', function(){
    sendChat('Mock20', 'This is the text of the msg');
    expect(msg.who).to.equal('Mock20');
  });
  it('should set msg.who as player._displayname if speakingAs is \"player|<playerid>\"', function(){
    var player = createObj('player', {_displayname: "The User", speakingas: "My Avatar"}, {MOCK20override: true});
    sendChat('player|' + player.id, 'This is the text of the msg');
    expect(msg.who).to.equal(player.get('_displayname'));
  });
  it('should set msg.who as character.name if speakingAs is \"character|<characterid>\"', function(){
    var character = createObj('character', {name: "The NPC"});
    sendChat('character|' + character.id, 'This is the text of the msg');
    expect(msg.who).to.equal(character.get('name'));
  });
  it('should set msg.who as player.speakingas when using player.MOCK20chat()', function(){
    var player = createObj('player', {_displayname: "The User", speakingas: "My Avatar"}, {MOCK20override: true});
    player.MOCK20chat('This is the text of the msg');
    expect(msg.who).to.equal(player.get('speakingas'));
  });
  it('should, by default, set msg.playerid as \"API\"', function(){
    var player = createObj('player', {_displayname: "The User", speakingas: "My Avatar"}, {MOCK20override: true});
    sendChat('player|' + player.id, 'This is the text of the msg');
    expect(msg.playerid).to.equal('API');
  });
  it('should set msg.playerid as the player\'s id when using player.MOCK20chat()', function(){
    var player = createObj('player', {_displayname: "The User", speakingas: "My Avatar"}, {MOCK20override: true});
    player.MOCK20chat('This is the text of the msg');
    expect(msg.playerid).to.equal(player.id);
  });
  it('should replace inline rolls with $[[<number>]] in the proper order', function(){
    sendChat('Mock20', '[[[[0]]3+[[[[1]]2]]]] [[[[4]]5]]');
    expect(msg.content).to.equal('$[[3]] $[[5]]');
  });
  it('should store the contents of the inline rolls in msg.inlinerolls', function(){
    sendChat('Mock20', '[[[[0]]3+[[[[1]]2]]]] [[[[4]]5]]');
    expect(msg.inlinerolls).to.have.lengthOf(6);
  });
  it('should trigger on(\"chat:message\", func)', function(){
    messagesSent = 0;
    expect(messagesSent).to.equal(0);
    sendChat('Mock20', '[[[[0]]3+[[[[1]]2]]]] [[[[4]]5]]');
    expect(messagesSent).to.equal(1);
  });
  it('should turn each newline in the input into a new message', function(){
    messagesSent = 0;
    expect(messagesSent).to.equal(0);
    sendChat('Mock20', '1\n2\n3\n4\n5');
    expect(messagesSent).to.equal(5);
  });
  it('should add \' (GM)\' to msg.who for gm\'s.', function(){
    var gm = createObj('player', {_displayname: "The GM", speakingas: ""}, {MOCK20override: true});
    gm.MOCK20gm = true;
    gm.MOCK20chat('This is the text of the msg');
    expect(msg.who).to.equal('The GM (GM)');
  });
  it('should not send a message with a callback function', function(){
    msg = 'has not been sent';
    sendChat('Mock20', 'get ready to callback', function(){});
    expect(msg).to.equal('has not been sent');
  });
  it('should give an array of msg objects to the callback function', function(){
    sendChat('Mock20', 'get ready to callback', function(msgs){
      expect(msgs).to.be.an('array');
    });
  });
  it('should properly parse macros, abilities, and attributes', function(){
    var character = createObj('character', {name: 'sendChat MAA test'});
    var macro1 = createObj('macro', {
      name: 'sendChat-macro-test1',
      action: '#sendChat-macro-test2\n%{sEndChat MAA test|sendChat-Ability-test1}\n@{sEndChat MAA test|sendchat-Attribute-test1}'
    });
    var ability1 = createObj('ability', {
      name: 'sendChat-ability-test1',
      _characterid: character.id,
      action: '#sendChat-macro-test2\n%{seNdChat MAA test|sendChat-aBility-test2}\n@{sEndChat MAA test|sendCHat-aTtribute-test1}'
    });
    var attribute1 = createObj('attribute', {
      name: 'sendChat-attribute-test1',
      _characterid: character.id,
      current: '#sendChat-macro-test2\n%{senDChat MAA test|sendChat-abIlity-test2}\n@{sEndChat MAA test|sendChAt-attRibute-test2}',
      max: 'max'
    });
    var macro2 = createObj('macro', {
      name: 'sendChat-macro-test2',
      action: 'macro'
    });
    var ability2 = createObj('ability', {
      name: 'sendChat-ability-test2',
      _characterid: character.id,
      action: 'ability'
    });
    var attribute2 = createObj('attribute', {
      name: 'sendChat-attribute-test2',
      _characterid: character.id,
      current: 'attribute',
      max: 'max'
    });
    messagesSent = 0;
    sendChat('Mock20', '#sendChat-macro-test1');
    expect(msg.playerid).to.equal('API');
    expect(messagesSent).to.equal(1);
    expect(msg.content).to.equal('#sendChat-macro-test1');

    messagesSent = 0;
    var player = createObj('player', {_displayname: 'test user'}, {MOCK20override: true});
    player.MOCK20chat('#sendChat-macro-test1');
    expect(messagesSent).to.equal(9);
  });
  it('should not replace an invalid macro while only removing the brackets on an invalid ability/attribute', function(){
    var player = createObj('player', {_displayname: 'test user'}, {MOCK20override: true});
    var character = createObj('character', {name: 'sendChat MAA test2'});
    player.MOCK20chat('#this-really-should-not-be-a-macro');
    expect(msg.content).to.equal('#this-really-should-not-be-a-macro');
    player.MOCK20chat('@{this-really-should-not-be-a-character|this-really-should-not-be-an-attribute}');
    expect(msg.content).to.equal('this-really-should-not-be-a-character|this-really-should-not-be-an-attribute');
    player.MOCK20chat('@{sendChat MAA test2|this-really-should-not-be-an-attribute}');
    expect(msg.content).to.equal('sendChat MAA test2|this-really-should-not-be-an-attribute');
  });
  it('should throw an exception if trapped in an infinite loop of macro/ability/attribute replacement', function(){
    var character = createObj('character', {name: 'sendChat MAA test3'});
    var ability = createObj('ability', {
      name: 'sendChat-ability-test3',
      _characterid: character.id,
      action: '%{sendChat MAA test3|sendChat-ability-test3}'
    });
    expect(
      function() { sendChat('Mock20', '%{seNdChat MAA test3|sendChat-aBility-test3}'); }
    ).to.throw();
  });
});

var expect = require('chai').expect;
var on = require('./../../../Functions/API_Events/On');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
var sendChat = require('./../../../Functions/API_Chat/SendChat');
describe('sendChat()', function(){
  var msg = {};
  on('chat:message', function(message){
    msg = message;
  });
  describe('type:general', function(){
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
      var messagesent = false;
      on('chat:message', function(msg){
        messagesent = true;
      });
      expect(messagesent).to.equal(false);
      sendChat('Mock20', '[[[[0]]3+[[[[1]]2]]]] [[[[4]]5]]');
      expect(messagesent).to.equal(true);
    });
  });
  describe('type:rollresult', function(){
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
  describe('type:gmrollresult', function(){
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
  describe('type:emote', function(){
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
  describe('type:whisper', function(){
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
  describe('type:desc', function(){
    it('should make a desc msg when starting with /desc', function(){
      sendChat("Mock20", "/desc The trees sing, \"We are a description.\"");
      expect(msg.type).to.equal('desc');
    });
    it('should save the trimmed down text in msg.content', function(){
      sendChat("Mock20", "/desc The trees sing, \"We are a description.\"");
      expect(msg.content).to.equal('The trees sing, \"We are a description.\"');
    });
  });
  describe('type:api', function(){
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
});

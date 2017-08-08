var expect = require('chai').expect;
var playerIsGM = require('./../../../Functions/API_Utility/PlayerIsGM');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
describe('playerIsGM()', function(){
  it('should detect if player.MOCK20gm is true', function(){
    var player1 = createObj('player', {}, {MOCK20override: true});
    var player2 = createObj('player', {}, {MOCK20override: true});
    player2.MOCK20gm = true;
    expect(playerIsGM(player1.id)).to.equal(false);
    expect(playerIsGM(player2.id)).to.equal(true);
  });
  it('should return false if the player does not exist', function(){
    var player = createObj('player', {}, {MOCK20override: true});
    player.remove({MOCK20override: true});
    expect(playerIsGM(player.id)).to.equal(false);
    expect(playerIsGM(undefined)).to.equal(false);
    expect(playerIsGM(3492384239)).to.equal(false);
    expect(playerIsGM({})).to.equal(false);
  });
});

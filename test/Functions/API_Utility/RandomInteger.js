var expect = require('chai').expect;
var randomInteger = require('./../../../Functions/API_Utility/RandomInteger');
describe('randomInteger()', function(){
  it('should generate a random number between 1 and x (will fail 1 in 20 billion times)', function(){
    var rolls = [];
    for (var i = 0; i < 20; i++) {
      rolls[i] = 0;
    }
    for (var i = 0; i < 2000000; i++) {
      rolls[randomInteger(20)-1]++;
    }
    expect(rolls).to.have.lengthOf(20);
    for (var i = 0; i < 20; i++) {
      expect(rolls[i]).to.be.above(97842);
      expect(rolls[i]).to.be.below(102158);
    }
  });
  it('should return undefined if given invalid input', function(){
    expect(randomInteger('10')).to.be.undefined;
    expect(randomInteger([2,3])).to.be.undefined;
    expect(randomInteger(0.3)).to.be.undefined;
    expect(randomInteger(undefined)).to.be.undefined;
  });
});

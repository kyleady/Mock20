var expect = require('chai').expect;
require('./../../../index');
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
  it('should break like Roll20 randomInteger()', function() {
    expect(randomInteger(10.3)).to.be.above(0).and.below(11);
    expect(randomInteger('10.3')).to.be.above(0).and.below(11);
    expect(randomInteger([2,3])).to.be.null;
    expect(randomInteger(0)).to.be.NaN;
    expect(function(){randomInteger('-2')}).to.throw();
  });
});

var expect = require('chai').expect;
var spawnFx = require('./../../Functions/API_Utility/SpecialEffects').spawnFx;
var spawnFxBetweenPoints = require('./../../Functions/API_Utility/SpecialEffects').spawnFxBetweenPoints;
var spawnFxWithDefinition = require('./../../Functions/API_Utility/SpecialEffects').spawnFxWithDefinition;
describe('Special Effects', function(){
  describe('spawnFx()', function(){
    it('should be a function', function(){
      expect(spawnFx).to.be.a('function');
    });
  });
  describe('spawnFxBetweenPoints()', function(){
    it('should be a function', function(){
      expect(spawnFxBetweenPoints).to.be.a('function');
    });
  });
  describe('spawnFxWithDefinition()', function(){
    it('should be a function', function(){
      expect(spawnFxWithDefinition).to.be.a('function');
    });
  });
});

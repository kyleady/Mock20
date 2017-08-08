var expect = require('chai').expect;
require('./../../../index');
describe('Special Effects', function(){
  describe('spawnFx()', function(){
    it('should break like the Roll20 spawnFx()', function(){
      expect(function(){spawnFx()}).to.throw;
      expect(function(){spawnFx(2)}).to.throw;
      expect(function(){spawnFx(2,2)}).to.throw;
      expect(function(){spawnFx(2,2,2)}).to.throw;
      expect(function(){spawnFx(2,2,'cat')}).to.not.throw;
      expect(function(){spawnFx([],2,'cat')}).to.not.throw;
    });
  });
  describe('spawnFxBetweenPoints()', function(){
    it('should break like the Roll20 spawnFxBetweenPoints()', function(){
      expect(function(){spawnFxBetweenPoints()}).to.throw;
      expect(function(){spawnFxBetweenPoints({})}).to.throw;
      expect(function(){spawnFxBetweenPoints({}, {})}).to.throw;
      expect(function(){spawnFxBetweenPoints({}, {}, 'cat')}).to.not.throw;
      expect(function(){spawnFxBetweenPoints({}, undefined, 'cat')}).to.throw;
    });
  });
  describe('spawnFxWithDefinition()', function(){
    it('should break like the Roll20 spawnFxWithDefinition()', function(){
      expect(function(){spawnFxWithDefinition()}).to.not.throw;
    });
  });
});

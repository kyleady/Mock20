var expect = require('chai').expect;
require('./../../index');
describe('characters', function(){
  it('should access their bio asyncronously', function(done){
    var character = createObj('character', {});
    character.get('bio', function(bio){
      expect(bio).to.equal('');
      done();
    });
  });
});

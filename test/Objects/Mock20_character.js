var expect = require('chai').expect;
var createObj = require('./../../Functions/API_Objects/CreateObj');
describe('characters', function(){
  it('should access their bio asyncronously', function(done){
    var character = createObj('character', {});
    character.get('bio', function(bio){
      expect(bio).to.equal('');
      done();
    });
  });
});

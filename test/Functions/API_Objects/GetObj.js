var expect = require('chai').expect;
var getObj = require('./../../../Functions/API_Objects/GetObj');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
describe('getObj()', function(){
  it('should be able to retrive objects created by createObj()', function(){
    var character = createObj('character', {name: 'getObj test character'});
    var retrivedObj = getObj('character', character.id);
    expect(retrivedObj).to.equal(character);
  });
  it('should be able to retrive objects created by createObj(), including folders, with a MOCK20override', function(){
    var playlist = createObj('playlist', {name: 'getObj test playlist'}, {MOCK20override: true});
    var retrivedObj = getObj('playlist', playlist.id);
    var retrivedObjOverride = getObj('playlist', playlist.id, {MOCK20override: true});
    expect(retrivedObj).to.be.undefined;
    expect(retrivedObjOverride).to.equal(playlist);
  });
});

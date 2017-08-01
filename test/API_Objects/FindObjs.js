var expect = require('chai').expect;
var findObjs = require('./../../Functions/API_Objects/FindObjs');
var createObj = require('./../../Functions/API_Objects/CreateObj');
describe('findObjs()', function(){
  it('should properly find objects created by createObj()', function(){
    var page = createObj('page', {name: "don't find me"}, {MOCK20override: true});
    var macro = createObj('macro', {name: "find me!"});
    var handout = createObj('handout', {name: "find me!"});
    var character = createObj('character', {name: "find me!"});
    var foundObjs = findObjs({name: "find me!"});
    expect(foundObjs).to.include.members([handout, macro, character]);
    expect(foundObjs).to.not.include(page);
  });
  it('should properly find objects created by createObj(), including folders, when using a MOCK20override', function(){
    var playlist = createObj('playlist', {n: "find me!"}, {MOCK20override: true});
    var folder = createObj('folder', {n: "don't find me"}, {MOCK20override: true});
    var foundObjs = findObjs({n: "find me!"});
    var foundObjsOverride = findObjs({n: "find me!"}, {MOCK20override: true});
    expect(foundObjs).to.be.empty;
    expect(foundObjsOverride).to.include(playlist);
    expect(foundObjsOverride).to.not.include(folder);
  });
});

var expect = require('chai').expect;
var findObjs = require('./../../../Functions/API_Objects/FindObjs');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
describe('findObjs()', function(){
  it('should properly find objects created by createObj()', function(){
    var dontFindMe = createObj('page', {name: "Find me"}, {MOCK20override: true});
    var macro = createObj('macro', {name: "find me!"});
    var handout = createObj('handout', {name: "find me!"});
    var character = createObj('character', {name: "find me!"});
    var foundObjs = findObjs({name: "find me!"});
    expect(foundObjs).to.include.members([handout, macro, character]);
    expect(foundObjs).to.not.include(dontFindMe);
  });
  it('should allow players to search with caseInsensitive flagged true', function(){
    var page = createObj('page', {name: "don't find me"}, {MOCK20override: true});
    var macro = createObj('macro', {name: "Find me!"});
    var handout = createObj('handout', {name: "fInd me!"});
    var character = createObj('character', {name: "fiNd me!"});
    var foundObjs = findObjs({name: "finD me!"}, {caseInsensitive: true});
    expect(foundObjs).to.include.members([handout, macro, character]);
    expect(foundObjs).to.not.include(page);
  });
  it('should default to caseInsensitive: false when an invalid option is given', function(){
    var dontFindMe = createObj('page', {name: "Find me"}, {MOCK20override: true});
    var macro = createObj('macro', {name: "find me!"});
    var handout = createObj('handout', {name: "find me!"});
    var character = createObj('character', {name: "find me!"});
    var foundObjs = findObjs({name: "find me!"}, true);
    expect(foundObjs).to.include.members([handout, macro, character]);
    expect(foundObjs).to.not.include(dontFindMe);
  });
  it('should return undefined if you try to search an invalid type', function(){
    expect(findObjs({_type: 'not actually a type'})).to.be.undefined;
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
  it('should return undefined if the attributes given are invalid', function(){
    expect(findObjs(undefined)).to.be.undefined;
    expect(findObjs('handouts')).to.be.undefined;
    expect(findObjs(5)).to.be.undefined;
  });
});

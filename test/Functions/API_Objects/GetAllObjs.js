var expect = require('chai').expect;
var filterObjs = require('./../../../Functions/API_Objects/FilterObjs');
var getAllObjs = require('./../../../Functions/API_Objects/GetAllObjs');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
describe('getAllObjs()', function(){
  it('should behave identically to filterObjs(function(){return true;})', function(){
    var page = createObj('page', {name: "everything"}, {MOCK20override: true});
    var player = createObj('player', {_displayname: "everything"}, {MOCK20override: true});
    var handout = createObj('handout', {name: "everything"});
    var character = createObj('character', {name: "everything"});
    var filteredObjs = filterObjs(function(obj){
      return true;
    });
    var everything = getAllObjs();
    expect(everything).to.include.members(filteredObjs);
    expect(everything).to.have.lengthOf(filteredObjs.length);
  });
  it('should behave identically to filterObjs(function(){return true;}, {MOCK20override: true}) when using a MOCK20override', function(){
    var playlist = createObj('page', {n: "everything"}, {MOCK20override: true});
    var folder = createObj('player', {n: "everything"}, {MOCK20override: true});
    var filteredObjs = filterObjs(function(obj){
      return true;
    }, {MOCK20override: true});
    var everything = getAllObjs({MOCK20override: true});
    expect(everything).to.include.members(filteredObjs);
    expect(everything).to.have.lengthOf(filteredObjs.length);
  });
});

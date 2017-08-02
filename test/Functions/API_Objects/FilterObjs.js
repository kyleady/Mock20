var expect = require('chai').expect;
var filterObjs = require('./../../../Functions/API_Objects/FilterObjs');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
describe('filterObjs()', function(){
  var page = createObj('page', {name: "filterObjTest page"}, {MOCK20override: true});
  var player = createObj('player', {_displayname: "filterObjTest player"}, {MOCK20override: true});
  var handout = createObj('handout', {name: "filterObjTest handout"});
  var folder = createObj('folder', {n: 'filterObjTest with override only'}, {MOCK20override: true});
  var character = createObj('character', {name: "I should not be retrived"});
  var filter = function(obj){
    var name = "";
    if(obj.get("_type") == "player"){
      name = obj.get("_displayname");
    }
    if(obj.get("_type") == "graphic"
    || obj.get("_type") == "page"
    || obj.get("_type") == "macro"
    || obj.get("_type") == "rollabletable"
    || obj.get("_type") == "tableitem"
    || obj.get("_type") == "character"
    || obj.get("_type") == "attribute"
    || obj.get("_type") == "ability"
    || obj.get("_type") == "handout"
    || obj.get("_type") == "deck"
    || obj.get("_type") == "card"){
      name = obj.get("name");
    }
    if(obj.get("_type") == "jukeboxtrack"){
      name = obj.get("title");
    }
    if(obj.get("_type") == "folder"
    || obj.get("_type") == "playlist"){
      name = obj.get("n");
    }
    return /filterObjTest/.test(name);
  };
  it('should properly filter out objects created by createObj()', function(){
    var filteredObjs = filterObjs(filter);
    expect(filteredObjs).to.include.members([player, handout, page]);
    expect(filteredObjs).to.not.include(character);
    expect(filteredObjs).to.not.include(folder);
  });
  it('should properly filter out objects created by createObj(), including folders, when using a MOCK20override', function(){
    var filteredObjs = filterObjs(filter, {MOCK20override: true});
    expect(filteredObjs).to.include.members([player, handout, page, folder]);
    expect(filteredObjs).to.not.include(character);
  });
});

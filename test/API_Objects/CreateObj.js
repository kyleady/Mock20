var expect = require('chai').expect;
var createObj = require('./../../Functions/API_Objects/CreateObj');
var objs = {
  graphic: true,
  card: false,
  text: true,
  deck: false,
  path: true,
  folder: false,
  character: true,
  hand: false,
  ability: true,
  jukeboxtrack: false,
  attribute: true,
  page: false,
  handout: true,
  player: false,
  rollabletable: true,
  playlist: false,
  tableitem: true,
  macro: true
};
function testCreatableObj(type, pageid){
  it('should be able to create ' + type + ' objs', function(){
    var newObj = createObj(type, {_pageid: pageid});
    expect(newObj.get('_type')).to.equal(type);
  });
}
function testNonCreatableObj(type, pageid){
  it('should not be able to create ' + type + ' objs', function(){
    var newObj = createObj(type, {_pageid: pageid});
    expect(newObj).to.be.an('undefined');
  });
  it('should be able to create ' + type + ' objs with a MOCK20override', function(){
    var newObj = createObj(type, {_pageid: pageid}, {MOCK20override: true});
    expect(newObj.get('_type')).to.equal(type);
  });
}
describe('createObj()', function(){
  var page = createObj("page", {name: "test page"}, {MOCK20override: true});
  for(var type in objs){
    describe(type, function(){
      if(objs[type]){
        testCreatableObj(type, page.id);
      } else {
        testNonCreatableObj(type, page.id);
      }
    });
  }
  it('should not be able to create completely madeup objs, even with a MOCK20override', function(){
    var newObj = createObj('completely madeup', {}, {MOCK20override: true});
    expect(newObj).to.be.an('undefined');
  });
});

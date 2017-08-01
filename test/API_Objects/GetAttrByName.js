var expect = require('chai').expect;
var getAttrByName = require('./../../Functions/API_Objects/GetAttrByName');
var createObj = require('./../../Functions/API_Objects/CreateObj');
describe('getAttrByName()', function(){
  it('should retrive just the value of the named attribute, defaulting to current', function(){
    var character = createObj('character', {name: 'getAttrByName test character'});
    var attribute = createObj('character', {
      name: 'getAttrByName test attribute',
      current: 'the current value',
      max: 'the max value',
      _characterid: character.id
    });
    var current = getAttrByName(character.id, attribute.get('name'), 'current');
    var max = getAttrByName(character.id, attribute.get('name'), 'max');
    var defaultsToCurrent = getAttrByName(character.id, attribute.get('name'));
    expect(current).to.equal(attribute.get('current'));
    expect(defaultsToCurrent).to.equal(attribute.get('current'));
    expect(max).to.equal(attribute.get('max'));
  });
  it('should default to the first attribute with the same name', function(){
    var character = createObj('character', {name: 'getAttrByName identical name test'});
    var attribute = createObj('character', {
      name: 'getAttrByName identical name test',
      current: 'the current value',
      max: 'the max value',
      _characterid: character.id
    });
    var secondAttribute = createObj('character', {
      name: 'getAttrByName identical name test',
      current: 'a different current value',
      max: 'a different max value',
      _characterid: character.id
    });
    var current = getAttrByName(character.id, secondAttribute.get('name'), 'current');
    expect(current).to.equal(attribute.get('current'));
  });
});

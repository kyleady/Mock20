var expect = require('chai').expect;
var setDefaultTokenForCharacter = require('./../../../Functions/API_Utility/SetDefaultTokenForCharacter');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
describe('setDefaultTokenForCharacter()', function(){
  it('should store the token\'s data as a JSON within the character\'s _defaulttoken', function(){
    var character = createObj('character', {});
    var page = createObj('page', {}, {MOCK20override: true});
    var token = createObj('graphic', {_pageid: page.id});
    expect(character.get('_defaulttoken')).to.be.empty;
    setDefaultTokenForCharacter(character, token);
    expect(character.get('_defaulttoken')).to.equal(JSON.stringify(token.MOCK20data));
  });
  it('should break like the Roll20 setDefaultTokenForCharacter()', function(){
    var character = createObj('character', {});
    var page = createObj('page', {}, {MOCK20override: true});
    var token = createObj('graphic', {_pageid: page.id});
    expect(character.get('_defaulttoken')).to.be.empty;
    setDefaultTokenForCharacter(token, character);
    expect(character.get('_defaulttoken')).to.be.empty;
    setDefaultTokenForCharacter(page, token);
    expect(character.get('_defaulttoken')).to.be.empty;
    setDefaultTokenForCharacter(character, {});
    expect(character.get('_defaulttoken')).to.be.empty;
    expect(function(){setDefaultTokenForCharacter(character, 5)}).to.throw;
  });
});

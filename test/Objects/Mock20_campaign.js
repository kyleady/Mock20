var expect = require('chai').expect;
require('./../../index');
describe('Campaign()', function(){
  it('should reset everything with the Campaign().MOCK20reset() method', function() {
    var changeCharacterDetected = false;
    on('change:character', function() {
      changeCharacterDetected = true;
    });
    var character = createObj('character', {});
    var page = createObj('page', {}, {MOCK20override: true});
    Campaign().set('playerpageid', page.id);

    expect(getObj('character', character.id)).to.not.be.undefined;
    expect(changeCharacterDetected).to.equal(false);
    character.set('name', 'character name');
    expect(changeCharacterDetected).to.equal(true);
    expect(Campaign().get('playerpageid')).to.equal(page.id);

    Campaign().MOCK20reset();

    expect(getObj('character', character.id)).to.be.undefined;
    changeCharacterDetected = false;
    var character = createObj('character', {});
    character.set('name', 'character name');
    expect(changeCharacterDetected).to.equal(false);
    expect(Campaign().get('playerpageid')).to.equal(false);
  });
});

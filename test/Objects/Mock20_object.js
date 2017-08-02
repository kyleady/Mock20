var expect = require('chai').expect;
var createObj = require('./../../Functions/API_Objects/CreateObj');
var getObj = require('./../../Functions/API_Objects/GetObj');
var on = require('./../../Functions/API_Events/On');
describe('Mock20_objects', function(){
  it('should be able to set multiple properties at once', function(){
    var character = createObj('character');
    character.set({
      name: 'The Forgotten',
      archived: true,
      controlledby: 'all'
    });
    expect(character.get('name')).to.equal('The Forgotten');
    expect(character.get('archived')).to.equal(true);
    expect(character.get('controlledby')).to.equal('all');
  });
  it('should be unable to set values that do not normally exist for the object', function(){
    var handout = createObj('handout');
    var folder = createObj('folder', {}, {MOCK20override: true});
    var jukeboxtrack = createObj('jukeboxtrack', {}, {MOCK20override: true});
    handout.set('n', 'new handout name');
    folder.set('title', 'new folder name');
    jukeboxtrack.set('name', 'new jukeboxtrack name');
    expect(handout.get('n')).to.be.undefined;
    expect(folder.get('title')).to.be.undefined;
    expect(jukeboxtrack.get('name')).to.be.undefined;
  });
  it('should not be able to set values as undefined', function(){
    var character = createObj('character');
    character.set('archived', undefined);
    expect(character.get('archived')).to.not.be.undefined;
  });
  it('should not be able to object.remove() objects like players without a MOCK20override', function(){
    var character = createObj('character');
    var page = createObj('page', {}, {MOCK20override: true});
    expect(getObj(character.get('_type'), character.id)).to.not.be.undefined;
    expect(getObj(page.get('_type'), page.id)).to.not.be.undefined;
    character.remove();
    page.remove();
    expect(getObj(character.get('_type'), character.id)).to.be.undefined;
    expect(getObj(page.get('_type'), page.id)).to.not.be.undefined;
    page.remove({MOCK20override: true});
    expect(getObj(page.get('_type'), page.id)).to.be.undefined;
  });
  it('should be unable to object.remove() an object that has already been removed', function(){
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    var graphic2 = createObj('graphic', {_pageid: page.id});
    var destroyGraphicCount = 0;
    on('destroy:graphic', function(){
      destroyGraphicCount++;
    });
    expect(destroyGraphicCount).to.equal(0);
    graphic.remove();
    expect(destroyGraphicCount).to.equal(1);
    graphic.remove();
    expect(destroyGraphicCount).to.equal(1);
    graphic2.remove();
    expect(destroyGraphicCount).to.equal(2);
  });
  it('should not create an object placed on an invalid page', function(){
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    expect(graphic).to.not.be.undefined;
    page.remove({MOCK20override: true});
    var graphic2 = createObj('graphic', {_pageid: page.id});
    expect(graphic2).to.be.undefined;
  });
});

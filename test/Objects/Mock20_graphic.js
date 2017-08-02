var expect = require('chai').expect;
var createObj = require('./../../Functions/API_Objects/CreateObj');
var on = require('./../../Functions/API_Events/On');
describe('graphics', function(){
  it('should allow you to view status markers with graphic.get(\'status_<marker>\')', function(){
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    expect(graphic.get('status_blue')).to.equal(false);
  });
  it('should allow you to change status markers with graphic.set(\'status_<marker>\', <value>)', function(){
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    graphic.set('status_death-zone', '3');
    graphic.set('status_bleeding-eye', true);
    expect(graphic.get('status_death-zone')).to.equal('3');
    expect(graphic.get('status_bleeding-eye')).to.equal(true);
  });
  it('should only trigger change:graphic:statusmarkers when change a specific status_marker', function(){
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    changeStatusFrozenOrbDetected = false;
    changeStatusMarkersDetected = false;
    on('change:graphic:status_frozen-orb', function(){
      changeStatusFrozenOrbDetected = true;
    });
    on('change:graphic:statusmarkers', function(){
      changeStatusMarkersDetected = true;
    });
    expect(changeStatusFrozenOrbDetected).to.equal(false);
    expect(changeStatusMarkersDetected).to.equal(false);
    graphic.set('status_frozen-orb', '3');
    expect(changeStatusFrozenOrbDetected).to.equal(false);
    expect(changeStatusMarkersDetected).to.equal(true);
  });
  it('should not trigger change:graphic:statusmarkers when changing an invalid status_marker', function(){
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {_pageid: page.id});
    changeStatusMarkersDetected = false;
    on('change:graphic:statusmarkers', function(){
      changeStatusMarkersDetected = true;
    });
    expect(changeStatusMarkersDetected).to.equal(false);
    graphic.set('status_completely-made-up-status-marker', '10');
    expect(changeStatusMarkersDetected).to.equal(false);
    expect(graphic.get('status_completely-made-up-status-marker')).to.be.undefined;
  });
});

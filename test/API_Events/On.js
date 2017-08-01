var expect = require('chai').expect;
var on = require('./../../Functions/API_Events/On');
var createObj = require('./../../Functions/API_Objects/CreateObj');
describe('on()', function(){
  it('should react to new objects', function(){
    var addHandoutDetected = false;
    on("add:handout", function(){
      addHandoutDetected = true;
    });
    var character = createObj('character');
    expect(addHandoutDetected).to.equal(false);
    var handout = createObj('handout');
    expect(addHandoutDetected).to.equal(true);
  });
  it('should react to changes in objects in order, reacting to specific changes first', function(){
    var changeAbilityDetected = [];
    on("change:ability", function(){
      changeAbilityDetected.push('ability1');
    });
    on("change:ability", function(){
      changeAbilityDetected.push('ability2');
    });
    on("change:ability:description", function(){
      changeAbilityDetected.push('ability.description');
    });
    var character = createObj('character');
    var ability = createObj('ability', {_characterid: character.id});
    character.set('name', "On(\"change:ability\") test");
    expect(changeAbilityDetected).to.be.empty;
    ability.set('name', 'only trigger change:ability');
    expect(changeAbilityDetected).to.have.lengthOf(2);
    expect(changeAbilityDetected).to.have.ordered.members(['ability1', 'ability2']);
    ability.set('description', 'will trigger change:ability:description first');
    expect(changeAbilityDetected).to.have.lengthOf(5);
    expect(changeAbilityDetected).to.have.ordered.members([
      'ability1',
      'ability2',
      'ability.description',
      'ability1',
      'ability2',
    ]);
  });
  it('should react to objects being removed', function(){
    var removeMacroDetected = false;
    on("destroy:macro", function(){
      removeMacroDetected = true;
    });
    var character = createObj('character');
    var macro = createObj('macro');
    expect(removeMacroDetected).to.equal(false);
    macro.remove();
    expect(removeMacroDetected).to.equal(true);
  });
  it('should allow you to edit the triggering object', function(){
    var graphicTriggersDetected = [];
    on('add:graphic', function(obj){
      graphicTriggersDetected.push("add");
      obj.set('name', 'created');
    });
    on('change:graphic', function(obj){
      graphicTriggersDetected.push("change");
      if(obj.get('name') != 'changed'){
        obj.set('name', 'changed');
      }
    });
    on('change:graphic:rotation', function(obj, prev){
      graphicTriggersDetected.push("change:rotation " + prev.rotation + '->' + obj.get('rotation'));
      if(obj.get('rotation') != 0){
        obj.set('rotation', 0);
      }
    });
    on('destroy:graphic', function(obj){
      graphicTriggersDetected.push(obj.get('name') + ' remove');
      obj.set('name', 'destroyed');
    });
    var page = createObj('page', {}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: "start", _pageid: page.id});
    graphic.set('left', 10);
    graphic.set('rotation', 13);
    graphic.remove();
    expect(graphicTriggersDetected).to.have.lengthOf(11);
    expect(graphicTriggersDetected).to.have.ordered.members([
      'add',
      'change',
      'change',
      'change',
      'change:rotation 0->13',
      'change:rotation 13->0',
      'change',
      'change',
      'changed remove',
      'change',
      'change'
    ]);
  });
});

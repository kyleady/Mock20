var expect = require('chai').expect;
require('./../../../index');
describe('on()', function(){
  it('should react to new objects', function(){
    var addHandoutDetected = false;
    on("add:handout", function(){
      addHandoutDetected = true;
    });
    var character = createObj('character', {});
    expect(addHandoutDetected).to.equal(false);
    var handout = createObj('handout', {});
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
    var character = createObj('character', {});
    var ability = createObj('ability', {_characterid: character.id});
    character.set('name', "On(\"change:ability\") test");
    expect(changeAbilityDetected).to.be.empty;
    ability.set('name', 'only trigger change:ability');
    expect(changeAbilityDetected).to.have.ordered.members(['ability1', 'ability2']);
    ability.set('description', 'will trigger change:ability:description first');
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
    var character = createObj('character', {});
    var macro = createObj('macro', {});
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
  it('should deliver a prev obj copying all of the properties before the change event', function(){
    var character = createObj('character', {name: 'Trev'});
    on('change:character:name', function(obj, prev){
      expect(prev.name).to.equal(prev.get('name'));
      prev.set('name', 'Trev');
    });
    character.set('name', 'Trevor');
    expect(character.get('name')).to.not.equal('Trev');
  });
  it('should break like the Roll20 on()', function(){
    expect(function(){on()}).to.throw();
    expect(function(){on(5, function(){})}).to.throw();

    expect(function(){on('invalid')}).to.not.throw();
    expect(function(){on('invalid', 5)}).to.not.throw();
    expect(function(){on('add:graphic','invalid')}).to.not.throw();
  });
  it('should be able to remove events with MOCK20remove', function(){
    var addAttributeDetected1 = false;
    var addAttributeDetected2 = false;
    var attributeDetector1 = function(){
      addAttributeDetected1 = true;
    };
    var attributeDetector2 = function(){
      addAttributeDetected2 = true;
    };
    on('add:attribute', attributeDetector1);
    on('add:attribute', attributeDetector2);
    var character = createObj('character', {name: 'test character'});
    expect(addAttributeDetected1).to.equal(false);
    expect(addAttributeDetected2).to.equal(false);
    createObj('attribute', {name: 'test attribute', _characterid: character.id});
    expect(addAttributeDetected1).to.equal(true);
    expect(addAttributeDetected2).to.equal(true);
    addAttributeDetected1 = false;
    addAttributeDetected2 = false;
    on({MOCK20remove: true}, attributeDetector2);
    createObj('attribute', {name: 'test attribute', _characterid: character.id});
    expect(addAttributeDetected1).to.equal(true);
    expect(addAttributeDetected2).to.equal(false);
  });
});

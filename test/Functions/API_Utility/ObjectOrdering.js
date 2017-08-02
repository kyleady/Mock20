var expect = require('chai').expect;
var toFront = require('./../../../Functions/API_Utility/ObjectOrdering').toFront;
var toBack = require('./../../../Functions/API_Utility/ObjectOrdering').toBack;
var createObj = require('./../../../Functions/API_Objects/CreateObj');
describe('Object Ordering', function(){
  it('should use toFront() and toBack() to change the _zorder of objects', function(){
    var page = createObj('page', {name: 'ObjectOrdering test page'}, {MOCK20override: true});
    var graphic = createObj('graphic', {name: 'ObjectOrdering test graphic', _pageid: page.id});
    var pathArray = [
      ["M", 0, 0],
      ["L", 70, 0],
      ["L", 0, 70],
      ["L", 0, 0]
    ];
    var path = createObj('graphic', {_path: JSON.stringify(pathArray), _pageid: page.id});
    var text = createObj('text', {_pageid: page.id, text: 'This is text'});
    expect(page.get('_zorder')).to.equal("," + graphic.id + "," + path.id + "," + text.id);
    toFront(path);
    expect(page.get('_zorder')).to.equal(graphic.id + "," + text.id + "," + path.id);
    toBack(text);
    expect(page.get('_zorder')).to.equal(text.id + "," + graphic.id + "," + path.id);
  });
  it('should do nothing if used on an object without a _pageid', function(){
    var page = createObj('page', {name: 'ObjectOrdering test page'}, {MOCK20override: true});
    toFront(page);
    toBack(page);
  });
});

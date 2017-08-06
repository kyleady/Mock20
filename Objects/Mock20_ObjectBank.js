require('./../Functions/API_Events/On');

class MOCK20bank {
  constructor() {
    this.objCounter = 0;
  }

  create(Proto, attributes) {
    var id = this.objCounter.toString(16);
    var obj = new Proto(id, attributes);
    var type = obj.get('_type');
    if (!this.addObjToPage(obj)) return;
    if (obj.MOCK20addToJournal) obj.MOCK20addToJournal();
    this.objCounter++;
    if (this[type] == undefined) this[type] = {};
    this[type][id] = obj;
    MOCK20trigger('add:' + type, obj);
    return obj;
  }

  get(type, id) {
    if (this[type]) {
      return this[type][id];
    }
  }

  remove(type, id, options) {
    if (!this[type] || !this[type][id]) return;
    var obj = this[type][id];
    if (!options.MOCK20messyDelete) {
      if (obj.removeFromJournal) obj.removeFromJournal();
    }

    MOCK20trigger('destroy:' + type, obj);
    delete this[type][id];
  }

  addObjToPage(obj) {
    if (obj.MOCK20data._pageid != undefined) {
      if (obj && obj.get('_pageid')) {
        var page = this.page[obj.get('_pageid')];
      }

      if (!page) {
        MOCK20warning('Invalid page id.');
        return false;
      }

      page.MOCK20update('_zorder', page.get('_zorder') + ',' + obj.id);
    }

    return true;
  }

  MOCK20reset() {
    for (var k in this) {
      if (typeof this[k] != 'function') {
        delete this[k];
      }
    }

    this.objCounter = 0;
  }
};

var bank = new MOCK20bank();
module.exports = bank;

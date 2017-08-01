require('./Functions/API_Events/On');

class MOCK20bank {
  constructor() {
    this.objCounter = 0;
  }

  create(Proto, attributes) {
    var id = this.objCounter.toString(16);
    var obj = new Proto(id, attributes);
    var type = obj.get('_type');
    if (!this.addToPage(obj)) return;
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
    options = options || { MOCK20messyDelete: false };
    if (!this[type] || !this[type][id]) return;
    var obj = this[type][id];
    if (!options.MOCK20messyDelete) {
      if (obj.removeFromJournal) obj.removeFromJournal();
      if (obj.removeFromJukebox) obj.removeFromJukebox();
    }

    delete this[type][id];
  }

  addToPage(obj) {
    if (obj.MOCK20data._pageid != undefined) {
      if(obj && obj.get('_pageid')){
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

  removeFromPage(obj) {
    if (obj.MOCK20data._pageid != undefined) {
      var page = this.page[obj.get('_pageid')];
      if (!page) {
        MOCK20warning('Invalid page id for ' + type);
        return false;
      }

      var zorder = page.get('_zorder').split(',');
      for (var i = 0; i < zorder.length; i++) {
        if (zorder[i] == obj.id) {
          zorder.splice(i, 1);
          i--;
        }
      }

      page.MOCK20update('_zorder', zorder.join());
    }
  }
};

var bank = new MOCK20bank();
module.exports = bank;

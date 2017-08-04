var MOCK20folder = require('./Mock20_folder');
var Campaign = require('./../Functions/API_Objects/Campaign');

class MOCK20playlist extends MOCK20folder{
  constructor(_id, input) {
    var data = {
      _id: '',
      _type: 'playlist',
      n: 'Playlist',
      _i: [],
      s: 's'
    };

    super(_id, input, data);
  }

  folderObj() {
    return {
      n: this.MOCK20data.n,
      i: [],
      id: this.MOCK20data._id,
      s: this.MOCK20data.s
    };
  }
}

module.exports = MOCK20playlist;

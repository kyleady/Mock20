var expect = require('chai').expect;
var playJukeboxPlaylist = require('./../../Functions/API_Utility/Jukebox').playJukeboxPlaylist;
var stopJukeboxPlaylist = require('./../../Functions/API_Utility/Jukebox').stopJukeboxPlaylist;
describe('playJukeboxPlaylist()', function(){
  it('should be a function', function(){
    expect(playJukeboxPlaylist).to.be.a('function');
  });
});
describe('stopJukeboxPlaylist()', function(){
  it('should be a function', function(){
    expect(stopJukeboxPlaylist).to.be.a('function');
  });
});

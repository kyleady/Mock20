var expect = require('chai').expect;
require('./../../../index');
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

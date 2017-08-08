var expect = require('chai').expect;
require('./../../index');
describe('playlists', function(){
  it('should be created with a MOCK20override', function(){
    var playlist = createObj('playlist', {n: "Test Playlist1"}, {MOCK20override: true});
    expect(playlist.get('_type')).to.equal('playlist');
  });
  it('should get() and set() n, s, _i, _id, _type like normal roll20 objects', function(){
    var playlist = createObj('playlist', {n: "Test Playlist2"}, {MOCK20override: true});
    playlist.set('n', 'new test playlist');
    expect(playlist.get('n')).to.equal('new test playlist');
    playlist.set('s', 'b');
    expect(playlist.get('s')).to.equal('b');
    expect(playlist.id).to.equal(playlist.get('_id'));
    expect(playlist.get('_type')).to.equal('playlist');
    expect(playlist.get('_i')).to.be.empty;
  });
  it('should inheret from folders', function(){
    var playlist = createObj('playlist', {}, {MOCK20override: true});
    var folder = createObj('folder', {}, {MOCK20override: true});
    expect(playlist).to.be.instanceof(folder.constructor);
  });
  it('should trigger \'change:campaign:_jukeboxfolder\' and \'add:playlist\'', function(){
    var changeCampaignJukeboxFolderDetected = false;
    var addPlaylistDetected = false;
    on('change:campaign:_jukeboxfolder', function(){
      changeCampaignJukeboxFolderDetected = true;
    });
    on('add:playlist', function(){
      addPlaylistDetected = true;
    });
    expect(changeCampaignJukeboxFolderDetected).to.equal(false);
    expect(addPlaylistDetected).to.equal(false);
    var folder = createObj('playlist', {n: "Test Playlist3"}, {MOCK20override: true});
    expect(changeCampaignJukeboxFolderDetected).to.equal(true);
    expect(addPlaylistDetected).to.equal(true);
  });
  it('should trigger \'change:campaign:_jukeboxfolder\' and \'change:playlist\'', function(){
    var folder = createObj('playlist', {n: "Test Playlist4"}, {MOCK20override: true});
    var changeCampaignJukeboxFolderDetected2 = false;
    var changePlaylistDetected = false;
    on('change:campaign:_jukeboxfolder', function(){
      changeCampaignJukeboxFolderDetected2 = true;
    });
    on('change:playlist', function(){
      changePlaylistDetected = true;
    });
    expect(changeCampaignJukeboxFolderDetected2).to.equal(false);
    expect(changePlaylistDetected).to.equal(false);
    folder.set('n', 'new test playlist2');
    expect(changeCampaignJukeboxFolderDetected2).to.equal(true);
    expect(changePlaylistDetected).to.equal(true);
  });
  it('should trigger \'change:campaign:_jukeboxfolder\' and \'destroy:playlist\'', function(){
    var folder = createObj('playlist', {n: "Test Playlist5"}, {MOCK20override: true});
    var changeCampaignJukeboxFolderDetected3 = false;
    var destroyPlaylistDetected = false;
    on('change:campaign:_jukeboxfolder', function(){
      changeCampaignJukeboxFolderDetected3 = true;
    });
    on('destroy:playlist', function(){
      destroyPlaylistDetected = true;
    });
    expect(changeCampaignJukeboxFolderDetected3).to.equal(false);
    expect(destroyPlaylistDetected).to.equal(false);
    folder.remove({MOCK20override: true});
    expect(changeCampaignJukeboxFolderDetected3).to.equal(true);
    expect(destroyPlaylistDetected).to.equal(true);
  });
  it('should move all contained items to the root folder when removed', function(){
    var folder = createObj('playlist', {}, {MOCK20override: true});
    var jukeboxtrack = createObj('jukeboxtrack', {}, {MOCK20override: true});
    var jukeboxtrack2 = createObj('jukeboxtrack', {}, {MOCK20override: true});
    MOCK20moveToPlaylist(jukeboxtrack, folder.id);
    var rootfolder = folder.constructor.getRootFolder();
    expect(rootfolder.findItem(jukeboxtrack.id)).to.equal(folder.id);
    expect(rootfolder.findItem(jukeboxtrack2.id)).to.equal('root_folder');
    expect(rootfolder.findItem(folder.id)).to.equal('root_folder');
    folder.remove({MOCK20override: true});
    rootfolder = folder.constructor.getRootFolder();
    expect(rootfolder.findItem(jukeboxtrack.id)).to.equal('root_folder');
    expect(rootfolder.findItem(jukeboxtrack2.id)).to.equal('root_folder');
    expect(rootfolder.findItem(folder.id)).to.be.undefined;
    expect(getObj('playlist', folder.id, {MOCK20override: true})).to.be.undefined;
  });
});

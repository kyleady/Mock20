var expect = require('chai').expect;
var createObj = require('./../../Functions/API_Objects/CreateObj');
var getObj = require('./../../Functions/API_Objects/GetObj');
var MOCK20sortFolder = require('./../../Functions/Mock20_Setup/SortFolder');
var MOCK20moveToFolder = require('./../../Functions/Mock20_Setup/FolderStructure').MOCK20moveToFolder;
var MOCK20moveToPlaylist = require('./../../Functions/Mock20_Setup/FolderStructure').MOCK20moveToPlaylist;
var on = require('./../../Functions/API_Events/On');
describe('MOCK20sortFolder()', function(){
  it('should sort folder, but items in subfolders', function(){
    var handoutA = createObj('handout', {name: 'A'});
    var characterB = createObj('character', {name: 'B'});
    var subfolderC = createObj('folder', {n: 'C'}, {MOCK20override: true});
    var handoutD = createObj('handout', {name: 'D'});
    var characterE = createObj('character', {name: 'E'});
    var subfolderF = createObj('folder', {n: 'F'}, {MOCK20override: true});
    var folder = createObj('folder', {n: 'Folder'}, {MOCK20override: true});
    var handoutY = createObj('handout', {name: 'Y'});
    var handoutZ = createObj('handout', {name: 'Z'});
    MOCK20moveToFolder(handoutD, folder.id);
    MOCK20moveToFolder(handoutA, folder.id);
    MOCK20moveToFolder(characterE, folder.id);
    MOCK20moveToFolder(subfolderF, folder.id);
    MOCK20moveToFolder(subfolderC, folder.id);
    MOCK20moveToFolder(characterB, folder.id);
    MOCK20moveToFolder(handoutZ, subfolderC.id);
    MOCK20moveToFolder(handoutY, subfolderC.id);
    expect(JSON.stringify(folder.getStructure().i)).to.equal(JSON.stringify([
      handoutD.id,
      handoutA.id,
      characterE.id,
      subfolderF.getStructure(),
      subfolderC.getStructure(),
      characterB.id
    ]));
    expect(JSON.stringify(subfolderC.getStructure().i)).to.equal(JSON.stringify([
      handoutZ.id,
      handoutY.id
    ]));
    MOCK20sortFolder(folder);
    expect(JSON.stringify(folder.getStructure().i)).to.equal(JSON.stringify([
      handoutA.id,
      characterB.id,
      subfolderC.getStructure(),
      handoutD.id,
      characterE.id,
      subfolderF.getStructure()
    ]));
    expect(JSON.stringify(subfolderC.getStructure().i)).to.equal(JSON.stringify([
      handoutZ.id,
      handoutY.id
    ]));
  });
  it('should sort playlists', function(){
    var playlist = createObj('playlist', {n: 'Playlist'}, {MOCK20override: true});
    var jukeboxtrackA = createObj('jukeboxtrack', {title: 'A'}, {MOCK20override: true});
    var jukeboxtrackB = createObj('jukeboxtrack', {title: 'B'}, {MOCK20override: true});
    MOCK20moveToPlaylist(jukeboxtrackB, playlist.id);
    MOCK20moveToPlaylist(jukeboxtrackA, playlist.id);
    expect(JSON.stringify(playlist.getStructure().i)).to.equal(JSON.stringify([
      jukeboxtrackB.id,
      jukeboxtrackA.id
    ]));
    MOCK20sortFolder(playlist);
    expect(JSON.stringify(playlist.getStructure().i)).to.equal(JSON.stringify([
      jukeboxtrackA.id,
      jukeboxtrackB.id
    ]));
  });
  it('should trigger \'change:campaign:_journalfolder\'', function(){
    var folder = createObj('folder', {n: 'Folder'}, {MOCK20override: true});
    var handoutA = createObj('handout', {title: 'A'});
    var handoutB = createObj('handout', {title: 'B'});
    MOCK20moveToFolder(handoutB, folder.id);
    MOCK20moveToFolder(handoutA, folder.id);
    var changeCampaignJournalFolderDetected9 = false;
    on('change:campaign:_journalfolder', function(){
      changeCampaignJournalFolderDetected9 = true;
    });
    expect(changeCampaignJournalFolderDetected9).to.equal(false);
    MOCK20sortFolder(folder);
    expect(changeCampaignJournalFolderDetected9).to.equal(true);
  });
  it('should trigger \'change:campaign:_jukeboxfolder\'', function(){
    var playlist = createObj('playlist', {n: 'Playlist'}, {MOCK20override: true});
    var jukeboxtrackA = createObj('jukeboxtrack', {title: 'A'}, {MOCK20override: true});
    var jukeboxtrackB = createObj('jukeboxtrack', {title: 'B'}, {MOCK20override: true});
    MOCK20moveToPlaylist(jukeboxtrackB, playlist.id);
    MOCK20moveToPlaylist(jukeboxtrackA, playlist.id);
    var changeCampaignJukeboxFolderDetected6 = false;
    on('change:campaign:_jukeboxfolder', function(){
      changeCampaignJukeboxFolderDetected6 = true;
    });
    expect(changeCampaignJukeboxFolderDetected6).to.equal(false);
    MOCK20sortFolder(playlist);
    expect(changeCampaignJukeboxFolderDetected6).to.equal(true);
  });
  it('should not sort other objects', function(){
    MOCK20sortFolder(undefined);
    var page = createObj('page', {}, {MOCK20override: true});
    MOCK20sortFolder(page);
    MOCK20sortFolder({});
  });
});

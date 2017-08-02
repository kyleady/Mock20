var expect = require('chai').expect;
var createObj = require('./../../Functions/API_Objects/CreateObj');
var getObj = require('./../../Functions/API_Objects/GetObj');
var MOCK20moveToFolder = require('./../../Functions/Mock20_Setup/FolderStructure').MOCK20moveToFolder;
var MOCK20moveBeforeFolderItem = require('./../../Functions/Mock20_Setup/FolderStructure').MOCK20moveBeforeFolderItem;
var MOCK20moveBeforePlaylistItem = require('./../../Functions/Mock20_Setup/FolderStructure').MOCK20moveBeforePlaylistItem;
var MOCK20moveToPlaylist = require('./../../Functions/Mock20_Setup/FolderStructure').MOCK20moveToPlaylist;
var on = require('./../../Functions/API_Events/On');
describe('Folder Structure:', function(){
  describe('MOCK20moveToFolder()', function(){
    it('should move journal items and folders into the given folder', function(){
      var handout = createObj('handout');
      var character = createObj('character');
      var subfolder = createObj('folder', {}, {MOCK20override: true});
      var folder = createObj('folder', {}, {MOCK20override: true});
      MOCK20moveToFolder(handout, folder.id);
      MOCK20moveToFolder(character, folder.id);
      expect(folder.getStructure().i).to.have.ordered.members([handout.id, character.id]);
      MOCK20moveToFolder(subfolder, folder.id);
      MOCK20moveToFolder(character, subfolder.id);
      expect(JSON.stringify(folder.getStructure().i)).to.equal(JSON.stringify([handout.id, subfolder.getStructure()]));
      expect(JSON.stringify(subfolder.getStructure().i)).to.equal(JSON.stringify([character.id]));
    });
    it('should move journal items and folders to the root folder if the folder id is \'root_folder\'', function(){
      var handout = createObj('handout');
      var character = createObj('character');
      var subfolder = createObj('folder', {}, {MOCK20override: true});
      var folder = createObj('folder', {}, {MOCK20override: true});
      MOCK20moveToFolder(handout, folder.id);
      MOCK20moveToFolder(character, folder.id);
      MOCK20moveToFolder(subfolder, folder.id);
      expect(JSON.stringify(folder.getStructure().i)).to.equal(JSON.stringify([handout.id, character.id, subfolder.getStructure()]));
      MOCK20moveToFolder(handout, 'root_folder');
      MOCK20moveToFolder(character, 'root_folder');
      var rootfolder = folder.constructor.getRootFolder();
      expect(rootfolder.getStructure().i).to.include.members([handout.id, character.id]);
    });
    it('should not modify _journalfolder if there is invalid input', function(){
      var changeCampaignJournalFolderDetected4 = false;
      on('change:campaign:_journalfolder', function(){
        changeCampaignJournalFolderDetected4 = true;
      });
      MOCK20moveToFolder(undefined, undefined);
      expect(changeCampaignJournalFolderDetected4).to.equal(false);
      MOCK20moveToFolder(undefined, 'root_folder');
      expect(changeCampaignJournalFolderDetected4).to.equal(false);
      var page = createObj('page', {}, {MOCK20override: true});
      MOCK20moveToFolder(page, 'root_folder');
      expect(changeCampaignJournalFolderDetected4).to.equal(false);
    });
    it('should not modify _journalfolder if the folder.id refers to a folder that no longer exists', function(){
      var handout = createObj('handout');
      var folder = createObj('folder', {}, {MOCK20override: true});
      folder.remove({MOCK20override: true});
      var changeCampaignJournalFolderDetected5 = false;
      on('change:campaign:_journalfolder', function(){
        changeCampaignJournalFolderDetected5 = true;
      });
      var rootfolder = folder.constructor.getRootFolder();
      expect(rootfolder.findItem(folder.id)).to.be.undefined;
      MOCK20moveToFolder(handout, folder.id);
      expect(changeCampaignJournalFolderDetected5).to.equal(false);
      expect(rootfolder.findItem(handout.id)).to.not.be.undefined;
    });
    it('should be unable to move a folder into itself', function(){
      var folder = createObj('folder', {}, {MOCK20override: true});
      var subfolder = createObj('folder', {}, {MOCK20override: true});
      var rootfolder = folder.constructor.getRootFolder();
      MOCK20moveToFolder(subfolder, folder.id);
      var changeCampaignJournalFolderDetected6 = false;
      on('change:campaign:_journalfolder', function(){
        changeCampaignJournalFolderDetected6 = true;
      });
      expect(changeCampaignJournalFolderDetected6).to.equal(false);
      MOCK20moveToFolder(folder, folder.id);
      expect(changeCampaignJournalFolderDetected6).to.equal(false);
      MOCK20moveToFolder(folder, subfolder.id);
      expect(changeCampaignJournalFolderDetected6).to.equal(false);
      MOCK20moveToFolder(rootfolder, 'root_folder');
      expect(changeCampaignJournalFolderDetected6).to.equal(false);
      MOCK20moveToFolder(rootfolder, subfolder.id);
      expect(changeCampaignJournalFolderDetected6).to.equal(false);
    });
  });
  describe('MOCK20moveBeforeFolderItem()', function(){
    it('should move folder items and folders in front of the target', function(){
      var handout = createObj('handout');
      var character = createObj('character');
      var subfolder = createObj('folder', {}, {MOCK20override: true});
      var folder = createObj('folder', {}, {MOCK20override: true});
      MOCK20moveToFolder(handout, folder.id);
      MOCK20moveBeforeFolderItem(character, handout.id);
      expect(folder.getStructure().i).to.have.ordered.members([character.id, handout.id]);
      MOCK20moveBeforeFolderItem(subfolder, character.id);
      expect(JSON.stringify(folder.getStructure().i)).to.equal(JSON.stringify([subfolder.getStructure(), character.id, handout.id]));
    });
    it('should be unable to move folder items and folders in front of \'root_folder\'', function(){
      var handout = createObj('handout');
      var character = createObj('character');
      var folder = createObj('folder', {}, {MOCK20override: true});
      var changeCampaignJournalFolderDetected7 = false;
      on('change:campaign:_journalfolder', function(){
        changeCampaignJournalFolderDetected7 = true;
      });
      expect(changeCampaignJournalFolderDetected7).to.equal(false);
      MOCK20moveBeforeFolderItem(character, 'root_folder');
      expect(changeCampaignJournalFolderDetected7).to.equal(false);
      MOCK20moveBeforeFolderItem(handout, 'root_folder');
      expect(changeCampaignJournalFolderDetected7).to.equal(false);
      MOCK20moveBeforeFolderItem(folder, 'root_folder');
      expect(changeCampaignJournalFolderDetected7).to.equal(false);
    });
    it('should do nothing when moving folder items and folders in front of themselves', function(){
      var handout = createObj('handout');
      var character = createObj('character');
      var folder = createObj('folder', {}, {MOCK20override: true});
      var changeCampaignJournalFolderDetected8 = false;
      on('change:campaign:_journalfolder', function(){
        changeCampaignJournalFolderDetected8 = true;
      });
      expect(changeCampaignJournalFolderDetected8).to.equal(false);
      MOCK20moveBeforeFolderItem(character, character.id);
      expect(changeCampaignJournalFolderDetected8).to.equal(false);
      MOCK20moveBeforeFolderItem(handout, handout.id);
      expect(changeCampaignJournalFolderDetected8).to.equal(false);
      MOCK20moveBeforeFolderItem(folder, folder.id);
      expect(changeCampaignJournalFolderDetected8).to.equal(false);
    });
  });
  describe('MOCK20moveToPlaylist()', function(){
    it('should be unable to move a playlist inside of a playlist', function(){
      var playlist = createObj('playlist', {}, {MOCK20override: true});
      var subplaylist = createObj('playlist', {}, {MOCK20override: true});
      var jukeboxtrack = createObj('jukeboxtrack', {}, {MOCK20override: true});
      var changeCampaignJukeboxFolderDetected4 = false;
      on('change:campaign:_jukeboxfolder', function(){
        changeCampaignJukeboxFolderDetected4 = true;
      });
      expect(changeCampaignJukeboxFolderDetected4).to.equal(false);
      MOCK20moveToPlaylist(subplaylist, playlist.id);
      expect(changeCampaignJukeboxFolderDetected4).to.equal(false);
      MOCK20moveToPlaylist(jukeboxtrack, playlist.id);
      expect(changeCampaignJukeboxFolderDetected4).to.equal(true);
    });
  });
  describe('MOCK20moveBeforePlaylistItem()', function(){
    it('should be unable to move a playlist inside of a playlist', function(){
      var playlist = createObj('playlist', {}, {MOCK20override: true});
      var subplaylist = createObj('playlist', {}, {MOCK20override: true});
      var jukeboxtrack = createObj('jukeboxtrack', {}, {MOCK20override: true});
      var rootfolder = playlist.constructor.getRootFolder();
      MOCK20moveToPlaylist(jukeboxtrack, playlist.id);
      var changeCampaignJukeboxFolderDetected5 = false;
      on('change:campaign:_jukeboxfolder', function(){
        changeCampaignJukeboxFolderDetected5 = true;
      });
      expect(changeCampaignJukeboxFolderDetected5).to.equal(false);
      MOCK20moveBeforePlaylistItem(subplaylist, jukeboxtrack.id);
      expect(changeCampaignJukeboxFolderDetected5).to.equal(false);
      MOCK20moveBeforePlaylistItem(subplaylist, playlist.id);
      expect(changeCampaignJukeboxFolderDetected5).to.equal(true);
    });
  });
});

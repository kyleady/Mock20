var expect = require('chai').expect;
var createObj = require('./../../Functions/API_Objects/CreateObj');
var getObj = require('./../../Functions/API_Objects/GetObj');
var MOCK20moveToFolder = require('./../../Functions/Mock20_Setup/FolderStructure').MOCK20moveToFolder;
var on = require('./../../Functions/API_Events/On');
describe('folders', function(){
  it('should be created with a MOCK20override', function(){
    var folder = createObj('folder', {n: "Test Folder1"}, {MOCK20override: true});
    expect(folder.get('_type')).to.equal('folder');
  });
  it('should get() and set() n, _i, _id, _type like normal roll20 objects', function(){
    var folder = createObj('folder', {n: "Test Folder2"}, {MOCK20override: true});
    folder.set('n', 'new test folder');
    expect(folder.get('n')).to.equal('new test folder');
    expect(folder.id).to.equal(folder.get('_id'));
    expect(folder.get('_type')).to.equal('folder');
    expect(folder.get('_i')).to.be.empty;
  });
  it('should trigger \'change:campaign:_journalfolder\' and \'add:folder\'', function(){
    var changeCampaignJournalFolderDetected = false;
    var addFolderDetected = false;
    on('change:campaign:_journalfolder', function(){
      changeCampaignJournalFolderDetected = true;
    });
    on('add:folder', function(){
      addFolderDetected = true;
    });
    expect(changeCampaignJournalFolderDetected).to.equal(false);
    expect(addFolderDetected).to.equal(false);
    var folder = createObj('folder', {n: "Test Folder3"}, {MOCK20override: true});
    expect(changeCampaignJournalFolderDetected).to.equal(true);
    expect(addFolderDetected).to.equal(true);
  });
  it('should trigger \'change:campaign:_journalfolder\' and \'change:folder\'', function(){
    var folder = createObj('folder', {n: "Test Folder4"}, {MOCK20override: true});
    var changeCampaignJournalFolderDetected2 = false;
    var changeFolderDetected = false;
    on('change:campaign:_journalfolder', function(){
      changeCampaignJournalFolderDetected2 = true;
    });
    on('change:folder', function(){
      changeFolderDetected = true;
    });
    expect(changeCampaignJournalFolderDetected2).to.equal(false);
    expect(changeFolderDetected).to.equal(false);
    folder.set('n', 'new test folder2');
    expect(changeCampaignJournalFolderDetected2).to.equal(true);
    expect(changeFolderDetected).to.equal(true);
  });
  it('should trigger \'change:campaign:_journalfolder\' and \'destroy:folder\'', function(){
    var folder = createObj('folder', {n: "Test Folder5"}, {MOCK20override: true});
    var changeCampaignJournalFolderDetected3 = false;
    var destroyFolderDetected = false;
    on('change:campaign:_journalfolder', function(){
      changeCampaignJournalFolderDetected3 = true;
    });
    on('destroy:folder', function(){
      destroyFolderDetected = true;
    });
    expect(changeCampaignJournalFolderDetected3).to.equal(false);
    expect(destroyFolderDetected).to.equal(false);
    folder.remove({MOCK20override: true});
    expect(changeCampaignJournalFolderDetected3).to.equal(true);
    expect(destroyFolderDetected).to.equal(true);
  });
  it('should remove all subfolders and move all other contained items to the root folder when removed', function(){
    var folder = createObj('folder', {}, {MOCK20override: true});
    var folder2 = createObj('folder', {}, {MOCK20override: true});
    var subfolder = createObj('folder', {}, {MOCK20override: true});
    var subsubfolder = createObj('folder', {}, {MOCK20override: true});
    var handout = createObj('handout', {});
    var character = createObj('character', {});
    var handout2 = createObj('handout', {});
    var character2 = createObj('character', {});
    MOCK20moveToFolder(subfolder, folder.id);
    MOCK20moveToFolder(subsubfolder, subfolder.id);
    MOCK20moveToFolder(handout, folder.id);
    MOCK20moveToFolder(handout2, subfolder.id);
    MOCK20moveToFolder(character, subsubfolder.id);
    MOCK20moveToFolder(character2, folder2.id);
    var rootfolder = folder.constructor.getRootFolder();
    expect(rootfolder.findItem(handout.id)).to.equal(folder.id);
    expect(rootfolder.findItem(handout2.id)).to.equal(subfolder.id);
    expect(rootfolder.findItem(character.id)).to.equal(subsubfolder.id);
    expect(rootfolder.findItem(character2.id)).to.equal(folder2.id);
    expect(rootfolder.findItem(folder.id)).to.equal('root_folder');
    expect(rootfolder.findItem(folder2.id)).to.equal('root_folder');
    expect(rootfolder.findItem(subfolder.id)).to.equal(folder.id);
    expect(rootfolder.findItem(subsubfolder.id)).to.equal(subfolder.id);
    folder.remove({MOCK20override: true});
    rootfolder = folder.constructor.getRootFolder();
    expect(rootfolder.findItem(handout.id)).to.equal('root_folder');
    expect(rootfolder.findItem(handout2.id)).to.equal('root_folder');
    expect(rootfolder.findItem(character.id)).to.equal('root_folder');
    expect(rootfolder.findItem(character2.id)).to.equal(folder2.id);
    expect(rootfolder.findItem(folder.id)).to.be.undefined;
    expect(rootfolder.findItem(folder2.id)).to.equal('root_folder');
    expect(rootfolder.findItem(subfolder.id)).to.be.undefined;
    expect(rootfolder.findItem(subsubfolder.id)).to.be.undefined;
    expect(getObj('folder', folder.id, {MOCK20override: true})).to.be.undefined;
    expect(getObj('folder', subfolder.id, {MOCK20override: true})).to.be.undefined;
    expect(getObj('folder', subsubfolder.id, {MOCK20override: true})).to.be.undefined;
    expect(getObj('folder', folder2.id, {MOCK20override: true})).to.not.be.undefined;
  });
});

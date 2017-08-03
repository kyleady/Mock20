var names = [
  'ability',
  'attribute',
  'card',
  'character',
  'deck',
  'folder',
  'graphic',
  'hand',
  'handout',
  'jukeboxtrack',
  'macro',
  'page',
  'path',
  'player',
  'playlist',
  'rollabletable',
  'tableitem',
  'text'
];

for (var name of names) {
  module.exports[name] = require('./Mock20_' + name);
}

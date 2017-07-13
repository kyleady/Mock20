var names = [
  'ability',
  'attribute',
  'card',
  'character',
  'deck',
  'graphic',
  'hand',
  'handout',
  'jukeboxtrack',
  'macro',
  'page',
  'path',
  'player',
  'rollabletable',
  'tableitem',
  'text'
];

for(var i = 0; i < names.length; i++){
  exports['Mock20_' + names[i]] = require('./Objects/Mock20_' + names[i]);
}

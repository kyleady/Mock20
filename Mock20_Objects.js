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

for(var name of names){
  module.exports[name] = require('./Objects/Mock20_' + name);
}

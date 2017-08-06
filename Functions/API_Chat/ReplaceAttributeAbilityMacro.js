var findObjs = require('./../API_Objects/FindObjs');

module.exports = function (content, isAPI) {
  var replaced = true;
  for (var i = 0; replaced; i++) {
    replaced = false;
    content = content.replace(/(@|%)\{([^\{\}\|]+)\|([^\{\}\|]+)\}/g,
    function (match, indicator, characterName, objName) {
      var type = (indicator == '@') ? 'attribute' : 'ability';
      var characters = findObjs(
        { _type: 'character', name: characterName },
        { caseInsensitive: true }
      );

      if (!characters || characters.length == 0) {
        MOCK20error('No character was found for \'' + characterName + '\'');
        return characterName + '|' + objName;
      }

      var objs = findObjs(
        { _type: type, name: objName, _characterid: characters[0].id },
        { caseInsensitive: true }
      );

      if (!objs || objs.length == 0) {
        MOCK20error('No ' + type + ' was found for ' + match);
        return characterName + '|' + objName;
      }

      replaced = true;
      if (type == 'attribute') {
        return objs[0].get('current');
      } else {
        return objs[0].get('action');
      }
    });

    if (!isAPI) {
      content = content.replace(/#(\S+)/g, function (match, macroName) {
        var objs = findObjs({ _type: 'macro', name: macroName });
        if (!objs || objs.length == 0) return match;
        replaced = true;
        return objs[0].get('action');
      });
    }

    if (i > 1000) throw 'Ran over 1,000 iterations of replacing Macros, Abilities, and Attributes.';
  }

  return content;
};

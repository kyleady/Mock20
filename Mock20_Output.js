global.MOCK20warning = function (msg, options) {
  MOCK20log(msg, options, 'WARNING');
};

global.MOCK20error = function (content) {
  if (typeof content == 'object') content = content.content;
  var msg = {
    who: 'error',
    type: 'error',
    content: content
  };
  MOCK20log(JSON.stringify(msg), {}, 'ROLL20 CHAT');
};

global.MOCK20log = function (msg, options, speakingAs) {
  if (speakingAs) {
    console.log(speakingAs + ': ' + msg);
  } else {
    console.log(msg);
  }
};

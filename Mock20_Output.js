global.MOCK20warning = function (msg, options) {
  if(false){
    MOCK20log(msg, options, 'WARNING');
  }
};

global.MOCK20log = function (msg, options, speakingAs) {
  if (speakingAs) {
    console.log(speakingAs + ': ' + msg);
  } else {
    console.log(msg);
  }
};

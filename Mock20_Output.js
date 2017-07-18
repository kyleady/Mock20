global.Mock20_warning = function(msg, options){
  Mock20_log(msg, options, "WARNING");
}

global.Mock20_log = function(msg, options, speakingAs){
  if(speakingAs){
    console.log(speakingAs + ": " + msg);
  } else {
    console.log(msg);
  }
}

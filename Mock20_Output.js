global.Mock20_warning = function(msg, options){
  Mock20_log(msg, options, "WARNING");
}

global.Mock20_log = function(msg, options, speakingAs){
  var output = "";
  if(speakingAs){
    output += speakingAs + ": ";
  }
  console.log(output + msg);
}

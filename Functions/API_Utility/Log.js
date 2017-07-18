require("./../../Mock20_Output");
module.exports = function(msg){
  if(typeof msg == 'object' && typeof msg.Mock20_data == 'object'){
    msg = JSON.stringify(msg.Mock20_data);
  }
  Mock20_log(msg);
}

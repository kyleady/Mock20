require('./../../Mock20_Output');
module.exports = function (msg) {
  if (typeof msg == 'object' && typeof msg.MOCK20data == 'object') {
    msg = JSON.stringify(msg.MOCK20data);
  }

  MOCK20log(msg);
};

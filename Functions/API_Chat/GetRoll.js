var getRoll = function (msg) {
  msg.origRoll = msg.content;
  msg.content = {};

  return msg;
};

module.exports = getRoll;

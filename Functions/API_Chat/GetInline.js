var getInline = function (msg) {
  var counter = 0;
  while (true) {
    var inlineroll = getDeepestInline(msg.content);
    if (inlineroll) {
      var oldContent = msg.content;
      msg.content = oldContent.substring(0, inlineroll.start);
      msg.content += '$[[' + counter + ']]';
      msg.content += oldContent.substring(inlineroll.end + 1);
      msg.inlinerolls = msg.inlinerolls || [];
      msg.inlinerolls.push({expression: inlineroll.text});
      counter++;
    } else {
      break;
    }
  }

  return msg;
};

var getDeepestInline = function (content) {
  var inline = undefined;
  content = content.replace(/\$\[\[(\d+)\]\]/g, '$$(($1))');
  content.replace(/\[\[([^\]\[]+)\]\]/, function (match, p1, offset, string) {
    inline = {
      start: offset,
      text: p1,
      end: offset + p1.length + 3
    };

    inline.text = inline.text.replace(/\$\(\((\d+)\)\)/g, '$$[[$1]]');
  });

  return inline;
};

module.exports = getInline;

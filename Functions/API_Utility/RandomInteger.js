require('./../../Mock20_Output');
module.exports = function (max) {
  if (typeof max == 'string') max.replace(/^-?\d+\.?\d*$/, function (match) {
    max = Number(max);
  });

  if (typeof max != 'number') {
    MOCK20warning('randomInteger() requires a number.');
    return null;
  }

  if (max == 0) return NaN;
  if (max < 0) throw 'randomInteger() requires a positive number';
  max = Math.floor(max);
  return Math.floor(Math.random() * max) + 1;
};

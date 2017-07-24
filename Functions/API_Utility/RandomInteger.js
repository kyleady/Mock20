module.exports = function (max) {
  if (typeof max != 'number' || max < 1) {
    MOCK20warning('randomInteger() requires a valid number.');
    return undefined;
  }

  max = Math.floor(max);
  return Math.floor(Math.random() * max) + 1;
};

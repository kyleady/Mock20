module.exports = function(max){
  if(typeof max != 'number' || max < 1){
    Mock20_warning("randomInteger() requires a valid number.");
    return;
  }
  max = Math.floor(max);
  return Math.floor(Math.random() * max) + 1;
}

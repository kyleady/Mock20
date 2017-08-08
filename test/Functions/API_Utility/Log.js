var expect = require('chai').expect;
var log = require('./../../../Functions/API_Utility/Log');
var createObj = require('./../../../Functions/API_Objects/CreateObj');
describe('log()', function(){
  it('should be a function', function(){
    expect(log).to.be.a('function');
  });
  it('should stringify the data of MOCK20objects', function(){
    function getLogMessage(f, input) {
      var oldLog = console.log;
      var message = false;
      console.log = function(s) {
        message = s;
      };
      f(input);

      console.log = oldLog;
      return message;
    }
    var character = createObj('character', {});
    var data = getLogMessage(log, character);
    expect(data).to.equal(JSON.stringify(character.MOCK20data));
  });
});

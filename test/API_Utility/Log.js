var expect = require('chai').expect;
var log = require('./../../Functions/API_Utility/Log');
describe('log()', function(){
  it('should be a function', function(){
    expect(log).to.be.a('function');
  });
});

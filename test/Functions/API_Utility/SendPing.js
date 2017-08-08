var expect = require('chai').expect;
require('./../../../index');
describe('sendPing()', function(){
  it('should be a function', function(){
    expect(sendPing).to.be.a('function');
  });
});

var expect = require('chai').expect;
var sendPing = require('./../../../Functions/API_Utility/SendPing');
describe('sendPing()', function(){
  it('should be a function', function(){
    expect(sendPing).to.be.a('function');
  });
});

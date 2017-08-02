var expect = require('chai').expect;
var Campaign = require('./../../../Functions/API_Objects/Campaign');
describe('Campaign()', function(){
  it('should have the root id', function(){
    expect(Campaign().id).to.equal('root');
  });
  it('should have the _type \"campaign\"', function(){
    expect(Campaign().get("_type")).to.equal('campaign');
  });
  it('should not be able to set() _journalfolder', function(){
    expect(Campaign().set('_journalfolder', 'artificial structure')).to.be.an('undefined');
  });
  it('should not have a turnorder property', function(){
    expect(Campaign()).to.not.have.property('turnorder');
  });
});

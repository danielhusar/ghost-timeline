(function(){

  var portfolio = new TSB.modules.portfolio();

  describe('portfolio', function() {

    describe('Globals', function() {
      it('Instance works.', function () {
        portfolio.should.be.a('object');
      });
    });

  });

})();
var expect = chai.expect,
    should = chai.should();


describe('APP', function() {

  describe('Globals', function() {
    it('Libraries tests.', function () {
      $.should.be.a('function');
      $.fn.jquery.should.be.above('2.0');
      Modernizr.should.be.a('object');
    });

    it('Prototypes exists.', function () {
      APP.should.be.a('object');
      APP.device.should.be.a('object');
      APP.isDevice.should.be.a('function');
      APP.log.should.be.a('function');
      APP.prefix.should.be.a('function');
      APP.fmt.should.be.a('function');
    });

    it('FMT is working.', function () {
      APP.fmt("test%@1%@2", 1, 2).should.equal('test12');
    });
  });

  describe('Settings', function() {
    it('We should be on development environment.', function () {
      APP.settings.environment.isProduction.should.equal(false);
    });
    it('We should be using large version.', function () {
      //we run it through browser
      if(window.outerWidth > 1) { 
        APP.settings.environment.device.should.equal('large');
      //we run it through grunt
      } else { 
        APP.settings.environment.device.should.equal('small');
      }
    });
  })


  describe('Events', function() {
    it('Events object exists.', function () {
      APP.events.should.be.a('object');
    });
  });

  describe('Modules', function() {
    it('Modules object exists.', function () {
      APP.modules.should.be.a('object');
    });
  });

});
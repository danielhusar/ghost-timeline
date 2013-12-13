(function(window, document, APP, $, undefined) {
  'use strict';

  //all init triggers
  APP.init = function() {

    //log the versions of libraries
    APP.events.logs();

    //store device
    APP.settings.environment.device = APP.events.getDevice();

    //mobile inits
    APP.isDevice('small', function() {
      APP.log('%c small version', APP.settings.console.css);
    });

    //tablet inits
    APP.isDevice('medium', function() {
      APP.log('%c medium version', APP.settings.console.css);
    });

    //desktop inits
    APP.isDevice('large', function() {
      APP.log('%c large version', APP.settings.console.css);
    });


    //global inits
    APP.events.lazyLoad();

    //page custom inits

    //Homepage
    APP.page('home', function() {
      //APP.instances.myModule = new APP.modules.myModule();
    });

  };

  //initial init
  APP.init();

})(this, this.document, this.APP, this.jQuery);

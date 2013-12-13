(function(window, document, APP, $, undefined) {
  'use strict';

  APP.settings = {
    environment: {
      isProduction: false,
      device: 'small' //device, can be: desktop, tablet, mobile. The version is set up on init, but mobile is default.
    },
    console: {
      css: 'color: #7E7E7E; font-style: italic;'
    }
  };

})(this, this.document, this.APP, this.jQuery);

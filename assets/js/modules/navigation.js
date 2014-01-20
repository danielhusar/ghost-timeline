(function(window, document, APP, $, undefined) {
  'use strict';

  /**
   * Main module class
   * @param  {object} settings Settings object that will rewite the defaults
   */
  var module = function(settings) {

    var defaults = {
      homeTitle  : "ghost",
      homeEmpty: true,
      cache : {},
      homeUrl : '/'
    };

    //properties
    this.settings = $.extend(defaults, settings);

    //methods
    this.pagination();
    this.singlePost();
    this.fixPostPosition();
    this.returnBack();
    this.removeDuplicateDates();
    this.fixNav();

    if($('body').hasClass('home-template') || $('body').hasClass('archive-template')){
      this.settings.homeUrl = window.location.pathname;
      this.settings.homeEmpty = false;
    }

  };

  /**
   * All jquery bindings
   * @return {void}
   */
  module.prototype.removeDuplicateDates = function() {
    var that = this,
        time = '';
    $('[data-post="preview"]').each(function(){
      var $this = $(this),
          $time = $this.find('[data-post="meta"]');
      if( $time.text() == time ){
        $time.addClass('hidden');
      }else{
        time = $time.text();
        $this.addClass('separator');
      }
    });
  };


  /**
   * Paginate the posts by ajax
   * @return {void}
   */
  module.prototype.pagination = function(){
    var that = this,
        cache = that.settings.cache;
    $('[data-wrap="posts"]').on('click.app', '[data-post="pagination"] a', function(e){
      e.preventDefault();
      if(!$(this).hasClass('disabled')){
        var href = $(this).attr('href');
        if(window.history && !!window.history.pushState){
          window.history.pushState('', '', href);
        }
        that.settings.homeUrl = href;
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('body').addClass('out');

        if(cache[href]){
          that.processPosts(cache[href]);
        }else{
          $.ajax({
            url: href,
            success: function(data){
              cache[href] = data;
              that.processPosts(data);
            }
          });
        }
      }
    });
  };


  /**
   * Show single post by ajax call
   * @return {vid}
   */
  module.prototype.singlePost = function(){
    var that = this,
        cache = that.settings.cache;
    $('[data-wrap="posts"]').on('click.app', '[data-posts] [data-post="url"]', function(e){
      e.preventDefault();
      var $this = $(this),
          href = $this.attr('href');
      if(window.history && !!window.history.pushState){
        window.history.pushState('', '', href);
        document.title = $this.text();
      }
      that.settings.homePageUrl = href;
      $("html, body").animate({ scrollTop: 0 }, "slow");
      $('body').addClass('post-template');

      if(cache[href]){
        that.processPost(cache[href]);
      }else{
        $.ajax({
          url: href,
          success: function(data){
            cache[href] = data;
            that.processPost(data);
          }
        });
      }
    });
  };


  /**
   * Process single post
   * @param  {string} data from the ajax call or cache
   * @return {void}
   */
  module.prototype.processPost = function(data){
    var $data = $(data).find('[data-post="content"]');
    $('[data-wrap="post"]').html($data);
    setTimeout(function(){
      $('body').addClass('posts-hidden');
    }, 1000);
  };


  /**
   * Process the paginating posts
   * @param  {string} data from the ajax call or cache
   * @return {void}
   */
  module.prototype.processPosts = function(data){
    var that = this,
        $data = $(data),
        $posts = $(data).find('[data-posts]'),
        process;

    process = function(){
      $('[data-posts]').html($posts.html());
      $('[data-post="pagination"]').html($data.find('.pagination').parent().html());
      that.fixNav();
      if(APP.settings.environment.device !== 'small'){
        that.removeDuplicateDates();
      }
      setTimeout(function(){
        $('body').removeClass('out');
      }, 1000);
    };

    if((APP.settings.environment.device !== 'small') && Modernizr.csstransitions){
      $('body').on(APP.prefix('transitionEnd'), function(){
        process(data);
      });
    }else{
      process(data);
    }
  };

  /**
   * Return back to all posts pagination from single post
   * @return {void}
   */
  module.prototype.returnBack = function(){
    var that = this,
        settings = this.settings;
    $('[data-wrap="post"]').on('click.app', '[data-post="back"]', function(e){
      e.preventDefault();

      if(settings.homeEmpty){
        $.ajax({
          url: settings.homeUrl,
          success: function(data){
            settings.cache[settings.homeUrl] = data;
            $('[data-wrap="posts"]').html( $(data).find('[data-wrap="posts"]').html() );
            that.removeDuplicateDates();
            that.fixNav();
            $('body').removeClass('post-template');
            setTimeout(function(){
              $('body').removeClass('posts-hidden');
            }, 1000);
          }
        });
      }else{
        $('body').removeClass('post-template');
        setTimeout(function(){
          $('body').removeClass('posts-hidden');
        }, 1000);
      }
      if(window.history && !!window.history.pushState){
        window.history.pushState('', '', settings.homeUrl);
      }

    });
  };

  /**
   * Fix the single post position
   * @return {void}
   */
  module.prototype.fixPostPosition = function(){
    var $post = $('[data-wrap="posts"] [data-post="content"]');
    if($post.length !== 0){
      $('[data-wrap="post"]').html( $post );
      $('[data-wrap="posts"]').html(' empty ');
      setTimeout(function(){
        //$('body').addClass('posts-hidden');
      }, 1000);
    }
  };


  /**
   * Fix the nav
   * @return {void}
   */
  module.prototype.fixNav = function(){
    if($('.newer-posts').length === 0){
      $('.pagination').prepend('<a href="#" class="newer-posts disabled">&nbsp;</a>');
    }
    if($('.older-posts').length === 0){
      $('.pagination').append('<a href="#" class="older-posts disabled">&nbsp;</a>');
    }
    $('.newer-posts').html('<i class="fa-angle-left"></i>');
    $('.older-posts').html('<i class="fa-angle-right"></i>');
  };

  //add our module
  APP.modules.navigation = module;

})(this, this.document, this.APP, this.jQuery);

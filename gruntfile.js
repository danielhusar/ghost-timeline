module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Concat files
    concat: {
      options: {
        separator: '\r\n;'
      },
      app: {
        src: ['public/js/libraries/polyfills.js', 'public/js/app/global.js', 'public/js/app/settings.js', 'public/js/app/promises.js', 'public/js/app/events.js', 'public/js/app/validation.js', 'public/js/modules/*.js', 'public/js/app/init.js'],
        dest: 'public/js/app.js'
      },
      plugins: {
        src: ['public/js/plugins/*.js'],
        dest: 'public/js/plugins.js'
      }
    },

    //Uglify files
    uglify: {
      dist: {
        src: ['public/js/*.js', '!public/js/*.min.js'], // source files mask
        dest: 'public/js/', // destination folder
        expand: true, // allow dynamic building
        flatten: true, // remove all unnecessary nesting
        ext: '.min.js' // replace .js to .min.js
      }
    },

    //Lint only app files
    jshint: {
      files: ['<%= concat.app.src %>', 'gruntfile.js', 'package.json', '!public/js/libraries/polyfills.js']
    },

    //ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
    eslint: {
      options: {
        config: 'eslint.json'
      },
      target: ['<%= concat.app.src %>', '!public/js/libraries/polyfills.js']
    },

    //Less compiler
    less: {
      development: {
        files: {
          "public/css/style.css": "less/style.less",
          "public/css/IE.css": "less/IE.less"
        }
      },
      production: {
        options: {
          yuicompress: true,
          dumpLineNumbers: 'comments'
        },
        files: {
          "public/css/style.min.css": "less/style.less",
          "public/css/IE.min.css": "less/IE.less"
        }
      }
    },

    //Watch task for less and templates changes
    watch: {
      tpl: {
        files: ['templates/*.tpl', 'templates/**/*.tpl', 'templates/**/**/*.tpl'],
        tasks: ['swig']
      },
      less: {
        files: ['less/*.less', 'less/**/*.less', 'less/**/**/*.less', 'less/**/**/**/*.less'],
        tasks: ['less:development']
      }
    },

    //Tests
    mocha: {
      all: {
        src: 'test/index.html',
        options: {
          run: true,
          reporter: 'Spec'
        }
      }
    },

    //Reports
    plato: {
      main: {
        files: {
          'reports': ['<%= jshint.files %>']
        }
      }
    },

    //Beautify javascript
    jsbeautifier: {
      files: ['<%= jshint.files %>'],
      options: {
        js: {
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false
        }
      }
    },

    //Generate all templates
    swig: {
      development: {
        init: {
          root: "templates",
          allowErrors: false,
          autoescape: true
        },
        dest: "public/",
        cwd: "templates",
        src: ['*.tpl', '!_*.tpl'],
        generateSitemap: false,
        generateRobotstxt: false,
        production: false,
      }
    },

    //Create screenshots
    localscreenshots: {
      options: {
        path: 'screenshots',
        type: 'png',
        local: {
          path: 'public',
          port: 3000
        },
        viewport: ['320x480', '768x1024', '1025x1025']
      },
      src: ['public/*.html']
    },


    //Switching between prod and dev environment
    'string-replace': {
      prod: {
        files: {
          './': ['public/js/app/settings.js', 'templates/base/_variables.tpl']
        },
        options: {
          replacements: [{
            pattern: 'isProduction: false',
            replacement: 'isProduction: true'
          }, {
            pattern: 'isProduction = false',
            replacement: 'isProduction = true'
          }]
        }
      },
      dev: {
        files: {
          './': ['public/js/app/settings.js', 'templates/base/_variables.tpl']
        },
        options: {
          replacements: [{
            pattern: 'isProduction: true',
            replacement: 'isProduction: false'
          }, {
            pattern: 'isProduction = true',
            replacement: 'isProduction = false'
          }]
        }
      }
    },

    //Start local webserver
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'public'
        }
      }
    },

    //Open chrome
    open: {
      dev: {
        path: 'http://localhost:<%= connect.server.options.port %>/',
        app: 'Google Chrome'
      }
    },

    //Generate sprites
    sprite: {
      all: {
        src: ['public/img/icons/*.png',
          'public/img/icons/*.jpg',
          'public/img/icons/*.gif'
        ], // Sprite files to read in
        destImg: 'public/img/sprite.png', // Location to output spritesheet
        destCSS: 'less/base/components/_icons.less', // Less with variables under sprite names
        imgPath: '../img/sprite.png', // Manual override for imgPath specified in CSS
        algorithm: 'binary-tree', // Specify algorithm (top-down, left-right, diagonal [\ format], alt-diagonal [/ format], binary-tree [best packing])
        padding: 1, // Specify padding between images
        engine: 'phantomjs', // Specify engine (auto, phantomjs, canvas, gm)
        cssFormat: 'css', // (stylus, scss, sass, less, json, jsonArray, css)
        engineOpts: {
          imagemagick: true // Specify settings for engine
        },
        imgOpts: { // Specify img options
          format: 'png',
          quality: 90
        },
        cssOpts: { // Specify css options
          functions: false,
          cssClass: function(item) {
            return '.icon-' + item.name;
          }
        }
      }
    },

    //reduce size of all images
    imagemin: {
      dynamic: {
        files: [{
          expand: true, // Enable dynamic expansion
          optimizationLevel: 5,
          cwd: 'public/img', // Src matches are relative to this path
          src: ['*.{png,jpg,gif}'], // Actual patterns to match
          dest: 'public/img' // Destination path prefix
        }]
      }
    }

  });

  //Dependencies
  require('load-grunt-tasks')(grunt);

  //Tasks
  grunt.registerTask('default', ['concat', 'uglify', 'swig', 'sprites', 'image', 'less']);

  grunt.registerTask('packjs', ['concat', 'uglify']);
  grunt.registerTask('reports', ['plato']);
  grunt.registerTask('beauty', ['jsbeautifier']);
  grunt.registerTask('screens', ['localscreenshots']);
  grunt.registerTask('tpl', ['swig']);

  grunt.registerTask('css', ['less']);
  grunt.registerTask('sprites', ['sprite']);
  grunt.registerTask('image', ['imagemin']);
  grunt.registerTask('test', ['mocha']);
  grunt.registerTask('hint', ['jshint', 'eslint']);
  grunt.registerTask('server', ['connect', 'open', 'watch']);
  grunt.registerTask('prod', ['string-replace:prod', 'default']);
  grunt.registerTask('dev', ['string-replace:dev', 'default']);

  return grunt;

};

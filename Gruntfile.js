module.exports = grunt => {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    browserify: {
      scripts: {
        src: [
          'assets/_app/javascripts/app.js'
        ],
        dest: 'assets/scripts.js',
        options: {
          transform: [
            ['babelify', { 'presets': ['es2015'], 'plugins': ['transform-runtime'] }]
          ]
        }
      }
    },
    concat: {
      vendorScripts: {
        src: [
          'assets/_app/javascripts/vendor/*.js'
        ],
        dest: 'assets/scripts-vendor.js',
      }
    },
    watch: {
      vendorScripts: {
        files: 'assets/_app/javascripts/vendor/**/*.js',
        tasks: ['concat:vendorScripts'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: 'assets/_app/javascripts/**/*.js',
        tasks: ['browserify:scripts'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: 'assets/_app/css/**/*',
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'assets/styles.css': 'assets/styles.css'
        }
      }
    },
    sass: {
      default: {
        options : {
          sourcemap: 'none',
          //lineNumbers: true,
          style: 'compressed',
          cacheLocation: 'assets/_app/.sass-cache/'
        },
        files: {
          'assets/styles.css': 'assets/_app/css/styles.scss',
          'snippets/critical.liquid': 'assets/_app/css/critical.scss'
        }
      }
    },
    uglify: {
      options: {
        screwIE8: true,
        mangle: false,
        preserveComments: /^!|@preserve|@license|@cc_on|\/\*\!/i
      },
      default: {
        files: {
          'assets/scripts.js': 'assets/scripts.js',
          'assets/scripts-vendor.js': 'assets/scripts-vendor.js'
        }
      }
    },
    cssmin: {
      options: {
        advanced: false,
        aggressiveMerging: false,
        roundingPrecision: -1,
        shorthandCompacting: false
      },
      default: {
        files: {
          'assets/styles.css': 'assets/styles.css'
        }
      }
    }
  });
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('release', ['browserify:scripts', 'concat:vendorScripts', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
};

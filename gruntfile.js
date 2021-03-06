module.exports = function(grunt) {

  var ts_config = {
    module: 'amd', //or commonjs
    target: 'es5', //or es3
    basePath: 'app/scripts/',
    sourceMap: true,
    declaration: true
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // grunt watch config
    watch: {
      scripts: {
        files: [
          'app/scripts/**/*.js',
          'app/scripts/**/*.jsx'
        ],
        tasks: ['browserify'],
        options: {
          spawn: false,
          livereload: true
        },
      },

      styles: {
        files: [
          'app/style/**/*.sass',
          'app/style/**/*.scss'
        ],
        tasks: ['compass:dist'],
        options: {
          spawn: false,
          livereload: true
        },
      },

      html: {
        files: [
          'app/*.jade',
          'app/views/**/*.jade'
        ],
        tasks: ['jade'],
        options: {
          spawn: false,
          livereload: true
        },
      }
    },

    connect: {
      server: {
        options: {
          port: 8080,
          hostname: '127.0.0.1',
          keepalive: true,
          base: 'site',
          livereload: true
        }
      }
    },

    compass: {
      dist: {
        options: {
          importPath: [
            'app/style/bootstrap/'
          ],
          fontsDir: 'app/resources/fonts',
          httpFontsDir: 'curriculum-vitae/resources/fonts',
          sassDir: 'app/style',
          cssDir: 'site/style',
        }
      }
    },

    jade: {
      dist: {
        options: {
          data: {
            debug: false
          }
        },

        files: [{
          expand: true,
          src: ["*.jade", "views/**/*.jade"],
          dest: "site/",
          cwd: "app/",
          ext: '.html'
        }]
      }
    },

    copy: {
      resources: {
        files: [{
          expand: true,
          src: ['**/*'],
          cwd: 'app/resources',
          dest: 'site/resources'
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ['index.html', 'views/**/*.html'],
          cwd: 'app/',
          dest: 'site/'
        }]
      }
    },

    browserify: {
      client: {
        src: ['app/scripts/main.js'],
        dest: 'site/scripts/main.js'
      }
    },

    compress: {
      main: {
        options: {
          archive: 'cgkv-client.tgz'
        },
        files : [
          {
            expand: true,
            cwd: 'site',
            src: [
              'images/**/*',
              'style/**/*.css',
              'style/fonts/**/*',
              'views/**/*',
              'index.html',
              'scripts/Main.js',
            ]
          }
        ]
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', [
    'compass:dist',
    'jade',
    'browserify',
    'copy'
  ]);

};

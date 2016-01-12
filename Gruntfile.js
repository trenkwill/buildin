module.exports = function(grunt) {
  
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
  
    pkg: grunt.file.readJSON('package.json'),

    sass: {
        dist: {
          files: {
            '_css/main.css': '_sass/main.scss'
          }
        }
    },
    svgmin: {
        dist: {
            options: {
                plugins: [
                    // Don't remove XML declaration (needed to avoid errors creating PNG on Win 7)
                    { removeXMLProcInst: false }
                ]
            },
            files: [{
                expand: true,
                cwd: 'images/',
                src: ['*.svg'],
                dest: 'images/svg-optimized/'
            }]
        }
    },
    grunticon: {
        myIcons: {
            files: [{
                expand: true,
                cwd: 'images/svg-optimized/',
                src: ['*.svg', '*.png'],
                dest: "grunticon/"
            }],
            options: {
                enhanceSVG: true,
                loadersnippet: "grunticon.loader.js"
            }
        }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['scripts/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      lib: {
        src: 'scripts/lib.js',
        dest: 'scripts/lib.min.js'
      },
      main: {
        src: 'scripts/main.js',
        dest: 'scripts/main.min.js'
      }
    },
    watch: {
      options: { livereload: true },
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
      },
      html: {
        files: '**/*.html'
      },
      js: {
        files: '**/main.js'
      },
      configFiles: {
          files: 'Gruntfile.js',
          options: {
            reload: true
          }
        }
    },
    wiredep: {
      task: {
        src: [
          '_includes/head.html',
          '/styles/styles.scss'
        ]
      }
    },
    shell: {
        jekyllBuild: {
            command: 'jekyll build'
        },
        jekyllServe: {
            command: 'jekyll serve --baseurl ""'
        }
    },
    // run tasks in parallel
    concurrent: {
        serve: [
            'watch',
            'bower_concat',
            'uglify',
            'shell:jekyllServe'
        ],
        options: {
            logConcurrentOutput: true
        }
    },
    bower_concat: {
      all: {
        dest: 'scripts/lib.js',
        exclude: [
          'jquery',
          'modernizr',
          'bootstrap-sass'
        ]
      }
    }
  });


  // define the tasks groups

 // Register the grunt serve task
  grunt.registerTask('serve', [
      'concurrent:serve'
  ]);

  // Register the grunt build task
  grunt.registerTask('build', [
      'shell:jekyllBuild',
      'sass'
  ]);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('icons', ['svgmin', 'grunticon:myIcons']);

};
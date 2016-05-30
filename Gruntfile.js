module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('public/package.json'),
    jshint: {
      files: ['public/src/js/**/*.js','!public/src/js/_bower.js']
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'public/src/js/_bower.js',
          'css': 'public/src/scss/_bower.scss'
        },
        mainFiles: {
          bootstrap: [
            'dist/js/bootstrap.js',
            'dist/css/bootstrap.css'
          ]
      },
      dependencies: {
        bootstrap: ["jquery"]
      }
    },
    },
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { 'public/css/app.css': 'public/src/scss/app.scss' }
      },
      compressed: {
        options: { outputStyle: 'compressed' },
        files: { 'public/css/app.min.css': 'public/src/scss/app.scss' }
      }
    },
    concat: {
      dist: {
        src: ['public/src/js/_bower.js', 'public/src/js/app.js', 'public/src/js/**/*.js'],
        dest: 'public/js/app.js'
      }
    },
    uglify: {
      'public/js/app.min.js': 'public/js/app.js'
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['public/src/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true }
      },
      js: {
        files: ['public/src/js/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: { livereload: true }
      },
      index: {
        files: ['index.html'],
        options: { livereload: true }
      }
    },
    replace: {
      production: {
        options: {
          patterns: [{
            match: /app\.js/,
            replacement: 'app.min.js'
          },{
            match: /app\.css/,
            replacement: 'app.min.css'
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['index.html'] }
        ]
      },
      development: {
        options: {
          patterns: [{
            match: /app\.min\.js/,
            replacement: 'app.js'
          },{
            match: /app\.min\.css/,
            replacement: 'app.css'
          }]
        },
        files: [
          { expand: true, flatten: true, src: ['index.html'] }
        ]
      }
    }
  });

  // require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks("grunt-bower-concat");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-sass");

  grunt.registerTask('default', ['jshint','bower_concat', 'sass:expanded', 'concat', 'uglify', 'watch','replace:development']);
  grunt.registerTask('deploy', ['jshint','bower_concat', 'sass:compressed', 'concat', 'uglify', 'replace:production']);
};

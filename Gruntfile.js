module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      lib: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/crypto-js/core.js',
          'node_modules/crypto-js/x64-core.js',
          'node_modules/crypto-js/sha512.js',
          'node_modules/crypto-js/hmac.js',
          'node_modules/q/q.js',
          'node_modules/handjs/hand.js',
          'node_modules/myscript/resources/samples/lib/myscript.js'
        ],
        dest: 'client/dist/lib.js'
      },
      ng: {
        src: ['client/dist/lib.js', 'node_modules/angular/angular.min.js'],
        dest: 'client/dist/lib.js'
      }
    },

    uglify: {
      dist: {
        src: 'client/dist/lib.js',
        dest: 'client/dist/lib.js'
      }
    },

    cssmin: {
      pub: {
        src: 'client/styles/style.css',
        dest: 'client/dist/style.css'
      }
    },

    watch: {
      css: {
        files: 'client/styles/style.css',
        tasks: ['cssmin']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('default', [
    'cssmin', 'concat:lib', 'uglify', 'concat:ng'
  ]);

  grunt.registerTask('csswatch', ['watch']);
};
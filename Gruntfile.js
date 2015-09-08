module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      hzzd: {
        src: [
          'client/app/*.js',
          'client/app/*/*.js',
        ],
        dest: 'client/dist/hzzd.js'
      }
    },

    uglify: {
      myscript: {
        src: 'node_modules/myscript/resources/samples/lib/myscript.js',
        dest: 'client/dist/myscript.js'
      },
      hzzd: {
        src: 'client/dist/hzzd.js',
        dest: 'client/dist/hzzd.js'
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
    'cssmin', 'concat', 'uglify'
  ]);

  grunt.registerTask('csswatch', ['watch']);
};
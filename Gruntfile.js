module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: { 
      bower: {
        src: ["client/bower_components/jquery/dist/jquery.min.js", 
        "client/bower_components/cryptojslib/components/core-min.js",
        "client/bower_components/cryptojslib/components/x64-core-min.js",
        "client/bower_components/cryptojslib/components/sha512-min.js",
        "client/bower_components/cryptojslib/components/hmac-min.js",
        "client/bower_components/q/q.js",
        "client/bower_components/handjs/hand.js",
        "client/bower_components/myscript/dist/myscript.js"],
        dest: 'client/bowerstuff.js'
      }
    },

    uglify: {
      dist: {
        src: 'client/bowerstuff.js',
        dest: 'client/bowerstuff.js'
      }
    },

    cssmin: {
      pub: {
        src: "client/styles/style.css",
        dest: 'client/style-min.css'
      }
    },


  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('default' , [
    'cssmin','concat','uglify'
  ]);
};

module.exports = function(grunt){
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },
  // Riss working up untill here
  jshint: {
    files: ['js/*.js','js/!*.min.js'],
      options: {
        esversion: 6
      }
  },


    // Sophie working up untill here



    // Matt working up untill here
  });

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.registerTask('checkSASS', ['sass']);

// Riss working up untill here


grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.registerTask('checkJS', ['jshint']);

// Sophie working up untill here


// Matt working up untill here

}

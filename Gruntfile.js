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



    // Sophie working up untill here
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('checkSASS', ['sass']);

  // Riss working up untill here



  // Sophie working up untill here


}

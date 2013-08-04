module.exports = function(grunt) {

  grunt.initConfig({
    hogan: {
      publish: {
        options: {
	amdWrapper: true,
          prettify: true,
          defaultName: function(file) {
            return file.substring(file.lastIndexOf('/')+1, file.lastIndexOf('.'));
          }
        },
        files:{
          "administracija/public/scripts/views/templates/compiled.js": ["administracija/public/scripts/views/templates/*.js"]
        }
      }
    }
});

  grunt.loadNpmTasks('grunt-contrib-hogan');



  grunt.registerTask('default', ['hogan']);

};

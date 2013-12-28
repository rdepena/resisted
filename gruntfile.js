module.exports = function (grunt) {
    var path = require('path');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat : {
            options : {
                separator : "\n"
            },
            resisted : {
                src : ['src/*.js'],
                dest : 'public/javascript/resisted/app.js'
            }
        },
        watch: {
            files: [
                'gruntfile.js',
                'src/*.js'
                ],
            tasks: ['jshint', 'clean','concat']
        },
        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    module: true
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    src: [
                        'public/javascript/resisted/*.js'
                    ]
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['jshint', 'clean','concat']);
};
module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify", {presets: ['es2015']}]
                    ]
                },
                files: {
                    "./dist/mspx-vars-frontend.js": ["src_frontend/variableHandler.js"]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");


    grunt.registerTask("build", ["browserify"]);
    grunt.registerTask("default", ["browserify"]);
};
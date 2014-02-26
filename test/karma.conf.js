module.exports = function(config) {
    config.set({
        basePath: '../',

        frameworks: ['jasmine', 'requirejs'],

        files: [
            {pattern: 'src/*.js', included: false},
            {pattern: 'test/*.spec.js', included: false},
            'test/loader.js'
        ]
    });
};

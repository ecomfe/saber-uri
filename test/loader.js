var tests = [];

for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    baseUrl: '/base',

    packages: [
        {
            name: 'saber-lang',
            location: './test/dep/saber-lang/0.2.0/src'
        },
        {
            name: 'saber-uri',
            location: './src'
        }
    ],

    deps: tests,

    callback: window.__karma__.start
});

var tests = [];

for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        tests.push(file);
    }
}

console.log(1);

requirejs.config({
    baseUrl: '/base',

    packages: [
        {
            name: 'saber-uri',
            location: './src'
        }
    ],

    deps: tests,

    callback: window.__karma__.start
});

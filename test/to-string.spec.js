/**
 * @file to-string spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var uri = require('saber-uri');

    describe('.toString', function () {

        it('string param should pass', function () {
            var urlStr = 'www.baidu.com';
            var url = uri(urlStr);

            expect(url.toString()).toEqual(urlStr);
        });

    });

});

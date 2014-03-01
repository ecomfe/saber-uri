/**
 * @file uri spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
   
    var uri = require('saber-uri');

    describe('uri', function () {

        describe('toString', function () {
            
            it('without arguments', function () {
                var urlStr = 'www.baidu.com';
                var url = uri(urlStr);

                expect(url.toString()).toEqual(urlStr);
            });
            
        });

        describe('equal', function () {
            it('with string', function () {
                var url = uri('www.baidu.com');

                expect(url.equal('www.baidu.com')).toBeTruthy();
            });
        });

    });

});

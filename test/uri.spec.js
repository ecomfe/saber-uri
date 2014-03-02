/**
 * @file uri spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
   
    var uri = require('saber-uri');

    describe('uri', function () {

        describe('toString', function () {
            
            it('should return the right string', function () {
                var str = 'www.baidu.com'
                expect(uri(str).toString()).toEqual(str);

                str = 'http://www.baidu.com/search?wd=hello';
                expect(uri(str).toString()).toEqual(str);
            });
            
        });

        describe('equal', function () {
            it('width string should return true when they are the same', function () {
                expect(uri('www.baidu.com?wd=hello#no').equal('www.baidu.com?wd=hello#no')).toBeTruthy();
            });

            it('with string should return fase when they are not the same', function () {
                expect(uri('www.baidu.com?wd=hello#no').equal('www.baidu.com')).toBeFalsy();
            });

            it('width URI object should return true when they are the same', function () {
                var aURI = uri('www.baidu.com?wd=hello#no');
                var bURI = uri('www.baidu.com?wd=hello#no');
                expect(aURI.equal(bURI)).toBeTruthy();
            });

            it('with URI object should return fase when they are not the same', function () {
                var aURI = uri('www.baidu.com?wd=hello#no');
                var bURI = uri('www.baidu.com');
                expect(aURI.equal(bURI)).toBeFalsy();
            });

            it('should not case sensitive about host', function () {
                expect(uri('www.BAIDU.COM').equal('www.baidu.com')).toBeTruthy();
            });

            it('should not case sensitive about scheme', function () {
                expect(uri('HTTps://www.baidu.com').equal('https://www.baidu.com')).toBeTruthy();
            });

            it('should case default port', function () {
                expect(uri('https://www.baidu.com').equal('https://www.baidu.com:443')).toBeTruthy();
            });

            it('should case empty path', function () {
                expect(uri('https://www.baidu.com').equal('https://www.baidu.com/')).toBeTruthy();
            });
        });

    });

});

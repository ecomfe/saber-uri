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

    });

});

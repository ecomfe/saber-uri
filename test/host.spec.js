/**
 * @file host spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var Host = require('saber-uri/component/Host');

    describe('Host', function () {
        
        describe('set', function () {

            it('should not case sensitive', function () {
                var host = new Host();
                host.set('www.Baidu.com');
                expect(host.data).toEqual('www.baidu.com');
            });

        });

        describe('equal', function () {
            it('should not case sensitive', function () {
                var host = new Host('www.baidu.com');

                expect(host.equal('www.baidu.com')).toBeTruthy();
                expect(host.equal('WWW.BAIDU.COM')).toBeTruthy();
            });
        });

    });

});


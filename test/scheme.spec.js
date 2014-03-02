/**
 * @file scheme spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var Scheme = require('saber-uri/component/Scheme');

    describe('Scheme', function () {
        
        describe('set', function () {

            it('should not case sensitive', function () {
                var scheme = new Scheme();
                scheme.set('HTTP');
                expect(scheme.data).toEqual('http');
            });

        });

        describe('equal', function () {
            it('should not case sensitive', function () {
                var scheme = new Scheme('http');

                expect(scheme.equal('http')).toBeTruthy();
                expect(scheme.equal('HTTP')).toBeTruthy();
            });
        });

    });

});

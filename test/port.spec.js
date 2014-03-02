/**
 * @file port spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var Port = require('saber-uri/component/Port');

    describe('Port', function () {

        describe('equal', function () {

            it('should case default port', function () {
                var port = new Port('443');
                expect(port.equal('', 'https')).toBeTruthy();
                expect(port.equal('')).toBeFalsy();
            });

        });

        describe('toString', function () {
            it('should return empty string when had not data', function () {
                var port = new Port();
                expect(port.toString()).toEqual('');
            });
            it('should add prefix when had data', function () {
                var port = new Port('443');
                expect(port.toString()).toEqual(':443');
            });
        });

    });

});

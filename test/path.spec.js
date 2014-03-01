/**
 * @file path spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    
    var Path = require('saber-uri/component/Path');

    describe('Path', function () {

        describe('static resolve', function () {

            it('should handle one arguments', function () {
                expect(Path.resolve('abc/../abd/../../abd/ccc')).toEqual('../abd/ccc');
                expect(Path.resolve('/abc/../abd/../../abd/ccc')).toEqual('/abd/ccc');
            });

            it('should handle two arguments', function () {
                expect(Path.resolve('abc', '../abde')).toEqual('abde');
                expect(Path.resolve('/abc/../abd', '../../abd/ccc')).toEqual('/abd/ccc');
            });

        });

        describe('new', function () {

            it('with argument should pass', function () {
                var path = new Path('abc/dd');
                expect(path.data).toEqual('abc/dd');
            });

            it('without argument will be \'/\'', function () {
                var path = new Path();
                expect(path.data).toEqual('/');
            });

        });

        describe('set', function () {

            it('should pass', function () {
                var path = new Path('abc');
                path.set('ddd/abc');
                expect(path.data).toEqual('ddd/abc');
            });

            it('should resolve argument', function () {
                var path = new Path('abc');
                path.set('ddd/../bde/../abc');
                expect(path.data).toEqual('abc');
            });

            it('without argument will be \'/\'', function () {
                var path = new Path('abc');
                path.set();
                expect(path.data).toEqual('/');
            });

        });

        describe('equal', function () {

            it('should return true when they are same', function () {
                var path = new Path('abc/dd');
                expect(path.equal('abc/dd')).toBeTruthy();
                expect(path.equal('abc/bded/../dd')).toBeTruthy();
            });

            it('should return false when they are not same', function () {
                var path = new Path('abc/dd');
                expect(path.equal('abc/dd/bb')).toBeFalsy();
                expect(path.equal('abc/../bb')).toBeFalsy();
            });

            it('should return true betwen empty string and \'/\'', function () {
                var path = new Path('/');
                expect(path.equal('')).toBeTruthy();
            });

        });

        describe('toString', function () {

            it('should return the right string', function () {
                var path = new Path('../ab/cc');
                expect(path.toString()).toEqual('../ab/cc');
            });

            it('should return empty when it\'s \'/\'', function () {
                var path = new Path('/');
                expect(path.toString()).toEqual('');
            });

        });

        describe('resolve', function () {

            it('should use dirname to resolve path', function () {
                var path = new Path('abc/foo/bar.html');
                path.resolve('../hello.html');
                expect(path.data).toEqual('abc/hello.html');
            });

        });

    });

});

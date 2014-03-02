/**
 * @file query spec
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var Query = require('saber-uri/component/Query');

    describe('Query', function () {

        describe('set', function () {

            it('should accepted undfined', function () {
                var query = new Query();
                expect(Object.keys(query.data).length).toBe(0);
            });

            it('should accepted two arguments to set parts', function () {
                var query = new Query();
                query.set('name', 'treelite');
                expect(Object.keys(query.data).length).toBe(1);
                expect(query.data.name).toEqual('treelite');
            });

            it('should accepted one string argument', function () {
                var query = new Query();
                query.set('name=treelite&age=10');
                expect(Object.keys(query.data).length).toBe(2);
                expect(query.data.name).toEqual('treelite');
                expect(query.data.age).toEqual('10');
            });

            it('should accepted one object argument', function () {
                var query = new Query();
                query.set({
                    name: 'treelite',
                    age: '10'
                });
                expect(Object.keys(query.data).length).toBe(2);
                expect(query.data.name).toEqual('treelite');
                expect(query.data.age).toEqual('10');
            });

        });

        describe('get', function () {

            it('should return object when had no arguments', function () {
                var query = new Query('name=treelite&age=10');
                expect(query.get()).toEqual({name: 'treelite', age: '10'});
            });

            it('should return part when had one argument', function () {
                var query = new Query('name=treelite&age=10');
                expect(query.get('name')).toEqual('treelite');
            });

        });

        describe('toString', function () {

            it('should return empty string when had no data', function () {
                var query = new Query();
                expect(query.toString()).toEqual('');
            });

            it('should add prefix when had data', function () {
                var query = new Query('name=treelite&age=10');
                expect(query.toString()).toEqual('?name=treelite&age=10');
            });

        });

        describe('add', function () {

            it('should add to single item', function () {
                var query = new Query();
                query.add('name', 'treelite');
                expect(Object.keys(query.data).length).toBe(1);
                expect(query.data.name).toEqual('treelite');
            });

            it('should add to mutli items', function () {
                var query = new Query('company=baidu');
                query.add('company', 'taobao');
                expect(Object.keys(query.data).length).toBe(1);
                expect(Array.isArray(query.data.company)).toBeTruthy();
                expect(query.data.company.length).toBe(2);
                expect(query.data.company[0]).toEqual('baidu');
                expect(query.data.company[1]).toEqual('taobao');
            });

        });

    });

});

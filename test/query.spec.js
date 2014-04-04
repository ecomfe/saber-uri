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

            it('should add defualt prefix when had data', function () {
                var query = new Query('name=treelite&age=10');
                expect(query.toString()).toEqual('?name=treelite&age=10');
            });

            it('should add custom prefix when had data', function () {
                var query = new Query('name=treelite&age=10');
                expect(query.toString('~')).toEqual('~name=treelite&age=10');
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

        describe('equal', function () {

            it('should compare with string', function () {
                var query = new Query('company=baidu&company=taobao&age=10');
                expect(query.equal('company=baidu&company=taobao&age=10')).toBeTruthy();
                expect(query.equal('company=baidu&age=10')).toBeFalsy();
            });

            it('should compare with object', function () {
                var query = new Query('company=baidu&company=taobao&age=10');
                expect(query.equal({company: ['baidu', 'taobao'], age: 10})).toBeTruthy();
                expect(query.equal({company: ['baidu'], age: 10})).toBeFalsy();
            });

            it('should sort array before compare', function () {
                var query = new Query('company=baidu&company=taobao&age=10');
                expect(query.equal({company: ['taobao', 'baidu'], age: 10})).toBeTruthy();
            });

            it('should compare width Query Object', function () {
                var queryStr = 'company=baidu&company=taobao&age=10';
                var q1 = new Query(queryStr);
                var q2 = new Query(queryStr);
                var q3 = new Query();

                expect(q1.equal(q2)).toBeTruthy();
                expect(q2.equal(q1)).toBeTruthy();
                expect(q1.equal(q3)).toBeFalsy();
                expect(q3.equal(q1)).toBeFalsy();
            });

        });

        describe('remove', function () {

            it('should delete item by key', function () {
                var query = new Query('company=baidu&company=taobao&age=10');
                query.remove('company');
                expect(Object.keys(query.data).length).toBe(1);
                expect(query.data.age).toEqual('10');
            });

            it('should delete all items without arguments', function () {
                var query = new Query('company=baidu&company=taobao&age=10');
                query.remove();
                expect(query.data).toEqual({});
            });

        });

    });

});

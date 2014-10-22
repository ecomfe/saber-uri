/**
 * @file query component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var extend = require('saber-lang/extend');
    var Abstract = require('./Abstract');

    var parse = require('../util/parse-query');
    var stringify = require('../util/stringify-query');

    var DEFAULT_PREFIX = '?';

    /**
     * 判断对象
     *
     * @inner
     * @param {*} data
     * @return {boolean}
     */
    function isObject(data) {
        return '[object Object]'
                    === Object.prototype.toString.call(data);
    }

    /**
     * 判断字符串
     *
     * @inner
     * @param {*} str
     * @return {boolean}
     */
    function isString(str) {
        return typeof str === 'string';
    }

    /**
     * 比较数组
     *
     * @inner
     * @param {Array} a
     * @param {Array} b
     * @return {boolean}
     */
    function compareArray(a, b) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            return false;
        }

        if (a.length !== b.length) {
            return false;
        }

        a = a.slice(0);
        a = a.slice(0);
        a.sort();
        b.sort();

        var res = true;
        for (var i = 0, len = a.length; res && i < len; i++) {
            res = a[i] == b[i];
        }

        return res;
    }

    /**
     * 比较对象
     *
     * @inner
     * @param {Object} a
     * @param {Object} b
     * @return {boolean}
     */
    function compareObject(a, b) {

        if (!isObject(a) || !isObject(b)) {
            return false;
        }

        var aKeys = Object.keys(a);
        var bKeys = Object.keys(b);

        if (aKeys.length !== bKeys.length) {
            return false;
        }

        var res = true;
        for (var i = 0, key, item; res && (key = aKeys[i]); i++) {
            if (!b.hasOwnProperty(key)) {
                res = false;
                break;
            }

            item = a[key];
            if (Array.isArray(item)) {
                res = compareArray(item, b[key]);
            }
            else {
                res = item == b[key];
            }
        }

        return res;
    }

    /**
     * 解码数据
     *
     * @inner
     * @param {string|Array.<string>} value
     * @return {string|Array.<string>}
     */
    function decodeValue(value) {
        if (Array.isArray(value)) {
            value = value.map(function (k) {
                    return decodeURIComponent(k);
                });
        }
        else {
            value = decodeURIComponent(value);
        }
        return value;
    }

    /**
     * 添加查询条件
     *
     * @inner
     * @param {string} key
     * @param {string|Array.<string>} value
     * @param {Object} items
     * @return {Object}
     */
    function addQueryItem(key, value, items) {
        var item = items[key];

        value = decodeValue(value);

        if (item) {
            if (!Array.isArray(item)) {
                item = [item];
            }
            if (Array.isArray(value)) {
                item = item.concat(value);
            }
            else {
                item.push(value);
            }
        }
        else {
            item = value;
        }

        items[key] = item;

        return items;
    }

    /**
     * Query
     *
     * @constructor
     * @param {string|Object} data
     */
    function Query(data) {
        data = data || {};
        Abstract.call(this, data);
    }

    inherits(Query, Abstract);

    /**
     * 设置query
     *
     * @public
     * @param {...string|Object} data
     */
    Query.prototype.set = function () {

        if (arguments.length === 1) {
            var query = arguments[0];
            if (isObject(query)) {
                var data = this.data = {};
                Object.keys(query).forEach(function (key) {
                    data[key] = decodeValue(query[key]);
                });
            }
            else {
                this.data = parse(query);
            }
        }
        else {
            this.data[arguments[0]] = decodeURIComponent(arguments[1]);
        }

    };

    /**
     * 获取query
     *
     * @public
     * @param {string=} name
     */
    Query.prototype.get = function (name) {
        return name ? this.data[name] : extend({}, this.data);
    };

    /**
     * 字符串化
     *
     * @public
     * @param {string} prefix
     * @return {string}
     */
    Query.prototype.toString = function (prefix) {
        prefix = prefix || DEFAULT_PREFIX;
        var str = stringify(this.data);

        return str ? prefix + str : '';
    };

    /**
     * 比较query
     *
     * @public
     * @param {string|Object|Query} query
     * @return {boolean}
     */
    Query.prototype.equal = function (query) {
        if (isString(query)) {
            query = parse(query);
        }
        else if (query instanceof Query) {
            query = query.get();
        }

        return compareObject(this.data, query);
    };

    /**
     * 添加query item
     *
     * @public
     * @param {string|Object} key
     * @param {string=} value
     */
    Query.prototype.add = function (key, value) {
        var data = this.data;

        if (isObject(key)) {
            Object.keys(key).forEach(function (k) {
                addQueryItem(k, key[k], data);
            });
        }
        else {
            addQueryItem(key, value, data);
        }

        this.data = data;
    };

    /**
     * 删除query item
     *
     * @public
     * @param {string=} key 忽略该参数则清除所有的query item
     */
    Query.prototype.remove = function (key) {
        if (!key) {
            this.data = {};
        }
        else if (this.data.hasOwnProperty(key)) {
            delete this.data[key];
        }
    };

    return Query;
});

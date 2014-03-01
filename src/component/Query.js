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

    /**
     * 判断对象
     *
     * @inner
     * @param {*} data
     * @return {boolean}
     */
    function isObject(data) {
        return '[object Object]'
                    == Object.prototype.toString.call(data);
    }

    /**
     * 判断字符串
     *
     * @inner
     * @param {*} str
     * @return {boolean}
     */
    function isString(str) {
        return '[object String]'
                    == Object.prototype.toString.call(str);
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

        if (a.length != b.length) {
            return false;
        }

        var res = true;
        for (var i = 0, item, len = a.length; res && i < len; i++) {
            item = a[i];
            if (isObject(item)) {
                res = compareObject(item, b[i]);
            }
            else {
                res = item == b[i];
            }
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

        if (aKeys.length != bKeys.length) {
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

        if (arguments.length == 1) {
            var query = arguments[0];
            if (isObject(query)) {
                this.data = extend({}, query);
            }
            else {
                this.data = parse(query);
            }
        }
        else {
            this.data[arguments[0]] = arguments[1];
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
     * @return {string}
     */
    Query.prototype.toString = function () {
        var str = stringify(this.data);

        return str ? '?' + str : '';
    };

    /**
     * 比较query
     *
     * @public
     * @param {string|Object} query
     * @return {boolean}
     */
    Query.prototype.equal = function (query) {
        if (isString(query)) {
            query = parse(query);
        }
        
        return compareObject(this.data, query);
    };

    /**
     * 添加query item
     * 
     * @public
     * @param {string} key
     * @param {string} value
     */
    Query.prototype.add = function (key, value) {
        var item = this.data[key];

        if (item) {
            if (!Array.isArray(item)) {
                item = [item];
            }
            item.push(value);
        }
        else {
            item = value;
        }

        this.data[key] = item;
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

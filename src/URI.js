/**
 * @file URI
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var parseURI = require('./util/uri-parser');

    /**
     * 属性序列
     *
     * @const
     * @type {Array.<string>}
     */
    var PROPERTY_SEQUENCE = [
            'protocol'
        ];

    /**
     * 属性构造函数
     *
     * @const
     * @type {Object}
     */
    var PROPERTY_FACTORY = {
            protocol: require('./property/Protocol')
        };

    /**
     * 解析参数
     *
     * @inner
     * @param {*}
     * @return {Object}
     */
    function parseArguments() {
        var i = 0;
        var res = {};

        if (arguments.length > 1) {
            res.name = arguments[i++];
        }

        res.data = Array.prototype.slice.call(arguments, i);

        return res;
    }

    /**
     * URI
     *
     * @contructor
     */
    function URI(data) {
        data = parseURI(data);

        var factory;
        var me = this;
        PROPERTY_SEQUENCE.forEach(function (name) {
            factory = PROPERTY_FACTORY[name];
            me[name] = new factory(data[name]);
        });
    }

    /**
     * 设置属性
     *
     * @public
     * @param {...string} name 属性名称
     * @param {*} 属性值
     */
    URI.prototype.set = function () {
        var arg = parseArguments(arguments);
        var handler = this[arg.name];

        if (handler) {
            handler.set.apply(handler, arg.data);
        }
        else {
            var me = this;
            var data = parseURI(arg.data[0]);
            PROPERTY_SEQUENCE.forEach(function (name) {
                me[name].set(data[name]);
            });
        }
    };

    /**
     * 转化成字符串
     *
     * @public
     * @param {...string} name 属性名称
     * @return {string}
     */
    URI.prototype.toString = function (name) {
        var str;
        var handler = this[name];

        if (handler) {
            str = handler.toString();
        }
        else {
            str = [];
            var me = this;
            PROPERTY_SEQUENCE.forEach(function (name) {
                str.push(me[name].toString());
            });
            str = str.join('');
        }

        return str;
    };

    return URI;

});

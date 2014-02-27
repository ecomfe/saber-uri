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
    var COMPONENT_SEQUENCE = [
            'scheme'
        ];

    /**
     * 属性构造函数
     *
     * @const
     * @type {Object}
     */
    var COMPONENT_FACTORY = {
            scheme: require('./component/Scheme')
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
        COMPONENT_SEQUENCE.forEach(function (name) {
            factory = COMPONENT_FACTORY[name];
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
        var component = this[arg.name];

        if (component) {
            component.set.apply(component, arg.data);
        }
        else {
            var me = this;
            var data = parseURI(arg.data[0]);
            COMPONENT_SEQUENCE.forEach(function (name) {
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
        var component = this[name];

        if (component) {
            str = component.toString();
        }
        else {
            str = [];
            var me = this;
            COMPONENT_SEQUENCE.forEach(function (name) {
                str.push(me[name].toString());
            });
            str = str.join('');
        }

        return str;
    };

    return URI;

});

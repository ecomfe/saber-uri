/**
 * @file URI
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var parseURI = require('./util/uri-parser');

    /**
     * 属性构造函数
     *
     * @const
     * @type {Object}
     */
    var COMPONENTS = {
            scheme: require('./component/Scheme'),
            username: require('./component/UserName'),
            password: require('./component/Password'),
            host: require('./component/Host'),
            port: require('./component/Port'),
            path: require('./component/Path'),
            query: require('./component/Query'),
            fragment: require('./component/Fragment')
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
        Object.keys(COMPONENTS).forEach(function (name) {
            factory = COMPONENTS[name];
            me[name] = new factory(data[name]);
        });
    }

    /**
     * 字符串化authority
     *
     * @inner
     * @return {string}
     */
    function stringifyAuthority(uri) {
        var res = [];
        var username = uri.username.toString();
        var password = uri.password.toString();
        var host = uri.host.toString();
        var port = uri.port.toString();

        if (username || password) {
            res.push(username + ':' + password + '@');
        }

        res.push(host);
        res.push(port);

        return res.join('');
    }

    /**
     * 设置属性
     *
     * @public
     * @param {string=} name 属性名称
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
            Object.keys(COMPONENTS).forEach(function (name) {
                me[name].set(data[name]);
            });
        }
    };

    /**
     * 获取属性
     *
     * @public
     * @param {string} name
     * @return {*}
     */
    URI.prototype.get = function () {
        var arg = parseArguments(arguments);
        var component = this[arg.name];

        if (component) {
            return component.get.apply(component, arg.data);
        }
    };

    /**
     * 转化成字符串
     *
     * @public
     * @param {string=} name 属性名称
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
            var scheme = this.scheme.toString();
            if (scheme) {
                str.push(scheme + ':');
            }
            var authority = stringifyAuthority(this);
            if (scheme && authority) {
                str.push('//');
            }
            str.push(authority);
            str.push(this.path.toString());
            str.push(this.query.toString());
            str.push(this.fragment.toString());
            str = str.join('');
        }

        return str;
    };

    /**
     * 比较uri
     *
     * @public
     * @param {string|URI} uri
     * @return {boolean}
     */
    URI.prototype.equal = function (uri) {
        if (!(uri instanceof URI)) {
            uri = new URI(uri);
        }

        var res = true;
        var names = Object.keys(COMPONENTS);

        for (var i = 0, name; res && (name = names[i]); i++) {
            if (name == 'port') {
                res = this[name].equal(uri[name].get(), this.scheme.get());
            }
            else {
                res = this[name].equal(uri[name].get(), this.scheme.get());
            }
        }

        return res;
    };

    return URI;

});

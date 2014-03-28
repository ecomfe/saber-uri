/**
 * @file path component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

    /**
     * normalize path
     * see rfc3986 #6.2.3. Scheme-Based Normalization
     *
     * @inner
     * @param {string}
     * @return {string}
     */
    function normalize(path) {
        if (path.charAt(path.length - 1) == '/') {
            path = path.substring(0, path.length - 1);
        }

        return path;
    }

    /**
     * 获取目录
     *
     * @inner
     * @param {string} path
     * @return {string}
     */
    function dirname(path) {
        path = path.split('/');
        path.pop();
        return path.join('/');
    }

    /**
     * 处理路径中的相对路径
     *
     * @inner
     * @param {Array} paths
     * @param {boolean} overRoot
     * @return {Array}
     */
    function resolveArray(paths, overRoot) {
        var up = 0;
        for (var i = paths.length - 1, item; item = paths[i]; i--) {
            if (item == '.') {
                paths.splice(i, 1);
            }
            else if (item == '..') {
                paths.splice(i, 1);
                up++;
            }
            else if (up) {
                paths.splice(i, 1);
                up--;
            }
        }

        if (overRoot) {
            while(up-- > 0) {
                paths.unshift('..');
            }
        }

        return paths;
    }

    /**
     * Path
     *
     * @constructor
     * @param {string} data
     */
    function Path(data) {
        Abstract.call(this, data);
    }

    /**
     * 应用路径
     *
     * @public
     * @param {string} from
     * @param {string=} to
     */
    Path.resolve = function (from, to) {
        to = to || '';

        if (to.charAt(0) == '/') {
            return to;
        }

        var isAbsolute = from.charAt(0) == '/';
        var path = from.split('/')
                    .concat(to.split('/'))
                    .filter(
                        function (item) { 
                            return !!item;
                        }
                    );

        path = resolveArray(path, !isAbsolute);


        return (isAbsolute ? '/' : '') + path.join('/');
    };

    inherits(Path, Abstract);

    /**
     * 设置path
     *
     * @public
     * @param {string} path
     */
    Path.prototype.set = function (path) {
        this.data = Path.resolve(path || '');
    };

    /**
     * 比较path
     *
     * @public
     * @param {string} path
     * @return {boolean}
     */
    Path.prototype.equal = function (path) {
        var myPath = normalize(this.data);
        path = normalize(Path.resolve(path || ''));

        return myPath == path;
    };

    /**
     * 应用路径
     *
     * @public
     * @param {string} path
     */
    Path.prototype.resolve = function (path) {
        this.data = Path.resolve(dirname(this.data), path);
    };

    return Path;
});

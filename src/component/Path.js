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
     * @param {string} path
     * @return {string}
     */
    function normalize(path) {
        if (!path) {
            path = '/';
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
            if (item === '.') {
                paths.splice(i, 1);
            }
            else if (item === '..') {
                paths.splice(i, 1);
                up++;
            }
            else if (up) {
                paths.splice(i, 1);
                up--;
            }
        }

        if (overRoot) {
            while (up-- > 0) {
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
     * @param {string|Path=} base
     */
    function Path(data, base) {
        Abstract.call(this, data, base);
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

        if (to.charAt(0) === '/') {
            return to;
        }

        var isAbsolute = from.charAt(0) === '/';
        var isDir = false;
        if (to) {
            from = dirname(from);
            isDir = to.charAt(to.length - 1) === '/';
        }
        // 对于`/`不处理
        else if (from.length > 1) {
            isDir = from.charAt(from.length - 1) === '/';
        }

        var path = from.split('/')
                    .concat(to.split('/'))
                    .filter(
                        function (item) {
                            return !!item;
                        }
                    );

        path = resolveArray(path, !isAbsolute);


        return (isAbsolute ? '/' : '')
                + path.join('/')
                + (isDir ? '/' : '');
    };

    inherits(Path, Abstract);

    /**
     * 设置path
     *
     * @public
     * @param {string} path
     * @param {string|Path=} base
     */
    Path.prototype.set = function (path, base) {
        if (base instanceof Path) {
            base = base.get();
        }

        var args = [path || ''];
        if (base) {
            args.unshift(base);
        }
        this.data = Path.resolve.apply(Path, args);
    };

    /**
     * 比较path
     *
     * @public
     * @param {string|Path} path
     * @return {boolean}
     */
    Path.prototype.equal = function (path) {
        var myPath = normalize(this.data);

        if (path instanceof Path) {
            path = normalize(path.get());
        }
        else {
            path = normalize(Path.resolve(path || ''));
        }

        return myPath === path;
    };

    /**
     * 应用路径
     *
     * @public
     * @param {string|Path} path
     * @param {boolean} from
     */
    Path.prototype.resolve = function (path, from) {
        if (path instanceof Path) {
            path = path.get();
        }

        var args = [this.data];
        if (from) {
            args.unshift(path);
        }
        else {
            args.push(path);
        }

        this.data = Path.resolve.apply(Path, args);
    };

    return Path;
});

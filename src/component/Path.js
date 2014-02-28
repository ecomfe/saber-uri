/**
 * @file path component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

    /**
     * Path
     *
     * @constructor
     * @param {string} data
     */
    function Path(data) {
        Abstract.call(this, data);
    }

    inherits(Path, Abstract);

    /**
     * 比较path
     *
     * @public
     * @param {string} path
     * @return {boolean}
     */
    Path.prototype.equal = function (path) {
        var myPath = this.path || '/';
        path = path || '/';

        return myPath == path;
    };

    /**
     * 字符串化
     *
     * @public
     * @return {string}
     */
    Path.prototype.toString = function () {
        return this.data == '/' ? '' : this.data;
    };

    return Path;
});

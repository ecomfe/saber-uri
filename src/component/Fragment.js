/**
 * @file fragment component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

    var DEFAULT_PREFIX = '#';

    /**
     * Fragment
     *
     * @constructor
     * @param {string} data
     */
    function Fragment(data) {
        Abstract.call(this, data);
    }

    inherits(Fragment, Abstract);

    /**
     * 字符串化
     *
     * @public
     * @param {string} prefix
     * @return {string}
     */
    Fragment.prototype.toString = function (prefix) {
        prefix = prefix || DEFAULT_PREFIX;
        return this.data ? prefix + this.data : '';
    };

    return Fragment;
});

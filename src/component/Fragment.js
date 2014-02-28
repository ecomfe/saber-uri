/**
 * @file fragment component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

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
     * @return {string}
     */
    Fragment.prorotype.toString = function () {
        return this.data ? '#' + this.data : '';
    };

    return Fragment;
});

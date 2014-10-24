/**
 * @file scheme component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

    /**
     * Scheme
     *
     * @constructor
     * @param {string} data
     */
    function Scheme(data) {
        Abstract.call(this, data);
    }

    inherits(Scheme, Abstract);

    /**
     * 设置scheme
     * 忽略大小写
     *
     * @public
     * @param {string} scheme
     */
    Scheme.prototype.set = function (scheme) {
        scheme = scheme || '';
        this.data = scheme.toLowerCase();
    };

    /**
     * 比较scheme
     * 忽略大小写
     *
     * @public
     * @param {string|Scheme} scheme
     * @return {boolean}
     */
    Scheme.prototype.equal = function (scheme) {
        if (scheme instanceof Scheme) {
            scheme = scheme.get();
        }
        else {
            scheme = scheme || '';
        }
        return this.data === scheme.toLowerCase();
    };

    return Scheme;
});

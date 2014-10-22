/**
 * @file URI main file
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var URI = require('./URI');

    /**
     * 创建URI对象
     *
     * @public
     * @param {...string|Object} data
     * @return {Object}
     */
    var exports = function (data) {
        return new URI(data);
    };


    /**
     * 解析URI字符串
     *
     * @public
     * @param {string} str
     * @return {Object}
     */
    exports.parse = require('./util/uri-parser');

    /**
     * resolve path
     *
     * @public
     * @param {string} from
     * @param {string=} to
     * @return {string}
     */
    exports.resolve = require('./component/Path').resolve;

    return exports;
});

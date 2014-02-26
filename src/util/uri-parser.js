/**
 * @file uri parser
 * @author treelite(c.xinle@gmail.com)
 */

define(function () {

    /**
     * 标准化URI数据
     *
     * @inner
     * @param {Object} data
     * @return {Object}
     */
    function normalize(data) {
        var res = {};
        var keys = ['protocol'];

        keys.forEach(function (key) {
            res[key] = data[key];
        });

        return res;
    }

    /**
     * 解析字符串
     *
     * @inner
     * @param {string} str
     * @return {Object}
     */
    function parse(str) {
        return {
            protocol: str
        };
    }

    /**
     * 解析URI
     *
     * @public
     * @param {string|Object} data
     * @return {Object}
     */
    return function (data) {

        if (typeof data == 'string'
            || data instanceof String
        ) {
            data = parse(data);
        }

        return normalize(data);
    };

});

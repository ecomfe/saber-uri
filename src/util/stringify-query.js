/**
 * @file stringify query
 * @author treelite(c.xinle@gmail.com)
 */

define(function () {
     
    /**
     * 字符串化query
     *
     * @public
     * @param {Object} query
     * @return {string}
     */
    function stringify(query) {
        var str = [];
        var item;

        Object.keys(query).forEach(function (key) {
            item = query[key];
            
            if (!Array.isArray(item)) {
                item = [item];
            }

            item.forEach(function (value) {
                str.push(key + '=' + encodeURIComponent(value || ''));
            });
        });

        return str.join('&');
    }

    return stringify;
});

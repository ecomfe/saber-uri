/**
 * @file uri parser
 * @author treelite(c.xinle@gmail.com)
 */

define(function () {

    function normalize(data) {
        var res = {};
        var keys = ['protocol'];

        keys.forEach(function (key) {
            res[key] = data[key];
        });

        return res;
    }

    function parse(data) {
        return {
            protocol: data
        };
    }

    return function (data) {

        if (typeof data == 'string'
            || data instanceof String
        ) {
            data = parse(data);
        }

        return normalize(data);
    };

});

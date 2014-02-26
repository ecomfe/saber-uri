/**
 * @file abstract handler
 * @author treelite(c.xinle@gmail.com)
 */
define(function () {
    var exports = {};

    exports.get = function (uri) {
        return uri.data[this.name];
    };

    exports.set = function (uri, value) {
        uri.data[this.name] = value;
    };

    exports.toString = function (uri) {
        return this.get(uri).toString();
    };

    return exports;
});

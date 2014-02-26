/**
 * @file protocol handler
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var extend = require('saber-lang/extend');

    var exports = extend({}, require('./abstract'));

    exports.name = 'protocol';

    return exports;
});

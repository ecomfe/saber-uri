/**
 * @file URI
 * @author treelite(c.xinle@gmail.com)
 */

define(function () {

    function URI(arg) {
        this.raw = arg;
    }

    URI.prototype.toString = function () {
        return this.raw;
    };

    return URI;

});

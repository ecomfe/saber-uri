/**
 * @file protocol component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

    function Scheme(data) {
        Abstract.call(this, data);
    }

    inherits(Scheme, Abstract);

    Scheme.prototype.set = function (scheme) {
        this.data = scheme.toLowerCase();
    };

    Scheme.prototype.equal = function (scheme) {
        return this.data == scheme.toLowerCase();
    };

    return Scheme;
});

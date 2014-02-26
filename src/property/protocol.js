/**
 * @file protocol
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

    function Protocol(data) {
        Abstract.call(this, data);
    }

    inherits(Protocol, Abstract);

    return Protocol;
});

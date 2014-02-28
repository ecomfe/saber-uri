/**
 * @file password component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

    /**
     * Password
     *
     * @constructor
     * @param {string} data
     */
    function Password(data) {
        Abstract.call(this, data);
    }

    inherits(Password, Abstract);

    return Password;
});

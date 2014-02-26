/**
 * @file URI main file
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var URI = require('./URI');
   
    /**
     * 生成URI对象
     *
     * @public
     * @param {...string|Object} arg
     * @return {Object}
     */
    return function (arg) {
        return new URI(arg);
    };

});

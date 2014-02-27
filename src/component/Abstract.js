/**
 * @file abstract property
 * @author treelite(c.xinle@gmail.com)
 */
define(function () {

    function Abstract(data) {
        this.data = data;
    }

    Abstract.prototype.get = function () {
        return this.data;
    };

    Abstract.prototype.set = function (data) {
        this.data = data;
    };

    Abstract.prototype.toString = function () {
        return this.data 
                ? this.data.toString()
                : '';
    };

    return Abstract;
});

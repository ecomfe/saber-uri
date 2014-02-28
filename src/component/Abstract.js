/**
 * @file abstract component
 * @author treelite(c.xinle@gmail.com)
 */
define(function () {

    function Abstract(data) {
        this.set(data);
    }

    Abstract.prototype.get = function () {
        return this.data;
    };

    Abstract.prototype.set = function (data) {
        this.data = data;
    };

    Abstract.prototype.add = function (data) {
        this.set(data);
    };

    Abstract.prototype.remove = function () {
        delete this.data;
    };

    Abstract.prototype.toString = function () {
        return this.data 
                ? this.data.toString()
                : '';
    };

    Abstract.prototype.equal = function (data) {
        return this.data == data;
    };

    return Abstract;
});

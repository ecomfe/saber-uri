/**
 * @file URI
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {

    var parseURI = require('./util/uri-parser');

    var handlerMap = {
            protocol: require('./handler/protocol')
        };

    var handlerList = [
            handlerMap.protocol
        ];

    function parseArguments() {
        var i = 0;
        var res = {};

        if (arguments.length > 1) {
            res.name = arguments[i++];
        }

        res.data = Array.prototype.slice.call(arguments, i);

        return res;
    }

    function findHandler(name) {
        var res;
        if (name && handlerMap[name]) {
            res = handlerMap[name];
        }
        return res;
    }

    function URI(arg) {
        this.data = parseURI(arg);
    }

    URI.prototype.set = function () {
        var arg = parseArguments(arguments);
        var handler = findHandler(arg.name);

        if (handler) {
            handler.set.apply(handler, [this].concat(arg.data));
        }
        else {
            this.data = parseURI(arg.data[0]);
        }
    };

    URI.prototype.toString = function (name) {
        var res;
        var handler = findHandler(name);

        if (handler) {
            res = handler.toString(this);
        }
        else {
            res = [];
            var me = this;
            handlerList.forEach(function (handler) {
                res.push(handler.toString(me));
            });
            res = res.join('');
        }

        return res;
    };

    return URI;

});

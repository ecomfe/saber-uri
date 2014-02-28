/**
 * @file port component
 * @author treelite(c.xinle@gmail.com)
 */

define(function (require) {
    var inherits = require('saber-lang/inherits');
    var Abstract = require('./Abstract');

    var DEFAULT_PORT = {
            ftp: '21',
            ssh: '22',
            telnet: '23',
            http: '80',
            https: '443',
            ws: '80',
            wss: '443'
        };

    function Port(data) {
        Abstract.call(this, data);
    }

    inherits(Port, Abstract);

    /**
     * 判断是否相等
     *
     * @public
     * @param {string} port
     * @param {string=} scheme
     * @return {boolean}
     */
    Port.prototype.equal = function (port, scheme) {
        var myPort = this.data || DEFAULT_PORT[scheme];
        port = port || DEFAULT_PORT[scheme];

        return myPort == port;
    };

    return Port;
});

/**
 * @file abstract component
 * @author treelite(c.xinle@gmail.com)
 */
define(function () {

    /**
     * URI Component 虚基类
     * 提供基础方法
     *
     * @constructor
     * @param {Object} data
     */
    function Abstract(data) {
        this.set(data);
    }

    /**
     * 获取数据
     *
     * @public
     * @return {Object}
     */
    Abstract.prototype.get = function () {
        return this.data;
    };

    /**
     * 设置数据
     *
     * @public
     * @param {Object} data
     */
    Abstract.prototype.set = function (data) {
        this.data = data;
    };

    /**
     * 添加数据
     *
     * @public
     * @param {Object} data
     */
    Abstract.prototype.add = function (data) {
        this.set(data);
    };

    /**
     * 移除数据
     *
     * @public
     */
    Abstract.prototype.remove = function () {
        delete this.data;
    };

    /**
     * 字符串输出
     *
     * @public
     */
    Abstract.prototype.toString = function () {
        return this.data 
                ? this.data.toString()
                : '';
    };

    /**
     * 数据比较
     *
     * @public
     * @param {Object}
     * @return {boolean}
     */
    Abstract.prototype.equal = function (data) {
        return this.data == data;
    };

    return Abstract;
});

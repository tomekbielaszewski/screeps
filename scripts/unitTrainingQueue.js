var unitFactory = require('unitFactory');
var UnitType = require('unitType');

module.exports = (function () {

    return {
        update: update, //TODO: will try to create units on every tick when there is something in queue
        enqueue: enqueue, //TODO accepts unit creation orders
        clear: clear
    }
}());
var unitFactory = require('unitFactory');
var UnitType = require('unitType');
var _ = require('lodash');

module.exports = (function () {
    var queue = [];

    function update() {
        queue = _.uniq(queue);
        console.log("Queue length: " + queue.length);
        var queueElement = queue.shift();
        if(queueElement) {
            var result = queueElement.creator('Home'); //TODO: remove spawn declaration!
            if(!queueElement.success(result)) {
                console.log('Queued creation unsuccessful. Result: ' + result);
                queue.unshift(queueElement);
            } else {
                console.log('Created ' + result);
            }
        }
    }

    function enqueue(creator, success) {
        queue.push(queueElement(creator, success));
    }

    function clear() {
        queue = [];
    }

    function queueElement(creator, success) {
        return {
            creator: creator,
            success: success
        }
    }

    return {
        update: update,
        enqueue: enqueue,
        clear: clear
    }
}());
var unitFactory = require('unitFactory');
var UnitType = require('unitType');

module.exports = (function () {
    var queue = [];

    function update() {
        var queueElement = queue.shift();
        if(queueElement) {
            var result = queueElement.creator('Home'); //TODO: remove spawn declaration!
            if(!queueElement.success(result)) {
                console.log('Queued creation unsuccessful. Result: ' + result);
                queue.unshift(queueElement);
            }
        }
    }

    function enqueue(creator, success) {
        console.log('Queued new unit!');
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
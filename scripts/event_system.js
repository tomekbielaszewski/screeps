const _ = require('lodash');
const log = require('loggers');

function EventSystem() {
    Memory.events = Memory.events || [];
}

EventSystem.prototype = {
    publish: function (event) {
        Memory.events.push(event);
        this.log(`Event added. Event bus size: ${Memory.events.length}`);
    },
    get: function (filter) {
        let event = _(Memory.events)
            .filter(filter)
            .first();
        _.remove(Memory.events, e => e === event);
        this.log(`Event ${event.type} removed. Event bus size: ${Memory.events.length}`);
        return event;
    },
    log: function (message) {
        log('EventSystem', message);
    }
};

module.exports = new EventSystem();
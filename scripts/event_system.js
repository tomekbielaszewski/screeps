const _ = require('lodash');

function EventSystem() {
    Memory.events = Memory.events || [];
}

EventSystem.prototype = {
    publish: function (event) {
        Memory.events.push(event);
    },
    get: function (filter) {
        let event = _(Memory.events)
            .filter(filter)
            .first();
        _.remove(Memory.events, e => e === event);
        return event;
    }
};

module.exports = new EventSystem();
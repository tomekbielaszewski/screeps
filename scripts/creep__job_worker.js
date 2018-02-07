const eventSystem = require('./event_system');

const states = [
    hireCarrierToCollectResources,
    work
];

Creep.prototype[ROLE_WORKER] = {
    onSpawn: function () {
    },
    onDie: function () {
    },
    work: function () {
        states[this.memory.state].call(this);
    }
};

function work() {
    let source = this.pos.findSource();
    this.harvestOrMoveTo(source)
}

function hireCarrierToCollectResources() {
    eventSystem.publish({
        type: EVENT__HIRE_TO_COLLECT_ENERGY,
        target: this.id
    });
    setState.call(this, 1, 'Carrier hired for collecting energy');
}

function setState(state, message) {
    if (message) {
        const oldState = this.memory.state;
        this.log(`${message}. Advancing from state ${oldState} to ${state}`);
    }
    this.memory.state = state;
}
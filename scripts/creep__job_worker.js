const eventSystem = require('./event_system');

const states = [
    hireCarrierToCollectResources,
    work
];

Creep.prototype[ROLE_WORKER] = {
    onSpawn: function () {
        this.setState(0);
    },
    onDie: function () {
    },
    work: function () {
        this.executeState(states);
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
    this.setState(1, 'Carrier hired for collecting energy');
}
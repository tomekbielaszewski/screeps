require('./creep__job_carrier');
require('./creep__job_mobile_worker');
require('./creep__job_worker');
require('./creep__job_upgrader');

const _ = require('lodash');

Creep.prototype.work = function () {
    let role = this.memory.role;

    if (this.spawning && !this.memory.spawned) {
        this.memory.spawned = true;
        this[role].onSpawn();
    } else if (this.ticksToLive === 1) {
        this[role].onDie();
        Memory.creeps[creep.name] = undefined;
    } else {
        this[role].work();
    }
};

Creep.prototype.isCapacityFull = function () {
    return _.sum(this.carry) >= this.carryCapacity;
};

Creep.prototype.isCarryingSomething = function () {
    return _.sum(this.carry) > 0;
};

Creep.prototype.isCarrying = function (resourceType) {
    return this.carry[resourceType] > 0;
};
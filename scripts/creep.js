require('./creep__job_carrier');
require('./creep__job_mobile_worker');
require('./creep__job_worker');
require('./creep__job_upgrader');

const _ = require('lodash');

Creep.prototype.isCapacityFull = function () {
    return _.sum(this.carry) >= this.carryCapacity;
};

Creep.prototype.isCarryingSomething = function () {
    return _.sum(this.carry) > 0;
};

Creep.prototype.isCarrying = function (resourceType) {
    return this.carry[resourceType] > 0;
};
const _ = require('lodash');

Spawn.prototype.enqueue = function (creepRole, creepBody, priority) {
    let queue = this.memory.queue || [];

    let el = _.find(queue, function (el) {
        return el.role === creepRole;
    });
    if (!el) {
        queue.push(createQueueElement(creepRole, creepBody, priority));
        queue = sortByPriority(queue);
        this.memory.queue = queue;
        this.log(`${creepRole} added to queue. New queue length: ${queue.length}`);
    } else {
        this.log(`${creepRole} is already added to queue`);
    }
};

Spawn.prototype.work = function () {
    let queue = this.memory.queue;
    if (queue && queue.length > 0 && !this.spawning) {
        let newCreepDefinition = queue.pop();
        let body = newCreepDefinition.body;
        let name = `${newCreepDefinition.role}-${Game.time}`;
        let memory = {memory: {role: newCreepDefinition.role}};

        this.log(`Spawning ${name}`);
        let result = this.spawnCreep(body, name, memory);

        if(result !== OK) {
            this.enqueue(newCreepDefinition.role, body, newCreepDefinition.priority);
            logUnsuccessfulSpawn(result, this.log);
        }
    }
};

function createQueueElement(role, body, priority) {
    return {
        role: role,
        body: body,
        priority: priority
    }
}

function sortByPriority(queue) {
    return _.sortBy(queue, function (el) {
        return el.priority
    })
}

function logUnsuccessfulSpawn(result, log) {
    log('Spawning unsuccessful');
    switch (result) {
        case ERR_NOT_OWNER: log('ERR_NOT_OWNER'); break;
        case ERR_NAME_EXISTS: log('ERR_NAME_EXISTS'); break;
        case ERR_BUSY: log('ERR_BUSY'); break;
        case ERR_NOT_ENOUGH_ENERGY: log('ERR_NOT_ENOUGH_ENERGY'); break;
        case ERR_INVALID_ARGS: log('ERR_INVALID_ARGS'); break;
        case ERR_RCL_NOT_ENOUGH: log('ERR_RCL_NOT_ENOUGH'); break;
        default: log(`Unknown error code: ${result}`);
    }
}

const _ = require('lodash');

Spawn.prototype.enqueue = function (creepRole, creepBody, amount, priority) {
    if (amount <= 0) return;
    let queue = this.memory.queue || [];

    let el = _.find(queue, function (el) {
        return el.role === creepRole;
    });
    if (!el) {
        queue.push(createQueueElement(creepRole, creepBody, amount, priority));
        queue = sortByPriority(queue);
        this.memory.queue = queue;
        this.log(`${creepRole} added to queue. New queue length: ${queue.length}`);
    } else {
        this.log(`${creepRole} is already added to queue`);
    }
};

Spawn.prototype.processQueue = function () {
    let queue = this.memory.queue;
    if (queue && queue.length > 0 && !this.spawning) {
        let newCreepDefinition = queue.pop();
        if (newCreepDefinition.amount <= 0) return;

        let body = newCreepDefinition.body;
        let role = newCreepDefinition.role;

        let spawnSuccess = spawn(role, body);

        if (spawnSuccess) {
            newCreepDefinition.amount--;
            if (newCreepDefinition.amount > 0) {
                queue.push(newCreepDefinition);
            }
        }
    }
};

Spawn.prototype.resetQueue = function () {
    this.memory.queue = [];
};

Spawn.prototype.logUnsuccessfulSpawn = function (result) {
    this.log('Spawning unsuccessful');
    switch (result) {
        case ERR_NOT_OWNER:
            this.log('ERR_NOT_OWNER');
            break;
        case ERR_NAME_EXISTS:
            this.log('ERR_NAME_EXISTS');
            break;
        case ERR_BUSY:
            this.log('ERR_BUSY');
            break;
        case ERR_NOT_ENOUGH_ENERGY:
            this.log('ERR_NOT_ENOUGH_ENERGY');
            break;
        case ERR_INVALID_ARGS:
            this.log('ERR_INVALID_ARGS');
            break;
        case ERR_RCL_NOT_ENOUGH:
            this.log('ERR_RCL_NOT_ENOUGH');
            break;
        default:
            this.log(`Unknown error code: ${result}`);
    }
};

function spawn(role, body) {
    let name = `${role}-${Game.time}`;
    let memory = {memory: {role: role}};

    let result = this.spawnCreep(body, name, memory);

    if (result !== OK) {
        this.logUnsuccessfulSpawn(result);
        this.log(`${body}, ${name}, ${JSON.stringify(memory)}`);
        notifyIfSevere(this, result);
        return false;
    }
    return true;
}

function createQueueElement(role, body, amount, priority) {
    return {
        role: role,
        body: body,
        amount: amount,
        priority: priority
    }
}

function sortByPriority(queue) {
    return _.sortBy(queue, function (el) {
        return -el.priority
    })
}

function notifyIfSevere(spawn, result) {
    if(
        result === ERR_NOT_OWNER ||
        result === ERR_NAME_EXISTS ||
        result === ERR_INVALID_ARGS ||
        result === ERR_RCL_NOT_ENOUGH
    ) {
        Game.notify(`One of errors [ERR_NOT_OWNER, ERR_NAME_EXISTS, ERR_INVALID_ARGS, ERR_RCL_NOT_ENOUGH] occurred 
        when spawning creep in spawn[${spawn.name}], check logs from Game.time = ${Game.time}`, 60);
    }
}

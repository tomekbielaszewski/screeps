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
        this.log(`${amount}x ${creepRole} added to queue. New queue length: ${queue.length}`);
    } else {
        this.log(`${creepRole} is already added to queue`);
    }
};

Spawn.prototype.processQueue = function () {
    let queue = this.memory.queue;
    if (queue && queue.length > 0 && !this.spawning) {
        let newCreepDefinition = queue[queue.length-1];
        if (newCreepDefinition.amount <= 0) {
            queue.pop();
            return;
        }

        let body = newCreepDefinition.body;
        let role = newCreepDefinition.role;

        let spawnResult = this.spawn(role, body);

        if(spawnResult.success) {
            this.log(`Spawning ${role}`);
            newCreepDefinition.amount--;
            if (newCreepDefinition.amount <= 0) {
                queue.pop();
            }
        } else {
            if(spawnResult.isSevere) {
                queue.pop();
            }
        }
    }
};

Spawn.prototype.resetQueue = function () {
    this.log('Queue reset');
    this.memory.queue = [];
};

Spawn.prototype.spawn = function(role, body) {
    let name = `${role}-${Game.time}`;
    let memory = {memory: {role: role}};

    let result = this.spawnCreep(body, name, memory);

    if (result !== OK) {
        this.logUnsuccessfulSpawn(result);
        // this.log(`${body}, ${name}, ${JSON.stringify(memory)}`);

        if(isSevere(result)) {
            Game.notify(`One of errors [ERR_NOT_OWNER, ERR_NAME_EXISTS, ERR_INVALID_ARGS, ERR_RCL_NOT_ENOUGH] occurred 
            when spawning creep in spawn[${this.name}], check logs from Game.time = ${Game.time}`, 60);
        }
        return {
            success: false,
            isSevere: isSevere(result)
        };
    }
    return {
        success: true
    };
};

function sortByPriority(queue) {
    return _.sortBy(queue, function (el) {
        return el.priority
    })
}

function createQueueElement(role, body, amount, priority) {
    return {
        role: role,
        body: body,
        amount: amount,
        priority: priority
    }
}

Spawn.prototype.logUnsuccessfulSpawn = function (result) {
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

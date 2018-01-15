const eventSystem = require('./event_system');

Creep.prototype[ROLE_CARRIER] = function () {
    let event = getCarryEvent.call(this);
    if (event) {
        this[event.type](event);
    }
};

Creep.prototype[EVENT__TRANSPORT_RESOURCES] = function (event) {
    if (this.isCapacityFull()) {
        let target = new RoomPosition(event.target.x, event.target.y, event.target.roomName);
        let result = dropOrMoveTo.call(this, target, RESOURCE_ENERGY);
        if (result === OK) {
            finishEvent.call(this);
            return;
        }
        if (result) this.log(`Event ${event.type} did not finish properly. Result of last operation was: ${result}`);
    } else {
        let resource = this.pos.findDroppedEnergy();
        if (resource) {
            pickupOrMoveTo.call(this, resource);
        } else {
            let storage = this.pos.findStorage();
            withdrawOrMoveTo.call(this, storage, RESOURCE_ENERGY);
        }
    }
};

Creep.prototype[EVENT__HIRE_TO_TRANSPORTING_ENERGY] = function (event) {
    if (this.isCapacityFull()) {
        let target = Game.getObjectById(event.target);
        let carriedEnergy = this.carry[RESOURCE_ENERGY];
        let result = transferOrMoveTo.call(this, target, RESOURCE_ENERGY);
        if (result === OK) {
            event.amountTransferred = event.amountTransferred || event.amount;
            event.amountTransferred += carriedEnergy;
            if (event.amountTransferred >= event.amount) {
                finishEvent.call(this);
            }
            this.log(`Transferred ${event.amountTransferred}/${event.amount} of energy`);
            return;
        }
        if (result) this.log(`Event ${event.type} did not finish properly. Result of last operation was: ${result}`);
    } else {
        let resource = this.pos.findDroppedEnergy();
        if (resource) {
            pickupOrMoveTo.call(this, resource);
        } else {
            let storage = this.pos.findStorage();
            withdrawOrMoveTo.call(this, storage, RESOURCE_ENERGY);
        }
    }
};

function getCarryEvent() {
    if (this.memory.event) return this.memory.event;

    let carryEvent = eventSystem.get(isCarryEvent);
    this.memory.event = carryEvent;
    return carryEvent;
}

function isCarryEvent(event) {
    return event.type === EVENT__TRANSPORT_RESOURCES;
}

function pickupOrMoveTo(resource) {
    if (this.pos.isNearTo(resource.pos)) {
        return this.pickup(resource);
    } else {
        this.moveTo(resource.pos);
    }
}

function dropOrMoveTo(pos, resourceType) {
    if (this.pos === pos) {
        return this.drop(resourceType);
    } else {
        this.moveTo(pos);
    }
}

function withdrawOrMoveTo(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        return this.withdraw(storage, resourceType);
    } else {
        this.moveTo(storage.pos);
    }
}

function transferOrMoveTo(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        return this.transfer(storage, resourceType);
    } else {
        this.moveTo(storage.pos);
    }
}

function finishEvent() {
    this.log('Event finished');
    this.memory.event = undefined;
}

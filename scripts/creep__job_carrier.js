const eventSystem = require('event_system');

Creep.prototype[ROLE_CARRIER] = function () {
    let event = getCarryEvent.call(this);
    if (event) {
        this[event.type](event);
    }
}
;

Creep.prototype[EVENT__TRANSPORT_RESOURCES] = function (event) {
    if (this.isCapacityFull()) {
        let target = new RoomPosition(event.target.x, event.target.y, event.target.roomName);
        let result = dropOn.call(this, target, RESOURCE_ENERGY);
        if (result === OK) {
            finishEvent.call(this);
            return;
        }
        this.log(`Event ${event.type} did not finish. Result of last operation was: ${result}`);
    } else {
        let resource = this.pos.findDroppedResource();
        if (resource) {
            pickup.call(this, resource);
        } else {
            let storage = this.pos.findStorage();
            withdraw.call(this, storage, RESOURCE_ENERGY);
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

function pickup(resource) {
    if (this.pos.isNearTo(resource.pos)) {
        let result = this.pickup(resource);
        return result === OK;
    } else {
        this.moveTo(resource.pos);
    }
}

function dropOn(pos, resourceType) {
    if (this.pos === pos) {
        let result = this.drop(resourceType);
        return result === OK;
    } else {
        this.moveTo(pos);
    }
}

function withdraw(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        let result = this.withdraw(storage, resourceType);
        return result === OK;
    } else {
        this.moveTo(storage.pos);
    }
}

function transfer(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        let result = this.transfer(storage, resourceType);
        return result === OK;
    } else {
        this.moveTo(storage.pos);
    }
}

function finishEvent() {
    this.log('Event finished');
    this.memory.event = undefined;
}

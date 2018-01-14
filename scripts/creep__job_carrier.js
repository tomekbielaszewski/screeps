const eventSystem = require('./event_system');

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
        if(result) this.log(`Event ${event.type} did not finish properly. Result of last operation was: ${result}`);
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
        return this.pickup(resource);
    } else {
        this.moveTo(resource.pos);
    }
}

function dropOn(pos, resourceType) {
    if (this.pos === pos) {
        return this.drop(resourceType);
    } else {
        this.moveTo(pos);
    }
}

function withdraw(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        return this.withdraw(storage, resourceType);
    } else {
        this.moveTo(storage.pos);
    }
}

function transfer(storage, resourceType) {
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

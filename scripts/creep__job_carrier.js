Creep.prototype[ROLE_CARRIER] = function () {
    let event = getCarryEvent.call(this);
    if(event) {
        this[event.type](event);
    }

    // if (this.isCapacityFull()) {
    //     let storage = this.pos.findStorage();
    //     transfer.call(this, storage, RESOURCE_ENERGY);
    // } else {
    //     let resource = this.pos.findDroppedResource();
    //     if (resource) {
    //         pickup.call(this, resource);
    //     }
    // }
}
;

Creep.prototype[EVENT__TRANSPORT_RESOURCES] = function (event) {
    if (this.isCapacityFull()) {
        let target = new RoomPosition(event.target.x, event.target.y, event.target.roomName);
        let success = dropOn.call(this, target, RESOURCE_ENERGY);
        if (success) finishEvent.call(this);
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

    let carryEvent = _(Memory.events)
        .filter(isCarryEvent)
        .first();
    Memory.events = _(Memory.events).remove(e => e === carryEvent);
    this.memory.event = carryEvent;
    return carryEvent;
}

function isCarryEvent(event) {
    return event.type === EVENT__TRANSPORT_RESOURCES ||
        event.type() === EVENT__BRING_RESOURCES
}

function pickup(resource) {
    if (this.pos.isNearTo(resource.pos)) {
        this.pickup(resource);
        return true;
    } else {
        this.moveTo(resource.pos);
    }
}

function dropOn(pos, resourceType) {
    if (this.pos.isNearTo(pos)) {
        let success = this.drop(resourceType);
        if(success) this.memory.doNotPickup = pos;
        return success;
    } else {
        this.moveTo(pos);
    }
}

function withdraw(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        this.withdraw(storage, resourceType);
        return true;
    } else {
        this.moveTo(storage.pos);
    }
}

function transfer(storage, resourceType) {
    if (this.pos.isNearTo(storage.pos)) {
        this.transfer(storage, resourceType);
    } else {
        this.moveTo(storage.pos);
    }
}

function finishEvent() {
    this.log('Event finished');
    this.memory.event = undefined;
}

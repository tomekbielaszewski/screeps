function transfer(storage, resourcetype) {
    if (this.pos.isNearTo(storage.pos)) {
        this.transfer(storage, resourcetype);
    } else {
        this.moveTo(storage.pos);
    }
}

Creep.prototype[ROLE_CARRIER] = function () {
    // let event = getCarryEvent();
    // if(event) {
    //     this[event.type](event);
    // }

    if (this.isCapacityFull()) {
        let storage = this.pos.findStorage();
        transfer.call(this, storage, RESOURCE_ENERGY);
    } else {
        let resource = this.pos.findDroppedResource();
        if (resource) {
            pickup.call(this, resource);
        }
    }
}
;

Creep.prototype[EVENT__TRANSPORT_RESOURCES] = function (event) {
    if (this.isCapacityFull()) {
        let target = event.target;
        let success = dropOn.call(this, target);
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
    _(Memory.events).remove(e => e === carryEvent);
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
        this.drop(resourceType);
        return true;
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

function finishEvent() {
    this.memory.event = undefined;
}

Creep.prototype[ROLE_UPGRADER] = function () {
    let controller = this.room.controller;

    if(this.pos.isNearTo(controller)) {
        upgrade.call(this, controller);
    } else {
        this.moveTo(controller.pos);
    }
};

function upgrade(controller) {
    if(this.isCarrying(RESOURCE_ENERGY)) {
        this.upgradeController(controller);
    } else {
        let resource = this.pos.findDroppedResource();
        if (this.pos.isNearTo(resource.pos)) {
            this.pickup(resource);
            this.memory.eventSent = false;
        } else {
            if(!this.memory.eventSent) {
                Memory.events.push({
                    type: EVENT__TRANSPORT_RESOURCES,
                    target: this.pos
                });
                this.memory.eventSent = true;
            }
        }
    }
}
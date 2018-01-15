const eventSystem = require('./event_system');

/*
* State machine:
*
* 0. Spawn
* 1. Collect energy from spawn
* 2. Go to pos 3 squares from RoomController
* 3. Create Construction site of ContainerStructure 2 sq from RC
* 4. Hire* carrier to bring energy to you (transfer directly to upgrader creep)
* 5. Use energy you carry to build Container
* 6. When Container is ready hire carrier to bring energy to it
* 7. Take energy from container to upgrade RC
*
* *Hire: create an event for transporting given amount of resources
* */

Creep.prototype[ROLE_UPGRADER] = {
    onSpawn: function () {
    },
    onDie: function () {
    },
    work: function () {
        let controller = this.room.controller;

        if (this.pos.isNearTo(controller)) {
            upgrade.call(this, controller);
        } else {
            this.moveTo(controller.pos);
        }
    }
};

function upgrade(controller) {
    if (this.isCarrying(RESOURCE_ENERGY)) {
        this.upgradeController(controller);
    } else {
        let resource = this.pos.findDroppedEnergy();
        if (this.pos.isNearTo(resource.pos)) {
            this.pickup(resource);
            this.memory.eventSent = false;
        } else {
            if (!this.memory.eventSent) {
                eventSystem.publish({
                    type: EVENT__TRANSPORT_RESOURCES,
                    target: this.pos
                });
                this.memory.eventSent = true;
            }
        }
    }
}
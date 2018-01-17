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

const states = [
    collectFirstEnergyPacket,
    createContainerConstructionSite,
    hireCreepToBringEnergyForContainerBuilding,
    buildContainer,
    hireCreepToBringEnergyForUpgradingRoomController,
    upgradeRoomController
];

Creep.prototype[ROLE_UPGRADER] = {
    onSpawn: function () {
        this.memory.state = 0;
    },
    onDie: function () {
    },
    work: function () {
        states[this.memory.state].call(this);

        // let controller = this.room.controller;
        //
        // if (this.pos.isNearTo(controller)) {
        //     upgrade.call(this, controller);
        // } else {
        //     this.moveTo(controller.pos);
        // }
    }
};

function collectFirstEnergyPacket() {
    const storage = this.pos.findStorage();
    if (this.pos.isNearTo(storage.pos)) {
        const result = this.withdraw(storage, RESOURCE_ENERGY);
        if (result === OK) {
            this.log('Sources withdrawn. Advancing from state 0 to state 1');
            this.memory.state = 1;
            return;
        }
        this.log(`Could not withdraw resources, result was: ${result}`);
    } else {
        this.moveTo(storage.pos);
    }
}

//TODO wiecej testowania w roznych pokojach kiedy mamy dostepne kilka potencjalnych miejsc budowy
//TODO state sie nie zmieni jak construction site juz tam jest
//TODO sprawdzić czy juz tam jest construction site
//TODO sprawdzic czy juz tam jest Container
function createContainerConstructionSite() {
    const pos = this.room.controller.pos;

    const buildablePositions = _([
        this.room.getPositionAt(pos.x - 2, pos.y - 2),
        this.room.getPositionAt(pos.x - 2, pos.y + 2),
        this.room.getPositionAt(pos.x + 2, pos.y - 2),
        this.room.getPositionAt(pos.x + 2, pos.y + 2)
    ])
        .filter(pos => pos.isBuildable())
        .sort(pos => pos.getRangeTo(this.pos))
        .value();

    if (buildablePositions && buildablePositions.length) {
        const closestBuildablePos = buildablePositions[0];
        const result = closestBuildablePos.createConstructionSite(STRUCTURE_CONTAINER);

        if (result === OK) {
            this.log(`Container construction site placed. Advancing from state 1 to 2`)
            this.memory.state = 2;
            return;
        }
        this.log(`Could not create Container construction site. Result was: ${result}`);
    }
}

function hireCreepToBringEnergyForContainerBuilding() {

}

function buildContainer() {

}

function hireCreepToBringEnergyForUpgradingRoomController() {

}

function upgradeRoomController() {

}

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

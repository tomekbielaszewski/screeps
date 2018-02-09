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
    hireCreepsToBringEnergyForContainerBuilding,
    buildContainer,
    hireCreepToBringEnergyForUpgradingRoomController,
    upgradeRoomController
];

Creep.prototype[ROLE_UPGRADER] = {
    onSpawn: function () {
        this.setState(0);

        Memory.roomControllers = Memory.roomControllers || {};
        Memory.roomControllers[this.room.name] = Memory.roomControllers[this.room.name] || {};
    },
    onDie: function () {
    },
    work: function () {
        this.executeState(states);
    }
};

function collectFirstEnergyPacket() {
    const storage = this.pos.findStorage();

    const result = this.withdrawOrMoveTo(storage);
    if (result === OK) {
        this.setState(1, 'Sources withdrawn');
    } else if (isSevere(result)) {
        this.log(`Could not withdraw resources, result was severe: ${result}`);
    }
}

//TODO wiecej testowania w roznych pokojach kiedy mamy dostepne kilka potencjalnych miejsc budowy
function createContainerConstructionSite() {
    const container = getContainerForUpgrader.call(this);
    const containerConstructionSite = getContainerConstructionSiteForUpgrader.call(this);
    const containerOrConstructionSite = container || containerConstructionSite;
    if (!containerOrConstructionSite) {
        const pos = this.room.controller.pos;

        const buildablePositions = _(potentialBuildablePositions.call(this, pos))
            .filter(pos => pos.isBuildable())
            .sort(pos => pos.getRangeTo(this.pos))
            .value();

        if (buildablePositions && buildablePositions.length) {
            const closestBuildablePos = buildablePositions[0];
            const result = closestBuildablePos.createConstructionSite(STRUCTURE_CONTAINER);

            if (result === OK) {
                this.log(`Container construction site placed.`);
                return;
            }
            this.log(`Could not create Container construction site. Result was: ${result}`);
        } else {
            this.log('No buildable position available');
        }
    } else {
        if (container) {
            this.setState(4, 'Container exist');

            Memory.roomControllers[this.room.name].container = container.id;
            return;
        }
        if (containerConstructionSite) {
            this.setState(2, 'Container construction site exist');

            this.log(this.room.name);
            Memory.roomControllers[this.room.name].containerConstructionSite = containerConstructionSite.id;
            return;
        }
        this.log(`This should never show in logs`);
    }
}

function getContainerForUpgrader() {
    const existingContainerId = Memory.roomControllers[this.room.name].container;
    let existingContainer = Game.getObjectById(existingContainerId);

    if (!existingContainer) {
        existingContainer = _(potentialBuildablePositions.call(this, this.room.controller.pos))
            .map(pos => pos.lookFor(LOOK_STRUCTURES))
            .filter(structureArray => structureArray && structureArray.length > 0)
            .map(structureArray => structureArray[0])
            .value()[0];
    }

    return existingContainer;
}

function getContainerConstructionSiteForUpgrader() {
    const existingContainerConstructionSiteId = Memory.roomControllers[this.room.name].containerConstructionSite;
    let existingContainerConstructionSite = Game.getObjectById(existingContainerConstructionSiteId);

    if (!existingContainerConstructionSite) {
        existingContainerConstructionSite = _(potentialBuildablePositions.call(this, this.room.controller.pos))
            .map(pos => pos.lookFor(LOOK_CONSTRUCTION_SITES))
            .filter(constructionSiteArray => constructionSiteArray && constructionSiteArray.length > 0)
            .map(constructionSiteArray => constructionSiteArray[0])
            .value()[0];
    }

    return existingContainerConstructionSite;
}

function potentialBuildablePositions(pos) {
    return [
        this.room.getPositionAt(pos.x - 2, pos.y - 2),
        this.room.getPositionAt(pos.x - 2, pos.y + 2),
        this.room.getPositionAt(pos.x + 2, pos.y - 2),
        this.room.getPositionAt(pos.x + 2, pos.y + 2)
    ];
}

function hireCreepsToBringEnergyForContainerBuilding() {
    eventSystem.publish({
        type: EVENT__HIRE_TO_TRANSPORTING_ENERGY,
        target: this.id,
        amount: 2500
    });
    eventSystem.publish({
        type: EVENT__HIRE_TO_TRANSPORTING_ENERGY,
        target: this.id,
        amount: 2500
    });
    this.setState(3, '2x Carrier hired');
}

function buildContainer() {
    const constructionSite = getContainerConstructionSiteForUpgrader.call(this);

    if (constructionSite) {
        if (this.isCarryingSomething()) {
            this.buildOrMoveTo(constructionSite);
        }
    } else {
        if (getContainerForUpgrader()) {
            this.setState(4, 'Container built');
        } else {
            this.log('Somethings fucky! There is no construction site nor container and upgraded is in state 3');
        }
    }
}

//TODO save 'hired' state somehow: what if upgrader dies and hires carriers again? Then we will have 4 carriers supplying one room controller
//TODO hire carriers for infinite energy
function hireCreepToBringEnergyForUpgradingRoomController() {
    const container = getContainerForUpgrader.call(this);
    eventSystem.publish({
        type: EVENT__HIRE_TO_TRANSPORTING_ENERGY,
        target: container.id,
        amount: 100000
    });
    eventSystem.publish({
        type: EVENT__HIRE_TO_TRANSPORTING_ENERGY,
        target: container.id,
        amount: 100000
    });
    this.setState(5, '2x Carrier hired');
}

function upgradeRoomController() {
    if (this.isCarrying(RESOURCE_ENERGY)) {
        this.upgradeOrMoveTo(this.room.controller);
    } else {
        const container = getContainerForUpgrader.call(this);
        this.withdrawOrMoveTo(container, RESOURCE_ENERGY);
    }
}
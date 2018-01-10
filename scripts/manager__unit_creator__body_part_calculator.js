function calculateForMobileWorker(availableEnergy) {
    if (availableEnergy >= 200) return [CARRY, WORK, MOVE];
    if (availableEnergy >= 500) return _.flatten([repeat(CARRY, 2), repeat(MOVE, 4), repeat(WORK, 2)]);
    if (availableEnergy >= 1000) return _.flatten([repeat(CARRY, 4), repeat(MOVE, 8), repeat(WORK, 4)]);
    if (availableEnergy >= 1800) return _.flatten([repeat(CARRY, 6), repeat(MOVE, 14), repeat(WORK, 6)]);
    if (availableEnergy >= 3000) return _.flatten([repeat(CARRY, 9), repeat(MOVE, 23), repeat(WORK, 9)]);
}

function calculateForCarrier(availableEnergy) {
    if (availableEnergy >= 200) return _.flatten([repeat(CARRY, 2), repeat(MOVE, 2)]);
    if (availableEnergy >= 400) return _.flatten([repeat(CARRY, 4), repeat(MOVE, 4)]);
    if (availableEnergy >= 800) return _.flatten([repeat(CARRY, 8), repeat(MOVE, 8)]);
    if (availableEnergy >= 1600) return _.flatten([repeat(CARRY, 16), repeat(MOVE, 16)]);
}

function calculateForWorker(availableEnergy) {
    if (availableEnergy >= 250) return _.flatten([repeat(MOVE, 1), repeat(WORK, 2)]);
    if (availableEnergy >= 500) return _.flatten([repeat(MOVE, 2), repeat(WORK, 4)]);
    if (availableEnergy >= 950) return _.flatten([repeat(MOVE, 3), repeat(WORK, 8)]);
    if (availableEnergy >= 1900) return _.flatten([repeat(MOVE, 6), repeat(WORK, 16)]);
}

function calculateForUpgrader(availableEnergy) {
    return calculateForWorker(availableEnergy)
}

function repeat(what, howMany) {
    let whats = [];
    for (let i = 0; i < howMany; i++) {
        whats.push(what);
    }
    return whats;
}

module.exports = function (role, spawn) {
    const energyAvailable = spawn.room.energyCapacityAvailable;
    let roleBodyPartsCalculators = {};
    roleBodyPartsCalculators[ROLE_MOBILE_WORKER] = calculateForMobileWorker;
    roleBodyPartsCalculators[ROLE_CARRIER] = calculateForCarrier;
    roleBodyPartsCalculators[ROLE_WORKER] = calculateForWorker;
    roleBodyPartsCalculators[ROLE_UPGRADER] = calculateForUpgrader;
    return roleBodyPartsCalculators[role](energyAvailable);
};

module.exports = function demandCalculators() {
    let demand = {};
    demand[ROLE_MOBILE_WORKER] = calculateDemandForMobileWorkers;
    demand[ROLE_CARRIER] = calculateDemandForCarriers;
    demand[ROLE_WORKER] = calculateDemandForWorkers;
    demand[ROLE_UPGRADER] = calculateDemandForUpgraders;
    return demand;
};

function calculateDemandForMobileWorkers(spawn) {
    let mobileWorkerCount = countCreeps(spawn.room, ROLE_MOBILE_WORKER);
    return Math.max(1 - mobileWorkerCount, 0);
}

function calculateDemandForCarriers(spawn) {
    let amountOfSources = spawn.room.findSources().length;
    let amountOfRoomControllers = 1;
    return amountOfRoomControllers + amountOfSources - countCreeps(spawn.room, ROLE_CARRIER);
}

function calculateDemandForWorkers(spawn) {
    return spawn.room.findSources().length - countCreeps(spawn.room, ROLE_WORKER);
}

function calculateDemandForUpgraders(spawn) {
    let upgradersCount = countCreeps(spawn.room, ROLE_UPGRADER);
    return Math.max(1 - upgradersCount, 0);
}

function countCreeps(room, role) {
    return _(Game.creeps).filter(c => c.room.id === room.id).filter(c => c.memory.role === role).value().length;
}

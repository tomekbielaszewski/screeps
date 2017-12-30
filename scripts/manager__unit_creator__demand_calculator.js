module.exports = function calculateDemand(spawn) {
    let demand = {};
    demand[ROLE_MOBILE_WORKER] = calculateDemandForMobileWorkers(spawn);
    demand[ROLE_CARRIER] = calculateDemandForCarriers(spawn);
    demand[ROLE_WORKER] = calculateDemandForWorkers(spawn);
    demand[ROLE_UPGRADER] = calculateDemandForUpgraders(spawn);
    return demand;
};

function calculateDemandForMobileWorkers(spawn) {
    let mobileWorkerCount = _(Game.creeps).filter(c => c.room.id === spawn.room.id).filter(c => c.memory.role === ROLE_MOBILE_WORKER).value().length;
    return Math.max(1 - mobileWorkerCount, 0);
}

function calculateDemandForCarriers(spawn) {
    return 0;
}

function calculateDemandForWorkers(spawn) {
    return spawn.room.findSources().length - _(Game.creeps).filter(c => c.room.id === spawn.room.id).filter(c => c.memory.role === ROLE_WORKER).value().length;
}

function calculateDemandForUpgraders(spawn) {
    return 0;
}
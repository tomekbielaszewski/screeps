module.exports = function calculateDemand(room) {
    let demand = {};
    demand[ROLE_MOBILE_WORKER] = calculateDemandForMobileWorkers(room);
    demand[ROLE_CARRIER] = calculateDemandForCarriers(room);
    demand[ROLE_WORKER] = calculateDemandForWorkers(room);
    demand[ROLE_UPGRADER] = calculateDemandForUpgraders(room);
    return demand;
};

function calculateDemandForMobileWorkers(room) {
    let mobileWorkerCount = _(Game.creeps).filter(c => c.room.id === room.id).filter(c => c.memory.role === ROLE_MOBILE_WORKER).value().length;
    return Math.max(1 - mobileWorkerCount, 0);
}

function calculateDemandForCarriers(room) {
    return 0;
}

function calculateDemandForWorkers(room) {
    return 0;
}

function calculateDemandForUpgraders(room) {
    return 0;
}
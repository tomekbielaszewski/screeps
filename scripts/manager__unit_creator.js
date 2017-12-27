const _ = require('lodash');
const calculateDemand = require('manager__unit_creator__demand_calculator');
const calculateBodyParts = require('manager__unit_creator__body_part_calculator');
const priority = {
    ROLE_MOBILE_WORKER: 1000,
    ROLE_CARRIER: 900,
    ROLE_WORKER: 900,
    ROLE_UPGRADER: 800
};

module.exports = function () {
    _.values(Game.spawns)
        .map(s => {
            return {
                spawn: s,
                demand: calculateDemand(s.room)
            }
        })
        .forEach(function (spawnDemand) {
            const spawn = spawnDemand.spawn;
            _.forIn(spawnDemand.demand, function (demand, role) {
                if (demand) {
                    let body = calculateBodyParts(role, spawn);
                    if(body) {
                        spawn.enqueue(role, calculateBodyParts(role, spawn), priority[role])
                    }
                }
            });
        })
};

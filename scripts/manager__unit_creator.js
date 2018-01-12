const _ = require('lodash');
const demandCalculators = require('manager__unit_creator__demand_calculator')();
const calculateBodyParts = require('manager__unit_creator__body_part_calculator');

const rolePriorities = [
    {role: ROLE_MOBILE_WORKER, priority: 1000},
    {role: ROLE_WORKER, priority: 910},
    {role: ROLE_CARRIER, priority: 900},
    {role: ROLE_UPGRADER, priority: 800}
];

module.exports = function () {
    console.log('Running manager: unit creator');
    _.forEach(Game.spawns, function (spawn) {
        spawn.resetQueue();

        for (let i = 0; i < rolePriorities.length; i++) {
            let rolePriority = rolePriorities[i];
            let role = rolePriority.role;
            let priority = rolePriority.priority;
            let demand = demandCalculators[role](spawn);

            if (demand > 0) {
                spawn.enqueue(role, calculateBodyParts(role, spawn), demand, priority);
            }
        }
    });
};

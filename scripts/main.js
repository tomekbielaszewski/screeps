//var profiler = require('profiler');
const _ = require('lodash');

require('./loggers');
require('./enums');
require('./creep');
require('./spawn__unit_creation_queue');

module.exports.loop = function () {
    _.forEach(Game.creeps, creep => {
        let role = creep.memory.role;
        creep[role]();
    });
    _.forEach(Game.spawns, spawn => {
        spawn.work();
    });

};
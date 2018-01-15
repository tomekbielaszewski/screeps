//var profiler = require('profiler');
const _ = require('lodash');

require('./loggers');
require('./enums');
require('./roomPosition__finders');
require('./room__finders');
require('./creep');
require('./spawn__unit_creation_queue');

const unitManagerUpdate = require('./manager__unit_creator');

module.exports.loop = function () {
    Memory.events = Memory.events || [];

    every(500).ticks.run(unitManagerUpdate);

    _.forEach(Game.creeps, creep => {
        creep.work();
    });

    _.forEach(Game.spawns, spawn => {
        spawn.processQueue();
    });
};

function every(ticks) {
    return {
        ticks: {
            run: function (fn) {
                if (Game.time % ticks === 0) {
                    fn();
                }
            }
        }
    };
}

//In game utils
global.killAll = function () {
    _.forEach(Game.creeps, function (c) {
        c.suicide();
    })
};
global.unitManagerReset = unitManagerUpdate;
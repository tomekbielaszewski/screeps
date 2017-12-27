//var profiler = require('profiler');
let _ = require('lodash');

require('./creep');
require('./enums');

module.exports.loop = function () {
    _.forEach(Game.creeps, c => {
        c[c.memory.role]();
    })
};
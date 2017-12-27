//var profiler = require('profiler');
let _ = require('lodash');

require('./enums');
require('./creep');

module.exports.loop = function () {
    _.forEach(Game.creeps, c => {
        c[c.memory.role]();
    })
};
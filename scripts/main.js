//var profiler = require('profiler');
require('./creep');
require('./enums');

module.exports.loop = function () {
    Game.creeps.forEach(c => {
        c[c.role]();
    })
};
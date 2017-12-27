//var profiler = require('profiler');
require('./creep/jobs');
require('./enums/all');

module.exports.loop = function () {
    Game.creeps.forEach(c => {
        c[c.role]();
    })
};
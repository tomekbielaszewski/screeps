//var profiler = require('profiler');
import './creep'
import './enums'

module.exports.loop = function () {
    Game.creeps.forEach(c => {
        c[c.role]();
    })
};
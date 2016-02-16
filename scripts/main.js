var doHarvest = require('harvester');
var doGuard = require('guardian');
var doBuild = require('builder');

module.exports.loop = function () {

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		doHarvest(creep);
		doGuard(creep);
        doBuild(creep);
	}
}
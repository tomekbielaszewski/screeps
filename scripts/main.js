var job = require('unitJobs');

module.exports.loop = function () {

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		job.work(creep);
	}
}
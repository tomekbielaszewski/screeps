var job = require('unitJobs');
var unitManager = require('unitManager');
var queue = require('unitTrainingQueue');

module.exports.loop = function () {

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    job.work(creep);
  }

  unitManager.update();
  queue.update();

  console.log('############# ' + Game.time);
}
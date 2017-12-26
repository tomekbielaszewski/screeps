//var profiler = require('profiler');
var job = require('unitJobs');
var unitManager = require('unitManager');
var queue = require('unitTrainingQueue');
var stats = require('stats');
var gameRoutines = require('gameRoutines');

module.exports.loop = function () {
  PathFinder.use(true);

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    job.work(creep);
  }

  unitManager.update();
  queue.update();
  gameRoutines();

  stats.print();
}
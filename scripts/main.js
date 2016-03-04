//var profiler = require('profiler');
var job = require('unitJobs');
var unitManager = require('unitManager');
var queue = require('unitTrainingQueue');
var stats = require('stats');
//var unitCost = require('unitCost');

//profiler.enable();
module.exports.loop = function () {
  //profiler.wrap(function() {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    job.work(creep);
  }

  unitManager.update();
  queue.update();

  stats.print();
  //});
}
var job = require('unitJobs');
var unitManager = require('unitManager');
var queue = require('unitTrainingQueue');

module.exports.loop = function () {

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    job.work(creep);
  }

  //_.forEach(Game.rooms.W11S2.find(FIND_STRUCTURES, {
  //  filter: function (s) {
  //    return (s.my || s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_ROAD) &&
  //      s.hits < s.hitsMax / 2;
  //  }
  //}), function (s) {
  //  console.log(s.structureType + ' : ' + s.hits + '/' + s.hitsMax + ' (' + (s.hits / s.hitsMax) + ')');
  //});

  unitManager.update();
  queue.update();

  console.log('############# ' + Game.time);
}
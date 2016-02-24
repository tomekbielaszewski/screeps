module.exports = (function () {

  function work(creep) {
    if (creep.carry.energy == 0) {
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    } else {
      var construction = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
      var buildResult = creep.build(construction);
      if (buildResult == ERR_NOT_IN_RANGE) {
        creep.moveTo(construction);
      }

      if (buildResult == ERR_RCL_NOT_ENOUGH) {
        creep.say('RCL to low');
      }
      if (buildResult == ERR_NO_BODYPART) {
        creep.say('no WORK');
      }
    }
  }

  return {
    work: work
  }
}());
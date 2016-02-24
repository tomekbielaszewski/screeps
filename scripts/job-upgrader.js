module.exports = (function () {

  function work(creep) {
    if (creep.carry.energy == 0) {
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    } else {
      if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
    }
  }

  return {
    work: work
  }
}());
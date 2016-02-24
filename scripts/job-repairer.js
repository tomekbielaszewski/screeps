module.exports = (function () {

  function work(creep) {
    if (creep.carry.energy == 0) {
      var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
      if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    } else {
      var construction = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function (s) {
          return (s.my || s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_ROAD) &&
            s.hits < s.hitsMax / 2;
        }
      });
      if (construction) {
        var repairResult = creep.repair(construction);
        if (repairResult == ERR_NOT_IN_RANGE) {
          creep.moveTo(construction);
        }

        if (repairResult == ERR_NO_BODYPART) {
          creep.say('no WORK');
        }
      } else {
        creep.moveTo(Game.flags.idle);
      }
    }
  }

  return {
    work: work
  }
}());
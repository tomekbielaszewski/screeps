module.exports = (function () {

  function work(creep) {
    var energyDrop = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if (creep.carry.energy < creep.carryCapacity) {
      if (energyDrop && creep.pickup(energyDrop) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energyDrop);
      }
    } else {
      var structure = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: function (s) {
          if ((s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION ||
            s.structureType == STRUCTURE_LINK) &&
            (s.energy < s.energyCapacity)) {
            return true;
          } //else {
          //  return s.structureType == STRUCTURE_STORAGE && (s.store.energy < s.storeCapacity)
          //}
        }
      });
      if(structure) {
        var transferResult = creep.transfer(structure, RESOURCE_ENERGY);
        if (transferResult == ERR_NOT_IN_RANGE) {
          creep.moveTo(structure);
        }

        if (transferResult == ERR_INVALID_TARGET) {
          creep.say('Cant transfer');
        }
        if (transferResult == ERR_FULL) {
          creep.say('Full');
        }
      }
    }
  }

  return {
    work: work
  }
}());
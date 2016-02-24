module.exports = (function () {

  function work(creep) {
    if (!isCreepCapacityFull(creep)) {
      var storage = findStorage(creep);
      transferEnergy(creep, storage);
    } else {
      var source = findSource(creep);
      harvest(creep, source);
    }
  }

  function isCreepCapacityFull(creep) {
    return creep.carry.energy < creep.carryCapacity;
  }

  function findSource(creep) {
    return creep.pos.findClosestByRange(FIND_SOURCES);
  }

  function harvest(creep, source) {
    var harvestResult = creep.harvest(source);

    if (harvestResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }

    if (harvestResult == ERR_NOT_ENOUGH_RESOURCES) {
      creep.say('no resources');
    }
    if (harvestResult == ERR_NO_BODYPART) {
      creep.say('no WORK');
    }
  }

  function findStorage(creep) {
    return creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
      filter: function (s) {
        if ((s.structureType == STRUCTURE_SPAWN || s.structureType == STRUCTURE_EXTENSION ||
          s.structureType == STRUCTURE_LINK) &&
          (s.energy < s.energyCapacity)) {
          return true;
        }
        //   } else {
        //     return s.structureType == STRUCTURE_STORAGE && (s.store.energy < s.storeCapacity)
        //   }
      }
    });
  }

  function transferEnergy(creep, structure) {
    if (structure) {
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

  return {
    work: work
  }
}());
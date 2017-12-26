var service = require('service');

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
    return service.find.closestAny(creep, FIND_SOURCES, function (source) {
      return source.ticksToRegeneration;
    });
  }

  function harvest(creep, source) {
    var harvestResult = creep.harvest(source);

    if (harvestResult == ERR_NOT_IN_RANGE) {
      service.goTo(source.pos, creep);
    }

    if (harvestResult == ERR_NOT_ENOUGH_RESOURCES) {
      creep.say('no resources');
    }
    if (harvestResult == ERR_NO_BODYPART) {
      creep.say('no WORK');
    }
  }

  function findStorage(creep) {
    var structure = service.find.closestAny(creep, FIND_MY_STRUCTURES,
      function (cached) {
        return cached.structureType && (cached.structureType === STRUCTURE_SPAWN ||
          cached.structureType === STRUCTURE_EXTENSION ||
          cached.structureType === STRUCTURE_STORAGE);
      },
      function (inGame) {
        var isSpawnNotFull = (inGame.structureType === STRUCTURE_SPAWN) && (inGame.energy < inGame.energyCapacity);
        var isExtensionNotFull = (inGame.structureType === STRUCTURE_EXTENSION) && (inGame.energy < inGame.energyCapacity);

        return isSpawnNotFull || isExtensionNotFull;
      });
    if (!structure) {
      structure = service.find.closestStructure(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE);
    }
    return structure;
  }

  function transferEnergy(creep, structure) {
    if (structure) {
      var transferResult = creep.transfer(structure, RESOURCE_ENERGY);
      if (transferResult == ERR_NOT_IN_RANGE) {
        service.goTo(structure.pos, creep);
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
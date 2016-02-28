var service = require('service');

module.exports = (function () {

  function work(creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var energyDrop = findEnergyDrop(creep);
      pickupEnergy(energyDrop, creep);
    } else {
      var structure = findAvailableStorage(creep);
      if(structure) {
        transferEnergy(creep, structure);
      }
    }
  }

  function findEnergyDrop(creep) {
    return service.find.closestAny(creep, FIND_DROPPED_RESOURCES, function (res) {
      return res.resourceType && (res.resourceType > 0);
    });
  }

  function pickupEnergy(energyDrop, creep) {
    if (energyDrop && creep.pickup(energyDrop) === ERR_NOT_IN_RANGE) {
      service.goTo(energyDrop.pos, creep);
    }
  }

  function findAvailableStorage(creep) {
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

  return {
    work: work
  }
}());
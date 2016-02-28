var service = require('service');

module.exports = (function () {

  function work(creep) {
    if (creep.carry.energy == 0) {
      var storage = service.find.closestStructure(creep, FIND_MY_STRUCTURES, STRUCTURE_STORAGE);
      takeResources(storage, creep);
    } else {
      var construction = findDamagedStructure(creep);
      if (construction) {
        console.log("Repairing structure with "+((construction.hits / construction.hitsMax)*100).toFixed(0)+"%  of HP");
        repairStructure(creep, construction);
      } else {
        idle(creep);
      }
    }
  }

  function takeResources(storage, creep) {
    if (storage.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
      service.goTo(storage.pos, creep);
    }
  }

  function findDamagedStructure(creep) {
    var damaged50Percent = findDamagedStructureByPercentage(creep, 0.5);
    var damaged60Percent = damaged50Percent || findDamagedStructureByPercentage(creep, 0.6);
    var damaged70Percent = damaged60Percent || findDamagedStructureByPercentage(creep, 0.7);
    var damaged80Percent = damaged70Percent || findDamagedStructureByPercentage(creep, 0.8);
    return damaged50Percent || damaged60Percent || damaged70Percent || damaged80Percent;
  }

  function findDamagedStructureByPercentage(creep, percentage) {
    return creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: function (s) {
        return (s.my || s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_ROAD) &&
          s.hits < s.hitsMax * percentage;
      }
    });
  }

  function repairStructure(creep, construction) {
    var repairResult = creep.repair(construction);
    if (repairResult == ERR_NOT_IN_RANGE) {
      service.goTo(construction.pos, creep);
    }

    if (repairResult == ERR_NO_BODYPART) {
      creep.say('no WORK');
    }
  }

  function idle(creep) {
    service.goTo(Game.flags.idle.pos, creep, true);
  }

  return {
    work: work
  }
}());